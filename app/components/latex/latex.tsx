import styles from "./latex.module.css";

export default function Latex() {
  return (
    <div className={styles.latex}>
      <div>
        <a href="https://nonacademic.net/">LaTeX4000</a>
      </div>

      <div>
        <a
          href="https://nonacademic.net/ring?action=prev&from=anassm"
          style={{ fontSize: "1.3rem" }}
        >
          {`←`}{" "}
        </a>
        <a href="https://nonacademic.net/ring?action=rand&from=anassm">
          Random
        </a>
        <a
          href="https://nonacademic.net/ring?action=next&from=anassm"
          style={{ fontSize: "1.3rem" }}
        >
          {" "}
          {`→`}{" "}
        </a>
      </div>
    </div>
  );
}
