import legacyData from "@/data/generated/legacy-site.json";
import type {
  ContactSectionLink,
  NavigationItem,
  NewsArticle,
  OrderPageSection,
  Product,
  PurposeTag,
  Series,
  TrainingEvent,
} from "@/lib/types";
import { getSiteUrl } from "@/lib/site-url";
import { parseRuDate, slugifySegment } from "@/lib/utils";

const siteUrl = getSiteUrl();

export const brand = {
  name: legacyData.brand.name,
  siteUrl,
  logo: "/assets/brand/logo-primary.svg",
  description:
    "Премиальный бренд ухода за телом с морскими минералами, ботаническими экстрактами и SPA-ритуалами для салона и дома.",
  heroTitle: "Красота тела в ритме моря.",
  heroSubtitle:
    "Профессиональная коллекция Imperial Garden объединяет кабинетные линии, домашний уход и обучение мастеров в эстетике ботаники, моря и деликатного SPA-ритма.",
  heroHighlights: [
    "Профессиональные линии для SPA, массажа и салонных ритуалов",
    "Домашний уход с красивыми текстурами и выразительными ароматами",
    "Семинары и сопровождение для мастеров, студий и салонов",
  ],
};

export const heroQuickLinks = [
  {
    label: "Кабинетные линии",
    href: "/#professional-lines",
  },
  {
    label: "Домашний уход",
    href: "/#home-care",
  },
  {
    label: "Обучение мастеров",
    href: "/#training-masters",
  },
];

export const featuredSeriesLead = {
  eyebrow: "Красота. Гармония. Совершенство",
  title: "Избранные серии",
  text:
    "Imperial Garden профессиональная коллекция косметики для SPA-процедур с ботаническим и морским акцентом. Роскошные текстуры средств, легкие ароматы видимый результат после первой процедуры.",
  detail:
    "Морские растения, ботанические экстракты, деликатные текстуры формируют индивидуальность бренда Imperial Garden.",
};

export const purposeLabels: Record<PurposeTag, string> = {
  "anti-cellulite": "Антицеллюлитный уход",
  toning: "Тонус кожи",
  "figure-correction": "Коррекция фигуры",
  relax: "Релакс",
  nutrition: "Питание",
  "spa-ritual": "SPA-ритуал",
  lifting: "Лифтинг",
  firming: "Упругость",
  "anti-age": "Anti-Age",
  massage: "Массаж",
  recovery: "Восстановление",
  detox: "Детокс",
  revitalization: "Ревитализация",
  drainage: "Дренаж",
  "mineral-care": "Минеральный уход",
  hydration: "Увлажнение",
  "home-care": "Домашний уход",
  professional: "Профессиональное применение",
};

const legacySeries = legacyData.series as Series[];
const legacyProducts = legacyData.products as Omit<Product, "price" | "priceLabel">[];
const legacyNews = legacyData.news as NewsArticle[];

export const series = legacySeries;

export const products: Product[] = legacyProducts.map((product) => ({
  ...product,
  price: null,
  priceLabel: "Цена по запросу",
}));

export const seriesMap = new Map(series.map((item) => [item.slug, item]));
export const productsMap = new Map(products.map((item) => [item.slug, item]));
const productsByLegacyId = new Map(products.map((item) => [item.id, item]));

export const productsWithRelations = products.map((product) => ({
  ...product,
  relatedProducts: product.relatedIds
    .map((relatedId) => productsByLegacyId.get(relatedId))
    .filter((value): value is Product => Boolean(value))
    .slice(0, 4),
}));

export const news = [...legacyNews]
  .map((item) => ({
    ...item,
    slug: slugifySegment(item.slug),
  }))
  .sort((a, b) => parseRuDate(b.date).getTime() - parseRuDate(a.date).getTime());

export const newsMap = new Map(news.map((item) => [item.slug, item]));

export const seminars: TrainingEvent[] = news
  .filter((item) => item.kind === "seminar")
  .map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    publicationDate: item.date,
    status: "archive",
    format: "seminar",
    blocks: item.blocks,
    sourceNewsSlug: item.slug,
  }));

export const webinars: TrainingEvent[] = [
  {
    slug: "webinar-consultation-format",
    title: "Онлайн-разбор линий Imperial Garden",
    summary:
      "Дистанционный формат для знакомства с коллекциями бренда, логикой процедур и домашним продолжением ухода.",
    publicationDate: "По запросу",
    status: "request",
    format: "webinar",
    blocks: [
      {
        type: "paragraph",
        text: "Онлайн-встречи доступны по предварительному запросу для салонов, SPA-пространств и частных специалистов, которые хотят быстро познакомиться с линиями Imperial Garden.",
      },
      {
        type: "list",
        items: [
          "Подбор линий под формат кабинета и клиентские задачи",
          "Разбор домашнего ухода после процедур",
          "Рекомендации по стартовому ассортименту и обучению команды",
        ],
      },
    ],
  },
];

export const trainingEventsMap = new Map(
  [...seminars, ...webinars].map((item) => [item.slug, item]),
);

export const homeSelections = {
  professional: legacyData.home.groups.professional
    .map((id) => productsByLegacyId.get(id))
    .filter((value): value is Product => Boolean(value)),
  home: legacyData.home.groups.home
    .map((id) => productsByLegacyId.get(id))
    .filter((value): value is Product => Boolean(value)),
};

export const featuredSeries = [
  "anti-cellulite",
  "lift-slim",
  "thermal-spa",
  "massage-thermal-spa",
  "mousse-juice",
  "lifting-expert",
]
  .map((slug) => seriesMap.get(slug))
  .filter((value): value is Series => Boolean(value));

export const popularProducts = [
  "1000ml__anti-cellulite__thermoactive",
  "1000ml__delight__chocolate-cream",
  "1000ml__lift&slim__contouring",
  "1000ml__thermal-spa__detox",
  "500ml__massage-thermal-spa__detox",
  "030ml__body-corrector",
  "200ml__mousse&juice__coconut",
  "200ml__natural-power__needles-cream",
]
  .map((id) => productsByLegacyId.get(id))
  .filter((value): value is Product => Boolean(value));

export const advantages = [
  {
    title: "Ритуалы для тела",
    text: "Скрабы, маски, кремы и масла складываются в выразительные процедуры для кабинета и домашнего продолжения ухода.",
  },
  {
    title: "Морские и ботанические акценты",
    text: "Минералы, масла и растительные экстракты задают образ бренда: свежий, женственный и визуально богатый.",
  },
  {
    title: "Подача для мастеров и салонов",
    text: "Линии легко встраиваются в SPA-программы, массажные практики и процедуры коррекции силуэта.",
  },
  {
    title: "Уход, который хочется повторять",
    text: "Линии бренда легко продолжаются дома и поддерживают впечатление от салонного ритуала.",
  },
];

export const companyStory = {
  intro:
    "Imperial Garden вырос из идеи превратить уход за телом в красивый ритуал — чувственный, профессиональный и визуально изящный.",
  paragraphs: [
    legacyData.home.intro,
    "В формулах важное место занимают морские компоненты, масла и ботанические экстракты, которые помогают коже сохранить мягкость, тонус и ощущение ухоженности.",
    "Бренд объединяет уход для кабинета, домашние средства и обучение мастеров, сохраняя эстетику SPA-ритуала в каждой линии.",
  ],
};

export const companyValues = [
  {
    title: "Текстуры и ароматы",
    text: "Уход должен работать эффективно и при этом дарить телу красивое чувственное ощущение.",
  },
  {
    title: "Морской характер",
    text: "Минералы, водоросли, соли и свежие ноты моря делают линии узнаваемыми и выразительными.",
  },
  {
    title: "Профессиональная подача",
    text: "Каждая коллекция легко раскрывается в кабинете и поддерживает впечатление от процедуры.",
  },
  {
    title: "Женственная эстетика",
    text: "Визуальный язык бренда строится на мягкости, свете, листьях, воде и деликатном ощущении премиальности.",
  },
];

export const professionalBenefits = [
  "Линии подходят для SPA-ритуалов, массажа, моделирующих и дренажных программ.",
  "Выразительные ароматы и плотные текстуры усиливают впечатление от процедуры.",
  "Профессиональный уход легко сочетать с домашними средствами той же линии.",
  "Семинары помогают глубже раскрыть линии и выстроить красивую подачу в кабинете.",
];

export const homeCareBenefits = [
  "Средства продолжают впечатление от салонной процедуры дома.",
  "Текстуры комфортны для регулярного ухода и приятно ощущаются на коже.",
  "Морская свежесть, тепло масел и ботанические акценты создают красивый домашний ритуал.",
];

export const ctaLead = {
  title: "Подобрать линию ухода или обсудить заказ",
  text: "Оставьте заявку, и мы поможем выбрать серию для кабинета, домашнего ухода или обучения.",
};

const rawContacts = legacyData.contacts as {
  pageTitle: string;
  leadTitle: string;
  leadText: string;
  professionalPoints: string[];
  introTitle: string;
  introText: string;
  office: string;
  phone: string;
  email: string;
  social: Array<{
    label: string;
    href: string;
  }>;
  representatives: string[];
};

export const contacts = {
  ...rawContacts,
  representatives: [
    rawContacts.representatives.slice(0, 2),
    rawContacts.representatives.slice(2),
  ],
};

export const contactsQuickLinks: ContactSectionLink[] = [
  {
    href: "/contacts/order",
    label: "Как сделать заказ",
    description: "Короткий путь от выбора средств до подтверждения менеджером.",
  },
  {
    href: "/contacts/payment",
    label: "Способ оплаты",
    description: "Когда согласуется стоимость и как оформляется оплата.",
  },
  {
    href: "/contacts/shipping",
    label: "Доставка",
    description: "Что влияет на отправку и какие детали уточняются заранее.",
  },
  {
    href: "/contacts/returns",
    label: "Возврат товара",
    description: "Куда написать, если нужно быстро разобрать ситуацию по заказу.",
  },
];

export const orderInfo: OrderPageSection[] = [
  {
    title: "1. Выберите средства",
    body: [
      "Откройте каталог и добавьте нужные позиции в корзину. Если удобнее, можно сразу оставить запрос на подбор, а менеджер соберет линию под кабинет, SPA-ритуал или домашний уход.",
      "В карточках собраны ключевые свойства, объемы, рекомендации по применению и близкие по задаче средства.",
    ],
  },
  {
    title: "2. Оставьте контакты",
    body: [
      "Для заявки достаточно имени, телефона, email и комментария. Этого хватает, чтобы быстро связаться с вами и уточнить детали заказа.",
    ],
  },
  {
    title: "3. Подтверждение заказа",
    body: [
      "После заявки менеджер уточняет наличие, объем партии, условия для специалистов и итоговую стоимость. Затем вы подтверждаете заказ и выбираете удобный формат оплаты и доставки.",
    ],
  },
];

export const paymentInfo: OrderPageSection[] = [
  {
    title: "Оплата после подтверждения заказа",
    body: [
      "Стоимость уточняется после подтверждения состава корзины. Так можно учесть объем партии, профессиональные условия и формат поставки.",
      "После согласования заказа менеджер направляет реквизиты и помогает выбрать удобный способ оплаты.",
    ],
  },
];

export const shippingInfo: OrderPageSection[] = [
  {
    title: "Отправка после согласования деталей",
    body: [
      "Доставка организуется после подтверждения заказа. Формат отправки зависит от региона, объема партии и статуса клиента.",
      "Если нужен стартовый набор для кабинета или консультация по первому заказу, это можно указать в комментарии к заявке.",
    ],
  },
];

export const returnInfo: OrderPageSection[] = [
  {
    title: "Возврат и разбор ситуации",
    body: [
      "Если по заказу возник вопрос, свяжитесь с менеджером по телефону или email из раздела контактов. Мы поможем быстро разобраться с комплектацией, доставкой и состоянием продукции.",
      "Для обращения укажите номер заявки, название товара и короткое описание ситуации.",
    ],
  },
];

export const navigation: NavigationItem[] = [
  {
    href: "/",
    label: "Главная",
  },
  {
    href: "/about",
    label: "О бренде",
    children: [
      {
        href: "/about",
        label: "О компании",
        description: "История, эстетика и ценности Imperial Garden.",
      },
      {
        href: "/about/professionals",
        label: "Профессионалам",
        description: "Коллекции и форматы работы для SPA, салонов и мастеров.",
      },
    ],
  },
  {
    href: "/salons",
    label: "Салонам",
  },
  {
    href: "/catalog",
    label: "Каталог",
    children: [
      {
        href: "/catalog",
        label: "Все товары",
        description: "Линии, форматы и продукты для салона и дома.",
      },
      ...featuredSeries.slice(0, 4).map((item) => ({
        href: `/catalog/series/${item.slug}`,
        label: item.name,
        description: item.description,
      })),
    ],
  },
  {
    href: "/training",
    label: "Обучение",
    children: [
      {
        href: "/training/seminars",
        label: "Семинары",
        description: "Архив программ, техник и тем бренда.",
      },
      {
        href: "/training/webinars",
        label: "Вебинары",
        description: "Онлайн-консультации и дистанционные форматы по запросу.",
      },
    ],
  },
  {
    href: "/news",
    label: "Новости",
  },
  {
    href: "/contacts",
    label: "Контакты",
    children: contactsQuickLinks.map((item) => ({
      href: item.href,
      label: item.label,
      description: item.description,
    })),
  },
];

export const footerGroups = [
  {
    title: "Навигация",
    links: [
      { href: "/", label: "Главная" },
      { href: "/salons", label: "Салонам" },
      { href: "/catalog", label: "Каталог" },
      { href: "/training", label: "Обучение" },
      { href: "/news", label: "Новости" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Категории",
    links: [
      { href: "/salons", label: "Салонам" },
      { href: "/catalog?group=professional", label: "Для профессионалов" },
      { href: "/catalog?group=home", label: "Домашний уход" },
      { href: "/training/seminars", label: "Семинары" },
    ],
  },
  {
    title: "Сервис",
    links: contactsQuickLinks,
  },
];

export const seoDefaults = {
  title: "Imperial Garden | Премиальный SPA-бренд ухода за телом",
  description: brand.description,
  image: `${siteUrl}/assets/legacy/thermal-spa.jpg`,
};

export function getSeriesBySlug(slug: string) {
  return seriesMap.get(slug);
}

export function getProductBySlug(slug: string) {
  return productsWithRelations.find((item) => item.slug === slug);
}

export function getNewsBySlug(slug: string) {
  return newsMap.get(slug);
}

export function getTrainingEventBySlug(slug: string) {
  return trainingEventsMap.get(slug);
}

export function getProductsForSeries(seriesSlug: string) {
  return products.filter((item) => item.seriesSlug === seriesSlug);
}

export function getSeriesPreviewProducts(seriesSlug: string, count = 3) {
  return getProductsForSeries(seriesSlug).slice(0, count);
}
