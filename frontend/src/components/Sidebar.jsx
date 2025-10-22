// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_MENU } from "../config/menu";

// React Icons (valid imports)
import {
  FaHome as IconHome, FaFire as IconFire, FaSearch as IconSearch, FaTv as IconTv,
  FaUserFriends as IconUsers, FaFacebookMessenger as IconChat, FaCalendarAlt as IconCalendar,
  FaBriefcase as IconBriefcase, FaMoon as IconTheme, FaBullhorn as IconAds, FaStore as IconStore,
  FaPlay as IconReels,
} from "react-icons/fa";
import { PiPopcornDuotone as IconFilm } from "react-icons/pi";
import { BiCategory as IconGrid } from "react-icons/bi";
import { SiYoutubestudio as IconStudio } from "react-icons/si";
import { TbBrandMetabrainz as IconMeta } from "react-icons/tb";

const ICON_MAP = {
  home: IconHome, search: IconSearch, film: IconFilm, fire: IconFire, reels: IconReels,
  live: IconTv, grid: IconGrid, studio: IconStudio, chat: IconChat, users: IconUsers,
  store: IconStore, calendar: IconCalendar, ads: IconAds, briefcase: IconBriefcase,
  meta: IconMeta, theme: IconTheme,
};

export default function Sidebar({ collapsed = false, onToggleTheme }) {
  const { pathname } = useLocation();
  const insideYStudio = pathname.startsWith("/ystudio");

  // Only show items that match context requirement
  const visible = SIDEBAR_MENU.filter((item) => {
    if (item.onlyOn === "ystudio") return insideYStudio;
    return true;
  });

  const sections = ["OTT", "CREATOR", "SOCIAL", "SYSTEM"];

  return (
    <aside className={`sidebar d-flex flex-column align-items-center ${collapsed ? "collapsed" : ""}`}>
      <nav className="flex-column sidebar-nav px-2 w-100 text-center">
        {sections.map((group) => {
          const items = visible.filter((m) => m.section === group);
          if (!items.length) return null;

          return (
            <div key={group} className="sidebar-group mb-3">
              <div className="sidebar-label text-muted small text-uppercase mt-2 mb-1 text-start ps-3">
                {group === "CREATOR" ? "Y-Studio" : group}
              </div>

              {items.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? IconHome;
                const active = pathname === item.path || pathname.startsWith(item.path + "/");
                const isTheme = item.key === "theme";

                return isTheme ? (
                  <button
                    key={item.key}
                    type="button"
                    onClick={onToggleTheme}
                    className={`nav-link d-flex align-items-center justify-content-center ${active ? "active" : ""}`}
                  >
                    <Icon className="me-2" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`nav-link d-flex align-items-center justify-content-center ${active ? "active" : ""}`}
                  >
                    <Icon className="me-2" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
