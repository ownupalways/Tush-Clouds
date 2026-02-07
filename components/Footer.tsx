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
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experiences" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    {
        name: "Email",
        href: "mailto:oluwadipegodwin@gmail.com",
        icon: faEnvelope,
    },
    {
        name: "Phone",
        href: "tel:+2347066382167",
        icon: faPhone,
    },
    {
        name: "Location",
        href: "#contact",
        icon: faLocationDot,
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
			<footer className="bg-brand-green dark:bg-brand-green-900 text-white py-12 md:py-16">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					{/* Logo */}
					<div className="text-center mb-8">
						<Link
							href="/"
							className="inline-block text-2xl md:text-3xl font-bold tracking-tight">
							<span className="text-white hover:text-brand-lemon transition-colors duration-300 transform hover:scale-105 inline-block">
								TUSH
								<span className="text-brand-lemon">
									-CLOUDS
								</span>
							</span>
						</Link>
						<p className="mt-3 text-sm text-white/70">
							Engineering Excellence, Exceeding
							Expectations
						</p>
					</div>

					{/* Navigation Links */}
					<nav
						className="mb-8"
						aria-label="Footer Navigation">
						<ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
							{footerLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="footer-link">
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
								target={
									social.href.startsWith("http")
										? "_blank"
										: undefined
								}
								rel={
									social.href.startsWith("http")
										? "noopener noreferrer"
										: undefined
								}
								aria-label={social.name}
								className="footer-social"
								title={social.name}>
								<FontAwesomeIcon
									icon={social.icon}
									className="text-lg md:text-xl"
								/>
							</a>
						))}
					</div>

					{/* Divider */}
					<div className="border-t border-white/20 mb-6" />

					{/* Copyright & Admin Link */}
					<div className="text-center space-y-2">
						<p className="text-xs md:text-sm text-white/70">
							&copy; {currentYear} TUSH-CLOUDS.
							All rights reserved.
						</p>
						<p className="text-xs text-white/50">
							Crafted with passion and precision
						</p>
						{/* Discrete Admin Link */}
						<div className="pt-2">
							<Link
								href="/admin/login"
								className="footer-admin-link"
								title="Admin Access">
								Admin
							</Link>
						</div>
					</div>
				</div>
			</footer>
		);
}
