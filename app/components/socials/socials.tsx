import { FaLinkedin, FaDiscord, FaGithub } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./socials.module.css";

export default function Socials() {
  return (
    <div className={styles.socials}>
      <a href="https://linkedin.com/in/anass-moussadi/">
        <FaLinkedin />
      </a>
      <a href="https://github.com/Anassm/">
        <FaGithub />
      </a>
      {/* <a href="https://x.com/Anasss_AD">
        <FaXTwitter />
      </a> */}
      <a href="https://discord.com/users/352901378903113738">
        <FaDiscord />
      </a>
      <a href="mailto:a.moussadi03@gmail.com">
        <HiOutlineMail />
      </a>
    </div>
  );
}
