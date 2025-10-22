// src/config/menu.js
// Items with onlyOn: "ystudio" appear ONLY when pathname starts with /ystudio.

export const SIDEBAR_MENU = [
  // ----- OTT (always visible) -----
  { key: "home",       label: "Home",          path: "/home",                   icon: "home",   section: "OTT" },
  { key: "search",     label: "Search",        path: "/search-recommendations", icon: "search", section: "OTT" },
  { key: "movies",     label: "Movies",        path: "/movies",                 icon: "film",   section: "OTT" },
  { key: "trending",   label: "Trending",      path: "/trending",               icon: "fire",   section: "OTT" },
  { key: "reels",      label: "Reel & Shorts", path: "/reel-short",             icon: "reels",  section: "OTT" },
  { key: "live",       label: "Live TV",       path: "/live",                   icon: "live",   section: "OTT" },
  { key: "categories", label: "Categories",    path: "/categories",             icon: "grid",   section: "OTT" },

  // ----- Creator hub entry (always visible) -----
  { key: "ystudio",    label: "Y-Studio",      path: "/ystudio",                icon: "studio", section: "CREATOR" },
  // ----- Creator submodules (show ONLY inside Y-Studio) -----
  { key: "creator-trending", label: "Trending",      path: "/ystudio/trending",   icon: "fire",     section: "CREATOR", onlyOn: "ystudio" },
  { key: "creator-reels",    label: "Reel & Shorts", path: "/ystudio/reels",      icon: "reels",    section: "CREATOR", onlyOn: "ystudio" },
  { key: "creator-live",     label: "Live TV",       path: "/ystudio/live",       icon: "live",     section: "CREATOR", onlyOn: "ystudio" },
  { key: "creator-event",    label: "Event",         path: "/ystudio/event",      icon: "calendar", section: "CREATOR", onlyOn: "ystudio" },

    // ----- Business / Tools (show ONLY inside Y-Studio) -----
  { key: "admanager",  label: "Ad Manager",    path: "/ystudio/ad-manager",     icon: "ads",      section: "CREATOR", onlyOn: "ystudio" },
  { key: "bizsuite",   label: "Business Suite",path: "/ystudio/business-suite", icon: "briefcase",section: "CREATOR", onlyOn: "ystudio" },
  { key: "metaai",     label: "Meta AI",       path: "/ystudio/meta-ai",        icon: "meta",     section: "CREATOR", onlyOn: "ystudio" },
  { key: "market",     label: "Marketplace",   path: "/ystudio/marketplace",    icon: "store",    section: "CREATOR", onlyOn: "ystudio" },
  { key: "groups",     label: "Groups",        path: "/ystudio/groups",         icon: "users",    section: "CREATOR", onlyOn: "ystudio" },

  // ----- Social / Communication (always visible) -----
  { key: "messenger",  label: "Messenger",     path: "/messenger",              icon: "chat",   section: "SOCIAL" },

  // ----- System (always visible) -----
  { key: "theme",      label: "Theme",         path: "/settings/theme",         icon: "theme",  section: "SYSTEM" },
];
