import styles from "./page.module.css";
import { getReadBySlug, getReadContent } from "~/lib/read";
import path from "path";
import type { Route } from "./+types/page";
import type { IRead } from "~/lib/types";
import { marked } from "marked";

export async function loader({ params }: Route.LoaderArgs) {
  const read = await getReadBySlug(
    path.join(process.cwd(), "data"),
    params.slug
  );
  if (!read) throw new Error("Read not found");

  return read;
}

export default function Read({ loaderData }: Route.ComponentProps) {
  const read: IRead = loaderData;
  const content = marked.parse(read.content);

  return (
    <div className={`container-sm flex-center ${styles.container}`}>
      <h1>{read.title}</h1>
      <br />
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
