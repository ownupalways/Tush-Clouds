"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faBars,
	faXmark,
	faSun,
	faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./ThemeProvider";

interface NavItem {
	label: string;
	href: string;
}

const navLinks: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Projects", href: "/projects" },
	{ label: "Testimonials", href: "/testimonials" },
	{ label: "Experience", href: "/experiences" },
	{ label: "Reviews", href: "/reviews" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

interface NavLinkProps {
	href: string;
	label: string;
	isActive: boolean;
	onClick?: () => void;
	mobile?: boolean;
}

function NavLink({
	href,
	label,
	isActive,
	onClick,
	mobile = false,
}: NavLinkProps) {
	if (mobile) {
		return (
			<Link
				href={href}
				onClick={onClick}
				className={`group relative flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 overflow-hidden ${isActive
					? "bg-linear-to-r from-brand-lemon to-brand-green text-white shadow-lg"
						: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
				}`}>
				<span className="relative z-10">
					{label}
				</span>
				<FontAwesomeIcon
					icon={faArrowRight}
					className={`relative z-10 text-sm transition-all duration-300 ${
						isActive
							? "translate-x-0 opacity-100"
							: "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
					}`}
				/>
				{!isActive && (
					<div className="absolute inset-0 bg-linear-to-r from-brand-lemon/10 to-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				)}
			</Link>
		);
	}

	return (
		<Link
			href={href}
			className={`group relative px-5 py-2.5 text-sm lg:text-base font-semibold transition-all duration-300 rounded-xl ${ isActive ? "text-white"
					: "text-gray-700 dark:text-gray-300 hover:text-brand-green dark:hover:text-brand-lemon"
			}`}>
			<span className="relative z-10">
				{label}
			</span>

			{/* Active state background with linear */}
			{isActive && (
				<div className="absolute inset-0 bg-linear-to-r from-brand-lemon to-brand-green rounded-xl shadow-lg shadow-brand-lemon/30 dark:shadow-brand-green/30" />
			)}

			{/* Hover effect for non-active links */}
			{!isActive && (
				<div className="absolute inset-0 bg-linear-to-r from-brand-lemon/5 to-brand-green/5 dark:from-brand-lemon/10 dark:to-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
			)}
		</Link>
	);
}

export default function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] =
		useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { theme, toggleTheme, mounted } =
		useTheme();

	useEffect(() => {
		const handleScroll = () =>
			setScrolled(window.scrollY > 20);
		window.addEventListener(
			"scroll",
			handleScroll,
		);
		return () =>
			window.removeEventListener(
				"scroll",
				handleScroll,
			);
	}, []);

	// Lock scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isMenuOpen
			? "hidden"
			: "unset";
	}, [isMenuOpen]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				scrolled || isMenuOpen
					? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-800 py-3"
					: "bg-transparent py-5"
			}`}>
			<nav className="mx-auto max-w-7xl px-6 lg:px-12">
				<div className="flex items-center justify-between">
					{/* Logo with linear */}
					<Link
						href="/"
						className="flex items-center gap-2 group">
						<div className="relative w-10 h-10 bg-linear-to-br from-brand-lemon to-brand-green rounded-xl flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-brand-lemon/30">
							G
							<div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent rounded-xl" />
						</div>
						<span className="text-xl lg:text-2xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
							TUSH
							<span className="bg-linear-to-r from-brand-lemon to-brand-green bg-clip-text text-transparent">
								-CLOUDS
							</span>
						</span>
					</Link>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-2backdrop-blur-sm p-1.5 bordershadow-sm">
						{navLinks.map((link) => (
							<NavLink
								key={link.href}
								href={link.href}
								label={link.label}
								isActive={pathname === link.href}
							/>
						))}
					</div>

					{/* Right side buttons */}
					<div className="flex items-center gap-3">
						{/* Dark Mode Toggle */}
						<button
							onClick={toggleTheme}
							className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95 group"
							aria-label="Toggle dark mode">
							{mounted ? (
								<FontAwesomeIcon
									icon={
										theme === "dark"
											? faSun
											: faMoon
									}
									className="text-lg transition-transform duration-300 group-hover:rotate-12"
								/>
							) : (
								<div className="w-5 h-5" />
							)}
						</button>

						{/* Mobile Toggle Button */}
						<button
							onClick={() =>
								setIsMenuOpen(!isMenuOpen)
							}
							className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95"
							aria-label="Toggle menu">
							<FontAwesomeIcon
								icon={
									isMenuOpen ? faXmark : faBars
								}
								className="text-xl"
							/>
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 md:hidden transition-all duration-500 ease-in-out ${
					isMenuOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}>
				<div className="flex flex-col h-full pt-24 px-6 pb-12">
					<div className="flex-1 space-y-2">
						<div className="flex items-center justify-between mb-8">
							{/* <p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
								Navigation
							</p> */}
							<div className="h-px flex-1 ml-4 bg-linear-to-r from-brand-lemon/20 to-brand-green/20" />
						</div>

						<ul className="space-y-3">
							{navLinks.map((link, i) => (
								<li
									key={link.href}
									className={`transition-all duration-500 transform ${
										isMenuOpen
											? "translate-y-0 opacity-100"
											: "translate-y-8 opacity-0"
									}`}
									style={{
										transitionDelay: `${i * 80}ms`,
									}}>
									<NavLink
										mobile
										href={link.href}
										label={link.label}
										isActive={
											pathname === link.href
										}
										onClick={() =>
											setIsMenuOpen(false)
										}
									/>
								</li>
							))}
						</ul>
					</div>

					{/* Mobile Footer CTA */}
					<div
						className={`pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4 transition-all duration-700 delay-500 ${
							isMenuOpen
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						}`}>
						<p className="text-gray-600 dark:text-gray-400 px-2 text-sm font-medium">
							Ready to start your project?
						</p>
						<Link
							href="/contact"
							onClick={() => setIsMenuOpen(false)}
							className="group relative flex items-center justify-center gap-3 w-full py-4 bg-linear-to-r from-brand-lemon to-brand-green text-white font-bold rounded-2xl shadow-xl shadow-brand-lemon/30 hover:shadow-2xl hover:shadow-brand-green/40 transition-all duration-300 overflow-hidden">
							<span className="relative z-10">
								Let&apos;s Talk
							</span>
							<FontAwesomeIcon
								icon={faArrowRight}
								className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
							/>
							<div className="absolute inset-0 bg-linear-to-r from-brand-green to-brand-lemon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
