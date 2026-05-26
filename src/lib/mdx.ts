import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export interface TocHeading {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w가-힣ㄱ-ㅎㅏ-ㅣ-]/g, "");
}

function extractH2Headings(source: string): TocHeading[] {
  return source
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugify(text), text };
    });
}

export async function getGuide(slug: string) {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  let source: string;
  try {
    source = await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  const headings = extractH2Headings(source);
  return { content, headings };
}
