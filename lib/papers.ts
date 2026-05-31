import fs from "fs";
import path from "path";
import matter from "gray-matter";

const papersDirectory = path.join(process.cwd(), "content/papers");

export type Paper = {
  title: string;
  slug: string;
  date: string;
  category: string;
  thumbnail: string;
  excerpt: string;
  content: string;
};

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(papersDirectory)) return [];

  const files = fs.readdirSync(papersDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(papersDirectory, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);

      return {
        title: data.title ?? "",
        slug: data.slug ?? file.replace(/\.md$/, ""),
        date: data.date ?? "",
        category: data.category ?? "",
        thumbnail: data.thumbnail ?? "",
        excerpt: data.excerpt ?? "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPaper(): Paper | null {
  const papers = getAllPapers();
  return papers[0] ?? null;
}

export function getPaperBySlug(slug: string): Paper | null {
  return getAllPapers().find((paper) => paper.slug === slug) ?? null;
}