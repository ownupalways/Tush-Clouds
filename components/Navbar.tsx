"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

const mainNavLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const activitiesDropdown: DropdownItem[] = [
  { label: "Projects", href: "/projects", description: "View our work" },
  { label: "Testimonials", href: "/testimonials", description: "Client feedback" },
  { label: "Experience", href: "/experiences", description: "Our journey" },
  { label: "Reviews", href: "/reviews", description: "Customer reviews" },
];

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

function NavLink({ href, label, isActive, onClick, mobile = false }: NavLinkProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`group relative flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 overflow-hidden ${
          isActive
            ? "text-white shadow-lg"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        style={isActive ? {
          background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
        } : undefined}
      >
        <span className="relative z-10">{label}</span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={`relative z-10 text-sm transition-all duration-300 ${
            isActive
              ? "translate-x-0 opacity-100"
              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group relative px-5 py-2.5 text-sm lg:text-base font-semibold transition-all duration-300 rounded-xl ${
        isActive
          ? "text-white"
          : "text-gray-700 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-lemon"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <div
          className="absolute inset-0 rounded-xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
          }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, mounted } = useTheme();

  const isActivitiesActive = activitiesDropdown.some((item) => pathname === item.href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-100">
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
              }}
            >
              <Image
                src="/og-image.png"
                alt="Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="md:text-lg text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">
              TUSH
              <span className="text-gradient">-CLOUDS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}

            {/* Activities Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`group relative px-5 py-2.5 text-sm lg:text-base font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 ${
                  isActivitiesActive
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-lemon"
                }`}
              >
                <span className="relative z-10">Activities</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`relative z-10 text-xs transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
                {isActivitiesActive && (
                  <div
                    className="absolute inset-0 rounded-xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
                    }}
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {activitiesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-6 py-4 transition-all duration-200 ${
                        pathname === item.href
                          ? "text-white"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      style={pathname === item.href ? {
                        background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
                      } : undefined}
                    >
                      <div className="font-semibold text-sm mb-1">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95 group"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                <FontAwesomeIcon
                  icon={theme === "dark" ? faSun : faMoon}
                  className="text-lg transition-transform duration-300 group-hover:rotate-12"
                />
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 md:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-12">
          <div className="flex-1 space-y-2">
            <ul className="space-y-3">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    mobile
                    href={link.href}
                    label={link.label}
                    isActive={pathname === link.href}
                    onClick={() => setIsMenuOpen(false)}
                  />
                </li>
              ))}

              {/* Mobile Activities */}
              <li>
                <button
                  onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
                  className={`w-full group relative flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                    isActivitiesActive
                      ? "text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  style={isActivitiesActive ? {
                    background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
                  } : undefined}
                >
                  <span className="relative z-10">Activities</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`relative z-10 text-sm transition-transform duration-300 ${
                      mobileActivitiesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileActivitiesOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    {activitiesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-6 py-3 rounded-xl transition-all duration-200 ${
                          pathname === item.href
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        style={pathname === item.href ? {
                          background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
                        } : undefined}
                      >
                        <div className="font-semibold text-sm">{item.label}</div>
                        {item.description && (
                          <div className="text-xs opacity-80 mt-1">{item.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Mobile CTA */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <p className="text-gray-600 dark:text-gray-400 px-2 text-sm font-medium">
              Ready to start your project?
            </p>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="group relative flex items-center justify-center gap-3 w-full py-4 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FACC15 0%, #14532D 100%)'
              }}
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
