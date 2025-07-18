import React, { useState, useEffect } from "react";
import Link from "next/link";
import HeaderAnnouncementSlider from "./HeaderAnnouncementSlider";

const menu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Bamboo House",
    submenu: [
      { label: "Best Sellers", href: "/collections/1-modern-bamboo-hanging-wall-art-standing-plant-and-flower-pot-stylish-decor-perfect-for-home-garden" },
      { label: "Bamboo Home", href: "/collections/bamboo-house-luxury/House" },
      { label: "Eco Serenity Gazebos", href: "/collections/premium-bamboo-gazebo/Gazebo" },
      { label: "The Zen Canopies", href: "/collections/bamboo-canopy-in-pakistan/Canopies" },
      { label: "Carports Garage", href: "/collections/bamboo-shades-for-carports-ceiling-design-elegant-solutions-of-car-vigo-for-you" },
    ],
  },
  {
    label: "Bamboo Living",
    submenu: [
      { label: "Dining Table Set", href: "/collections/premium-bamboo-dining-sets/Bamboo-Chair-Table" },
      { label: "Luxury Sofa Set", href: "/collections/premium-bamboo-lounge-set-with-cushioned-seating-modern-outdoor-indoor-comfort" },
      { label: "Bamboo Dream Beds", href: "/collections/bamboo-single-kid-bed/Beds" },
      { label: "Multi Purpose Aura Stands", href: "/collections/stylish-bamboo-plant-stands-pot-stands-for-indoor-outdoor-spaces-plant-holders-racks-and-shelves/Stands" },
    ],
  },
  {
    label: "Bamboo Boundaries",
    submenu: [
      { label: "Bamboo Garden Frames", href: "/collections/premium-bamboo-fence-panels-elegant-fence-wall-garden-fence-idea/Fence" },
      { label: "Natural Privacy Walls", href: "/collections/bamboo-wall-designs/Walls" },
    ],
  },
  {
    label: "Kids Planet",
    submenu: [
      { label: "Baby Beds", href: "/collections/eco-friendly-bamboo-kids-beds-perfect-for-children/Beds-Stylish" },
      { label: "Baby Furniture", href: "/collections/bamboo-kids-chair" },
      { label: "Relax & Play Swings", href: "/collections/explore-the-best-bamboo-hanging-chairs-swing-garden-swings-and-rocking-swings-for-every-space" },
    ],
  },
  {
    label: "Categories",
    href: "/collections",
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/share/1EVwQs5T9X/?mibextid=wwXIfr", label: "Facebook", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10.049C18 5.603 14.419 2 10 2s-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951"></path></svg>
  ) },
  { href: "https://www.instagram.com/ecobambo0?igsh=a3dpZ3NiY2R6d3Uw&utm_source=qr", label: "Instagram", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.4 2.4 0 0 0-.912.593 2.5 2.5 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23s.01 2.39.046 3.229c.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046s2.39-.01 3.23-.046c.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23s-.01-2.39-.055-3.229c-.027-.784-.164-1.204-.274-1.495a2.4 2.4 0 0 0-.593-.913 2.6 2.6 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045a63 63 0 0 1 3.302.045c.664.014 1.321.14 1.943.374a4 4 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.9 3.9 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.15 4.15 0 0 1-1.414-.922 4.1 4.1 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.4 4.4 0 0 1 .92-1.414 4.2 4.2 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805m1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93m5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355" clipRule="evenodd" /></svg>
  ) },
  { href: "https://www.tiktok.com/@ecobambo0?_t=ZS-8uYnW51R4Sb&_r=1", label: "TikTok", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205z"></path></svg>
  ) },
  { href: "https://www.youtube.com/channel/UCMEfaztIY2KxW6fFh_J8zmw", label: "YouTube", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18.16 5.87c.34 1.309.34 4.08.34 4.08s0 2.771-.34 4.08a2.13 2.13 0 0 1-1.53 1.53c-1.309.34-6.63.34-6.63.34s-5.321 0-6.63-.34a2.13 2.13 0 0 1-1.53-1.53c-.34-1.309-.34-4.08-.34-4.08s0-2.771.34-4.08a2.17 2.17 0 0 1 1.53-1.53C4.679 4 10 4 10 4s5.321 0 6.63.34a2.17 2.17 0 0 1 1.53 1.53M8.3 12.5l4.42-2.55L8.3 7.4z"></path></svg>
  ) },
];

const specialSlugs = [
  "/products/large-bamboo-standing-plant-pot-unique-affordable",
  "/products/small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot",
  "/products/1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas",
  "/products/small-bamboo-hanging-with-stand-stylish-home-wall-art-decor"
];

function getLinkHref(href) {
  if (specialSlugs.some(slug => href.endsWith(slug))) {
    return href;
  }
  if (href.startsWith("http")) return href;
  return `https://ecobambo.com${href}`;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to determine active menu item (for demo, only Home is active)
  const isActive = (href) => href === "/";

  return (
    <>
      {/* Utility Bar */}
      <div className="w-full bg-[#B8860B] flex items-center border-b h-12 border-[rgba(184,134,11,0.15)]">
        <div className="max-w-[130rem] mx-auto flex items-center justify-between px-4 py-1 w-full h-12 items-center">
          {/* Social Icons - always left */}
          <ul className="hidden lg:flex gap-4 items-center h-full">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:opacity-80">
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          {/* Announcement Slider - always centered */}
          <div className="flex-1 flex justify-center">
            <HeaderAnnouncementSlider />
          </div>
          {/* Right Spacer for symmetry (optional, can be empty or used for other icons) */}
          <div className="w-8" />
        </div>
      </div>
      {/* Existing Header */}
      <header className="sticky top-0 z-50 w-full block border-b border-[rgba(184,134,11,0.08)] bg-black text-[rgb(184,134,11,1)]" style={{backgroundAttachment: 'fixed', fontFamily: 'Jost, sans-serif', fontStyle: 'normal', fontWeight: 400, letterSpacing: '0.06rem', lineHeight: 'calc(1 + 0.8 / 1.0)', fontSize: '0.5rem', height: '3rem'}}>
        {/* Mobile/Tablet Header Layout */}
        <div className="flex md:flex lg:hidden items-center justify-between max-w-[130rem] px-4 h-full w-full relative">
          {/* Hamburger Menu */}
          <button
            className="p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-drawer"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-7 h-7" viewBox="0 0 18 17"><path fill="currentColor" d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-7 h-7" viewBox="0 0 18 16"><path fill="currentColor" d="M1 .5a.5.5 0 1 0 0 1h15.71a.5.5 0 0 0 0-1zM.5 8a.5.5 0 0 1 .5-.5h15.71a.5.5 0 0 1 0 1H1A.5.5 0 0 1 .5 8m0 7a.5.5 0 0 1 .5-.5h15.71a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5" /></svg>
            )}
          </button>
          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full pointer-events-none">
            <Link href="/" className="flex items-center gap-2 pointer-events-auto">
              <img
                src="https://ecobambo.com/cdn/shop/files/Untitled_design_15.png?v=1743799787&width=200"
                alt="ECO BAMBO"
                width={160}
                height={30}
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
          {/* Right: Search, Account, and Cart Icons (mobile/tablet) */}
          <div className="flex items-center gap-4 ml-auto md:flex lg:hidden">
            <Link href={getLinkHref("/search")} className="hover:text-[rgb(184,134,11,1)]" aria-label="Search">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18m.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7z" clipRule="evenodd" /></svg>
            </Link>
            <Link href={getLinkHref("https://shopify.com/60579741763/account?locale=en&region_country=PK")} className="hover:text-[rgb(184,134,11,1)]" rel="nofollow" aria-label="Account">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 18 19"><path fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd" /></svg>
            </Link>
            <Link href={getLinkHref("/cart")} className="hover:text-[rgb(184,134,11,1)]" aria-label="Cart">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 40 40"><path fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" /></svg>
            </Link>
          </div>
        </div>
        {/* Desktop Header Layout (lg and up) */}
        <div className="hidden lg:flex items-center justify-between max-w-[130rem] px-4 h-full w-full">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://ecobambo.com/cdn/shop/files/Untitled_design_15.png?v=1743799787&width=200"
                alt="ECO BAMBO"
                width={scrolled ? 140 : 220}
                height={scrolled ? 28 : 44}
                className={`object-contain transition-all duration-300 h-[${scrolled ? '7' : '11'}vh] w-auto`}
                loading="eager"
              />
            </Link>
          </div>
          {/* Menu in the center */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex gap-4" style={{ fontSize: '0.7rem' }}>
              {menu.map((item, idx) =>
                item.submenu ? (
                  <li key={item.label} className="relative group">
                    <button
                      className="header__menu-item flex items-center px-4 py-2 font-dmsans font-semibold text-xs text-[rgb(184,134,11,0.8)] hover:text-[rgb(184,134,11,1)] hover:underline hover:decoration-[rgb(184,134,11,1)] focus:outline-none gap-1 whitespace-nowrap"
                      style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
                      onClick={() => setOpenSubmenu(openSubmenu === idx ? null : idx)}
                      aria-expanded={openSubmenu === idx}
                      aria-controls={`desktop-submenu-${idx}`}
                    >
                      <span>{item.label}</span>
                      <svg className="icon icon-caret w-3 h-3" viewBox="0 0 10 6"><path fill="currentColor" fillRule="evenodd" d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708" clipRule="evenodd" /></svg>
                    </button>
                    {openSubmenu === idx && (
                      <ul
                        id={`HeaderMenu-MenuList-${idx}`}
                        className="header__submenu list-menu list-menu--disclosure color-scheme-1 gradient caption-large motion-reduce global-settings-popup absolute left-0 mt-2 w-44 pr-4 rounded-lg shadow-lg z-20 py-2 bg-white border border-[rgba(184,134,11,0.1)]"
                        role="list"
                        tabIndex={-1}
                      >
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <a
                              id={`HeaderMenu-${item.label.toLowerCase().replace(/\s/g, '-')}-${sub.label.toLowerCase().replace(/\s/g, '-')}`}
                              href={getLinkHref(sub.href)}
                              className="header__menu-item list-menu__item link link--text focus-inset caption-large flex w-full items-center  px-4 py-2 font-dmsans font-medium text-[11px] text-left text-gray-700 rounded focus:outline-none hover:underline hover:decoration-black whitespace-nowrap"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={getLinkHref(item.href)}
                      className={`header__menu-item flex items-center px-4 py-2 font-dmsans font-semibold text-xs ${item.label === 'Home' ? 'underline decoration-[rgb(184,134,11,1)] text-[rgb(184,134,11,1)] font-bold' : 'text-[rgb(184,134,11,0.8)]'} hover:text-[rgb(184,134,11,1)] hover:underline hover:decoration-[rgb(184,134,11,1)] whitespace-nowrap`}
                      style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
          {/* Icons on the right */}
          <div className="flex items-center gap-6 ml-auto">
            <Link href={getLinkHref("/search")} className="hover:text-[rgb(184,134,11,1)]" aria-label="Search">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 18 19"><path fill="currentColor" fillRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18m.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7z" clipRule="evenodd" /></svg>
            </Link>
            <Link href={getLinkHref("https://shopify.com/60579741763/account?locale=en&region_country=PK")} className="hover:text-[rgb(184,134,11,1)]" rel="nofollow" aria-label="Account">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 18 19"><path fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd" /></svg>
            </Link>
            <Link href={getLinkHref("/cart")} className="hover:text-[rgb(184,134,11,1)]" aria-label="Cart">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 40 40"><path fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" /></svg>
            </Link>
          </div>
        </div>

            
      
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
              <div className="fixed top-0 left-0 w-72 h-full bg-black shadow-lg p-6 overflow-y-auto border-r border-[rgba(184,134,11,0.1)]">
            <div className="flex items-center justify-between mb-6">
              
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="https://ecobambo.com/cdn/shop/files/Untitled_design_15.png?v=1743799787&width=200"
                  alt="ECO BAMBO"
                  width={160}
                  height={30}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 18 17"><path fill="currentColor" d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z" /></svg>
              </button>
            </div>
            <nav>
              <ul className="flex flex-col gap-1">
                {menu.map((item, idx) =>
                  item.submenu ? (
                    <li key={item.label}>
                      <button
                            className="w-full text-left px-2 py-2 font-dmsans text-sm font-semibold text-[#b8860bcc] hover:text-[#B8860B] hover:underline hover:decoration-[#B8860B] flex items-center justify-between whitespace-nowrap"
                            style={{fontFamily: 'DM Sans, sans-serif', fontWeight: 600}}
                        onClick={() => setOpenSubmenu(openSubmenu === idx ? null : idx)}
                            aria-expanded={openSubmenu === idx}
                            aria-controls={`mobile-submenu-${idx}`}
                      >
                            <span>{item.label}</span>
                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 10 6"><path fillRule="evenodd" d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708" clipRule="evenodd" /></svg>
                      </button>
                      {openSubmenu === idx && (
                            <ul
                              id={`HeaderMenu-MenuList-mobile-${idx}`}
                              className="header__submenu list-menu list-menu--disclosure color-scheme-1 gradient caption-large motion-reduce global-settings-popup ml-4 mt-1 border-l border-[rgba(184,134,11,0.1)] pl-2 bg-white rounded-lg shadow-lg py-2 w-44 pr-4"
                              role="list"
                              tabIndex={-1}
                            >
                              {item.submenu.map((sub) => (
                                <li key={sub.label}>
                                  <a
                                    id={`HeaderMenu-${item.label.toLowerCase().replace(/\s/g, '-')}-${sub.label.toLowerCase().replace(/\s/g, '-')}`}
                                    href={getLinkHref(sub.href)}
                                    className="header__menu-item list-menu__item link link--text focus-inset caption-large flex w-full items-center justify-center px-4 py-2 font-dmsans font-medium text-[12px] text-gray-700 rounded focus:outline-none hover:underline hover:decoration-black whitespace-nowrap"
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                      )}
                    </li>
                  ) : (
                    <li key={item.label}>
                          <Link
                            href={getLinkHref(item.href)}
                            className={`block px-2 py-2 font-dmsans text-sm font-semibold ${isActive(item.href) ? 'border-b-2 border-[#FFD700] text-[#FFD700] font-bold' : 'text-[#b8860bcc]'} hover:text-[#FFD700] hover:underline hover:decoration-[#FFD700] whitespace-nowrap`}
                            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
                          >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
            <div className="flex gap-2 mt-6">
              <a href={getLinkHref("https://shopify.com/60579741763/account?locale=en&region_country=PK")} className="p-2 hover:text-[#B8860B]" rel="nofollow" aria-label="Account">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 18 19"><path fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd" /></svg>
              </a>
              <a href={getLinkHref("/cart")} className="p-2 hover:text-[#B8860B]" aria-label="Cart">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 40 40"><path fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z" /></svg>
              </a>
            </div>
          </div>
          {/* Overlay click closes menu */}
          <div className="fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
} 