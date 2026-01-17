import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export function getAllEntries(kind: "log" | "papers") {
  const dir = path.join(process.cwd(), "content", kind);
  const files = fs.readdirSync(dir);

  return files.map((file: string) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    return { slug: file.replace(".md", ""), ...data };
  });
}