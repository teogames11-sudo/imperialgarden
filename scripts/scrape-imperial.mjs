import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public", "assets", "legacy");
const dataDir = path.join(rootDir, "data", "generated");

const baseUrl = "http://www.imperialgarden.eu/";

const pageMap = {
  home: "",
  catalog: "catalog.html",
  news: "news.html",
  contacts: "contacts.html",
  css: "css/main.css",
};

const seriesMeta = {
  "Anti-Cellulite": {
    slug: "anti-cellulite",
    accent: "#5f9ad0",
    purposeTags: ["anti-cellulite", "toning", "figure-correction"],
    coverImage: "/assets/legacy/anti-cellulite.jpg",
  },
  Delight: {
    slug: "delight",
    accent: "#8b5d51",
    purposeTags: ["relax", "nutrition", "spa-ritual"],
    coverImage: "/assets/legacy/delight.jpg",
  },
  "Lift & Slim": {
    slug: "lift-slim",
    accent: "#9c80b4",
    purposeTags: ["lifting", "figure-correction", "anti-cellulite"],
    coverImage: "/assets/legacy/lift-and-slim.jpg",
  },
  "Lifting Expert": {
    slug: "lifting-expert",
    accent: "#5da1ab",
    purposeTags: ["lifting", "firming", "anti-age"],
    coverImage: "/assets/legacy/lifting-expert.jpg",
  },
  "Massage Thermal Spa": {
    slug: "massage-thermal-spa",
    accent: "#d2a070",
    purposeTags: ["massage", "relax", "recovery"],
    coverImage: "/assets/legacy/massage-thermal-spa.jpg",
  },
  "Natural Power": {
    slug: "natural-power",
    accent: "#7d936d",
    purposeTags: ["toning", "detox", "revitalization"],
    coverImage: "/assets/legacy/natural-power.jpg",
  },
  "Shape Control": {
    slug: "shape-control",
    accent: "#8fb25b",
    purposeTags: ["drainage", "figure-correction", "detox"],
    coverImage: "/assets/legacy/shape-control.jpg",
  },
  "Thermal Spa": {
    slug: "thermal-spa",
    accent: "#c07b94",
    purposeTags: ["detox", "mineral-care", "spa-ritual"],
    coverImage: "/assets/legacy/thermal-spa.jpg",
  },
  "Mousse & juice": {
    slug: "mousse-juice",
    accent: "#d4a15d",
    purposeTags: ["nutrition", "hydration", "home-care"],
    coverImage: "/assets/legacy/mousse-and-juice.jpg",
  },
  Expert: {
    slug: "expert-serums",
    accent: "#8aa08d",
    purposeTags: ["figure-correction", "anti-age", "professional"],
    coverImage: "/assets/legacy/floral.jpg",
  },
};

function absoluteUrl(input) {
  return new URL(input, baseUrl).toString();
}

function cleanupText(input) {
  return input
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/â/g, "—")
    .replace(/Ð¡Ð¾Ð±ÑÑÐ¸Ðµ Ð·Ð°Ð²ÐµÑÑÐµÐ½Ð¾/g, "Событие завершено")
    .trim();
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseVolumeLabel(input) {
  const cleaned = cleanupText(input);
  const match = cleaned.match(/(\d+)\s*(мл|гр)/i);

  if (!match) {
    return {
      label: cleaned,
      value: null,
      unit: null,
    };
  }

  return {
    label: cleaned,
    value: Number(match[1]),
    unit: match[2].toLowerCase(),
  };
}

function audienceFromVolume(volumeValue) {
  if (volumeValue === null) {
    return ["professional"];
  }

  if (volumeValue <= 200) {
    return ["home"];
  }

  return ["professional"];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

async function ensureDirectories() {
  await fs.mkdir(publicDir, { recursive: true });
  await fs.mkdir(dataDir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function withRetry(task, label, attempts = 4) {
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;

      if (attempt === attempts) {
        throw new Error(`${label} failed after ${attempts} attempts: ${error.message}`);
      }

      await sleep(250 * attempt);
    }
  }

  throw lastError;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const currentIndex = cursor;
      cursor += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

async function fetchText(relativePath) {
  return withRetry(
    async () => {
      const response = await fetch(absoluteUrl(relativePath), {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; ImperialGardenRedesign/1.0)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.text();
    },
    `Fetch ${relativePath}`,
  );
}

async function downloadAsset(relativePath) {
  const targetUrl = absoluteUrl(relativePath);
  const url = new URL(targetUrl);
  const fileName = decodeURIComponent(path.basename(url.pathname));
  const filePath = path.join(publicDir, fileName);

  try {
    await fs.access(filePath);
    return `/assets/legacy/${fileName}`;
  } catch {}

  const buffer = await withRetry(
    async () => {
      const response = await fetch(targetUrl, {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; ImperialGardenRedesign/1.0)",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return Buffer.from(await response.arrayBuffer());
    },
    `Download ${relativePath}`,
  );

  await fs.writeFile(filePath, buffer);
  return `/assets/legacy/${fileName}`;
}

function parseHomeGroups(html) {
  const $ = cheerio.load(html);
  const groups = {};
  let currentGroup = null;

  $(".production h2, .production .production__slider").each((_, element) => {
    const tagName = element.tagName?.toLowerCase();

    if (tagName === "h2") {
      currentGroup = cleanupText(
        $(element)
          .contents()
          .first()
          .text(),
      );
      groups[currentGroup] = [];
      return;
    }

    if (currentGroup) {
      $(element)
        .find("a")
        .each((__, link) => {
          const href = $(link).attr("href");
          if (href?.startsWith("catalog/")) {
            groups[currentGroup].push(href);
          }
        });
    }
  });

  return groups;
}

function parseSeriesName(seriesName) {
  const meta = seriesMeta[seriesName];

  if (!meta) {
    return {
      slug: slugify(seriesName),
      accent: "#8aa08d",
      purposeTags: [],
      coverImage: "/assets/legacy/floral.jpg",
    };
  }

  return meta;
}

function parseBlocks($, $content) {
  const blocks = [];

  $content.children().each((_, child) => {
    const element = $(child);
    const tagName = child.tagName?.toLowerCase();

    if (tagName === "h2") {
      return;
    }

    if (tagName === "p") {
      const text = cleanupText(element.text());
      if (text) {
        blocks.push({
          type: "paragraph",
          text,
        });
      }
      return;
    }

    if (tagName === "ul") {
      const items = element
        .find("li")
        .map((__, item) => cleanupText($(item).text()))
        .get()
        .filter(Boolean);

      if (items.length) {
        blocks.push({
          type: "list",
          items,
        });
      }
    }
  });

  return blocks;
}

function classifyNewsItem(title, slug) {
  const source = `${title} ${slug}`.toLowerCase();

  if (source.includes("вебинар")) {
    return "webinar";
  }

  if (source.includes("обучение") || source.includes("семинар")) {
    return "seminar";
  }

  if (source.includes("выставка")) {
    return "exhibition";
  }

  if (source.includes("акция") || source.includes("promotion")) {
    return "promotion";
  }

  return "news";
}

async function main() {
  await ensureDirectories();

  const [homeHtml, catalogHtml, newsHtml, contactsHtml, cssText] = await Promise.all(
    Object.values(pageMap).map((relativePath) => fetchText(relativePath)),
  );

  const homeGroups = parseHomeGroups(homeHtml);
  const $catalog = cheerio.load(catalogHtml);
  const $news = cheerio.load(newsHtml);
  const $contacts = cheerio.load(contactsHtml);

  const assetPaths = new Set([
    "img/logo.svg",
    "img/floral.jpg",
    "img/icon-scroll.svg",
  ]);

  const series = [];
  const productIndex = new Map();

  $catalog(".catalog__series").each((_, section) => {
    const sectionEl = $catalog(section);
    const rawSeriesName = cleanupText(
      sectionEl
        .find("h2")
        .contents()
        .first()
        .text(),
    );
    const meta = parseSeriesName(rawSeriesName);
    const description = cleanupText(sectionEl.find(".catalog__series-info").text());
    const productLinks = [];

    sectionEl.find(".catalog__grid > a").each((__, link) => {
      const linkEl = $catalog(link);
      const href = linkEl.attr("href");
      const imageSrc = linkEl.find("img").attr("src");
      const type = cleanupText(linkEl.find(".item__type").text());
      const name = cleanupText(linkEl.find(".item__name").text());
      const volume = parseVolumeLabel(linkEl.find(".item__volume").text());

      if (!href) {
        return;
      }

      const legacySlug = href
        .replace(/^catalog\//, "")
        .replace(/\.html$/, "");
      const imageLocalPath = imageSrc
        ? `/assets/legacy/${decodeURIComponent(path.basename(imageSrc))}`
        : meta.coverImage;
      const existing = productIndex.get(legacySlug);

      if (imageSrc) {
        assetPaths.add(imageSrc.replace(/^\.\.\//, ""));
      }

      const product = {
        id: legacySlug,
        slug: slugify(legacySlug),
        legacySlug,
        legacyHref: href,
        name,
        type,
        seriesSlug: meta.slug,
        seriesName: rawSeriesName,
        image: imageLocalPath,
        volume: volume.label,
        volumeValue: volume.value,
        volumeUnit: volume.unit,
        audiences: audienceFromVolume(volume.value),
        purposes: meta.purposeTags,
      };

      productIndex.set(legacySlug, {
        ...existing,
        ...product,
      });

      productLinks.push(legacySlug);
    });

    series.push({
      id: meta.slug,
      slug: meta.slug,
      name: rawSeriesName,
      description,
      accent: meta.accent,
      coverImage: meta.coverImage,
      purposes: meta.purposeTags,
      productIds: productLinks,
    });
  });

  const productEntries = [...productIndex.values()];
  const productPages = await mapLimit(
    productEntries,
    6,
    (product) => fetchText(product.legacyHref),
  );

  productPages.forEach((html, index) => {
    const product = productEntries[index];
    const $ = cheerio.load(html);
    const title = cleanupText($(".catalog__product h2").contents().first().text());
    const subtitle = cleanupText($(".catalog__product h2 span").text());
    const summary = cleanupText($(".catalog__product > .product .product__wrapper p, .catalog__product .product__wrapper p").first().text());
    const benefits = $(".catalog__product .product__wrapper ul li")
      .map((_, item) => cleanupText($(item).text()))
      .get()
      .filter(Boolean);

    const usageHeading = $(".catalog__product h3")
      .filter((_, el) => cleanupText($(el).text()) === "Способ применения")
      .first();
    const usage = usageHeading.length
      ? cleanupText(usageHeading.next("p").text())
      : "";

    const ingredientHeading = $(".catalog__product h3")
      .filter((_, el) => cleanupText($(el).text()) === "Активные компоненты и их функции")
      .first();

    const ingredients = ingredientHeading.length
      ? ingredientHeading
          .next("ul")
          .find("li")
          .map((_, item) => {
            const name = cleanupText($(item).find("span").first().text());
            const fullText = cleanupText($(item).text());
            const description = cleanupText(fullText.replace(name, "").replace(/^-/, ""));

            return {
              name,
              description,
            };
          })
          .get()
      : [];

    const relatedIds = $(".catalog__grid a")
      .map((_, link) =>
        cleanupText($(link).attr("href") || "")
          .replace(/\.html$/, "")
          .replace(/^\.\//, ""),
      )
      .get()
      .filter(Boolean);

    Object.assign(product, {
      name: title || product.name,
      subtitle,
      summary,
      benefits,
      usage,
      ingredients,
      relatedIds,
      formatLabel: product.type,
    });
  });

  const newsEntries = $news(".news__grid .news__preview")
    .map((_, item) => {
      const link = $news(item);
      const href = cleanupText(link.attr("href") || "");
      const title = cleanupText(link.find(".item__name").text());
      const summary = cleanupText(link.find(".item__preview").text());
      const date = cleanupText(link.find(".item__date").text());
      const completed = link.hasClass("news__preview_mod-event-completed");
      const slug = href.replace(/^news\//, "").replace(/\.html$/, "");

      return {
        slug,
        href,
        title,
        summary,
        date,
        completed,
        kind: classifyNewsItem(title, slug),
      };
    })
    .get();

  const newsPages = await mapLimit(newsEntries, 4, (entry) => fetchText(entry.href));

  newsPages.forEach((html, index) => {
    const entry = newsEntries[index];
    const $ = cheerio.load(html);
    const content = $(".news__content");
    const blocks = parseBlocks($, content);
    const title = cleanupText(content.find("h2").first().text()) || entry.title;
    const themeClass =
      content.find(".news__img").attr("class")?.split(/\s+/).find((value) => value.startsWith("news__img_mod-")) ?? null;

    if (themeClass) {
      const possibleImage = themeClass.replace("news__img_mod-", "").replace("new-year-2023", "promotion__new-year-2023");
      assetPaths.add(`img/${possibleImage}.jpg`);
    }

    Object.assign(entry, {
      title,
      blocks,
      status: entry.completed ? "completed" : "upcoming",
      themeClass,
    });
  });

  const cssAssets = [...cssText.matchAll(/url\((?:'|")?(\.\.\/img\/[^'")]+)(?:'|")?\)/g)].map(
    (match) => match[1].replace(/^\.\.\//, ""),
  );
  cssAssets.forEach((asset) => assetPaths.add(asset));

  await mapLimit([...assetPaths], 6, (asset) => downloadAsset(asset));

  const professionalSet = new Set(homeGroups.Prof ?? []);
  const expertSet = new Set(homeGroups.Expert ?? []);
  const homeCareSet = new Set(homeGroups["Home care"] ?? []);

  productEntries.forEach((product) => {
    const href = product.legacyHref;
    const groupLabels = [];

    if (professionalSet.has(href)) {
      groupLabels.push("professional");
    }

    if (expertSet.has(href)) {
      groupLabels.push("expert");
    }

    if (homeCareSet.has(href)) {
      groupLabels.push("home");
    }

    product.groups = unique([...product.audiences, ...groupLabels]);
    product.searchText = cleanupText(
      [product.name, product.type, product.seriesName, product.volume, product.summary]
        .filter(Boolean)
        .join(" "),
    );
  });

  const contacts = {
    pageTitle: cleanupText($contacts("h1").first().text()),
    leadTitle: cleanupText($contacts(".contacts__info-about h2").first().text()),
    leadText: cleanupText($contacts(".contacts__info-about p").first().text()),
    professionalPoints: $contacts(".contacts__info-about ul li")
      .map((_, item) => cleanupText($contacts(item).text()))
      .get(),
    introTitle: cleanupText($contacts(".contacts__info-about h2").eq(1).text()),
    introText: cleanupText($contacts(".contacts__info-about p").eq(1).text()),
    office: cleanupText($contacts(".contacts__info > ul li").eq(0).text()),
    phone: cleanupText($contacts(".contacts__info > ul li").eq(1).text()),
    email: cleanupText($contacts(".contacts__info > ul li").eq(2).text()),
    social: $contacts(".contacts__info-social-media li a")
      .map((_, item) => ({
        label: cleanupText($contacts(item).text()),
        href: $contacts(item).attr("href"),
      }))
      .get(),
    representatives: $contacts(".contacts__info-representatives > ul")
      .map((_, list) =>
        $contacts(list)
          .find("li")
          .map((__, item) => cleanupText($contacts(item).text()))
          .get(),
      )
      .get(),
  };

  const home = {
    title: cleanupText(cheerio.load(homeHtml)(".title__name").text()),
    subtitle: cleanupText(cheerio.load(homeHtml)(".title__type").text()),
    intro: cleanupText(cheerio.load(homeHtml)(".production__info p").first().text()),
    groups: {
      professional: [...professionalSet].map((href) => href.replace(/^catalog\//, "").replace(/\.html$/, "")),
      expert: [...expertSet].map((href) => href.replace(/^catalog\//, "").replace(/\.html$/, "")),
      home: [...homeCareSet].map((href) => href.replace(/^catalog\//, "").replace(/\.html$/, "")),
    },
  };

  const payload = {
    generatedAt: new Date().toISOString(),
    brand: {
      name: "Imperial Garden",
      siteTitle: "Imperial Garden",
      description:
        "SPA-бренд, основанный на лучших традициях курортного лечения и последних открытиях в области изучения растительных стволовых клеток.",
      logo: "/assets/legacy/logo.svg",
    },
    home,
    series,
    products: productEntries,
    news: newsEntries,
    contacts,
  };

  await fs.writeFile(path.join(dataDir, "legacy-site.json"), JSON.stringify(payload, null, 2));

  console.log(
    JSON.stringify(
      {
        products: productEntries.length,
        series: series.length,
        news: newsEntries.length,
        assets: assetPaths.size,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
