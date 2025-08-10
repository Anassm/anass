import styles from "./sidebar.module.css";
import { NAV_LINKS } from "~/lib/constants";
import { NavLink } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import UpdateStatus from "../updateStatus/updateStatus";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleMobileNavigation(): void {
    if (window.innerWidth < 700) {
      setIsOpen(false);
    }
  }

  const navigationLinks: ReactNode = NAV_LINKS.map((link, index) => {
    const Icon = link.icon;
    return (
      <li key={index}>
        <NavLink
          to={link.path}
          onClick={handleMobileNavigation}
          className={`flex-center ${styles.navigation}`}
        >
          {Icon && <Icon size={20} />}
          {link.label}
        </NavLink>
      </li>
    );
  });

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.isOpen : ""}`}>
        <ul className={`flex-center ${styles.navigationGroup}`}>
          {navigationLinks}
        </ul>
        <span className={styles.github}>
          <UpdateStatus />
        </span>
      </div>
      <RxHamburgerMenu
        size={60}
        className={styles.hamburger}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
    </>
  );
}
