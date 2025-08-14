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
    id: path.basename(filePath, path.extname(filePath)),
    type: yamlData.type,
    title: yamlData.title,
    content: "",
    metadata: {
      tags: yamlData.tags || [],
      cluster: yamlData.cluster || "",
      references: yamlData.references || [],
      createdAt: yamlData.createdAt || "ERROR",
      updatedAt: yamlData.createdAt || "ERROR",
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

export function getReadContent(folderPath: string, fileName: string): IRead {
  const filePath = path.join(folderPath, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(fileContent);

  const metaData = parsed.data as any;

  return {
    id: path.basename(filePath, path.extname(filePath)),
    type: metaData.type,
    title: metaData.title,
    content: parsed.content.trim(),
    metadata: {
      tags: metaData.tags || [],
      cluster: metaData.cluster || "",
      references: metaData.references || [],
      createdAt: metaData.createdAt || "ERROR",
      updatedAt: metaData.updatedAt || "ERROR",
    },
  };
}
