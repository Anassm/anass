import { FaLinkedin, FaDiscord, FaGithub } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import styles from "./socials.module.css";

export default function Socials() {
  return (
    <div className={styles.socials}>
      <a
        href="https://linkedin.com/in/anass-moussadi/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/Anassm/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
      {/* <a href="https://x.com/Anasss_AD" target="_blank" rel="noopener noreferrer">
        <FaXTwitter />
      </a> */}
      <a
        href="https://discord.com/users/352901378903113738"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDiscord />
      </a>
      <a href="mailto:a.moussadi03@gmail.com">
        <MdEmail />
      </a>
    </div>
  );
}
