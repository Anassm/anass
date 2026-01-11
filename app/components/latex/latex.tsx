import styles from "./latex.module.css";

export default function Latex() {
  return (
    <div>
      <a href="https://nonacademic.net" title="Collective">
        Latex 4000
      </a>
      <div>
        <a
          href="https://nonacademic.net/ring?action=prev&amp;from=anassm"
          title="Previous"
        >
          ←
        </a>
        <a
          href="https://nonacademic.net/ring?action=rand&amp;from=anassm"
          title="Random"
        >
          Random
        </a>
        <a
          href="https://nonacademic.net/ring?action=next&amp;from=anassm"
          title="Next"
        >
          →
        </a>
      </div>
    </div>
  );
}
