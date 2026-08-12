import type { IRead } from "./types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readline from "readline";
import yaml from "js-yaml";

async function getMetaDataOnly(filePath: string): Promise<IRead> {
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: stream });

  let yamlLines: string[] = [];
  let insideFrontMatter = false;

  for await (const line of rl) {
    if (line.trim() === "---") {
      if (!insideFrontMatter) {
        insideFrontMatter = true;
      } else {
        break;
      }
    } else if (insideFrontMatter) {
      yamlLines.push(line);
    }
  }

  rl.close();
  stream.close();

  const yamlString = yamlLines.join("\n");
  const yamlData = yaml.load(yamlString) as any;

  return {
    title: yamlData.title,
    type: yamlData.type,
    content: "",
    filename: path.basename(filePath),
    slug: yamlData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, ""),
    metadata: {
      tags: yamlData.tags || [],
      cluster: yamlData.cluster || "",
      core: yamlData.core || [],
      reference: yamlData.reference || [],
      createdAt: yamlData.createdAt || "unknown",
      updatedAt: yamlData.createdAt || "unknown",
    },
  };
}

export async function getAllReadMetaData(folderPath: string): Promise<IRead[]> {
  return Promise.all(
    fs
      .readdirSync(folderPath)
      .map((file) => getMetaDataOnly(path.join(folderPath, file)))
  );
}

export function getReadContent(folderPath: string, fileTitle: string): IRead {
  const filePath = path.join(folderPath, fileTitle);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(fileContent);

  const yamlData = parsed.data as any;

  return {
    title: yamlData.title,
    type: yamlData.type,
    content: parsed.content.trim(),
    filename: path.basename(filePath),
    slug: yamlData.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, ""),
    metadata: {
      tags: yamlData.tags || [],
      cluster: yamlData.cluster || "",
      core: yamlData.core || [],
      reference: yamlData.reference || [],
      createdAt: yamlData.createdAt || "unknown",
      updatedAt: yamlData.updatedAt || "unknown",
    },
  };
}

export async function getReadBySlug(
  folderPath: string,
  slug: string
): Promise<IRead | null> {
  const allReads = await getAllReadMetaData(folderPath);
  const readMeta = allReads.find((r) => r.slug === slug);
  if (!readMeta) return null;
  return getReadContent(folderPath, readMeta.filename);
}
