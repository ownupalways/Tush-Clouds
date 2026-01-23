"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    {
        name: "Email",
        href: "mailto:oluwadipegodwin@gmail.com",
        icon: faEnvelope,
        hoverColor: "hover:text-red-500",
    },
    {
        name: "Phone",
        href: "tel:+2347066382167",
        icon: faPhone,
        hoverColor: "hover:text-blue-500",
    },
    {
        name: "Location",
        href: "#contact",
        icon: faLocationDot,
        hoverColor: "hover:text-green-500",
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-green text-white py-12 md:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="inline-block text-2xl md:text-3xl font-bold text-white hover:text-brand-lemon transition-colors duration-300 transform hover:scale-105"
                    >
                        Godwin
                        <span className="text-brand-lemon">.dev</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="mb-8">
                    <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm md:text-base text-white/80 hover:text-brand-lemon transition-colors duration-200 font-medium"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social Links */}
                <div className="flex justify-center items-center gap-4 md:gap-6 mb-8">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white ${social.hoverColor} rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                        >
                            <FontAwesomeIcon
                                icon={social.icon}
                                className="text-lg md:text-xl"
                            />
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 mb-6"></div>

                {/* Copyright & Admin Link */}
                <div className="text-center space-y-2">
                    <p className="text-xs md:text-sm text-white/70">
                        &copy; {currentYear} TUSH-CLOUDS. All rights reserved.
                    </p>
                    {/* Discrete Admin Link */}
                    <Link
                        href="/admin/login"
                        className="inline-block text-xs text-white/40 hover:text-brand-lemon transition-colors duration-200"
                        title="Admin Access"
                    >
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
