import type { ContentBlock } from "@/lib/types";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-base leading-8 text-[var(--color-forest-muted)]">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }

        return (
          <ul key={index} className="list-disc space-y-2 pl-5">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

