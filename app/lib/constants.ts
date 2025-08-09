import type { NavLink } from "./types";
import { FaHouse } from "react-icons/fa6";
import { PiHandWavingFill } from "react-icons/pi";
import { BsBadge3dFill } from "react-icons/bs";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/", icon: FaHouse },
  { label: "About", path: "/about", icon: PiHandWavingFill },
  { label: "Playground", path: "/playground", icon: BsBadge3dFill },
];
