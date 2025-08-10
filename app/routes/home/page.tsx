import Latex from "~/components/latex/latex";
import type { Route } from "./+types/page";
import styles from "./page.module.css";
import Socials from "~/components/socials/socials";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Anass Moussadi" },
    { name: "description", content: "My portfolio site" },
  ];
}

export default function Home() {
  return (
    <div className={`flex-center container--narrow ${styles.container}`}>
      <h1 className={styles.title}>Anass Moussadi</h1>
      <Socials />
      <div className={styles.latex}>
        <Latex />
      </div>
    </div>
  );
}
