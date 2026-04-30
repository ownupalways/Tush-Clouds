"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowRight,
  faLock, // For admin icon
} from "@fortawesome/free-solid-svg-icons";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experiences" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Email", href: "mailto:oluwadipegodwin@gmail.com", icon: faEnvelope },
  { name: "Phone", href: "tel:+2347066382167", icon: faPhone },
  { name: "Location", href: "#contact", icon: faLocationDot },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  return (
		<footer className="bg-brand-green dark:bg-brand-green-900 text-white pt-16 pb-8 border-t border-white/5">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
					{/* COLUMN 1: BRAND IDENTITY */}
					<div className="space-y-4">
						<Link
							href="/"
							className="inline-block group">
							<span className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block">
								TUSH
								<span className="text-brand-lemon">
									-CLOUDS
								</span>
							</span>
						</Link>
						<p className="text-sm text-white/70 leading-relaxed max-w-xs">
							Tech Engineering Excellence, Exceeding Expectations. 
						</p>
					</div>

					{/* COLUMN 2: NAVIGATION */}
					<div>
						<h4 className="text-brand-lemon font-semibold uppercase tracking-wider text-xs mb-6">
							Explore
						</h4>
						<ul className="grid grid-cols-2 gap-y-3">
							{footerLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-white/80 hover:text-brand-lemon transition-all duration-200">
										{link.label}
									</Link>
								</li>
							))}
							{/*Admin Link */}
							<li>
								<Link
									href="/admin"
									className="text-sm text-brand-lemon font-bold hover:brightness-110 transition-all duration-200 flex items-center gap-2">
									<FontAwesomeIcon
										icon={faLock}
										className="text-[10px]"
									/>
									Admin
								</Link>
							</li>
						</ul>
					</div>

					{/* COLUMN 3: NEWSLETTER & SOCIAL */}
					<div className="space-y-6">
						<h4 className="text-brand-lemon font-semibold uppercase tracking-wider text-xs">
							Stay Connected
						</h4>

						<form
							action={formAction}
							className="relative flex items-center group">
							<input
								name="email"
								type="email"
								required
								disabled={isPending}
								placeholder={
									state?.success
										? "Check your inbox!"
										: "Join the newsletter"
								}
								className={`w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 transition-all 
                  ${state?.success ? "border-brand-lemon ring-brand-lemon/30" : "focus:ring-brand-lemon/50 focus:border-brand-lemon"}`}
							/>
							<button
								type="submit"
								disabled={isPending}
								className="absolute right-1.5 p-2 rounded-lg bg-linear-to-br from-brand-lemon to-brand-green-400 text-brand-green hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50">
								{isPending ? (
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
								) : (
									<FontAwesomeIcon
										icon={faArrowRight}
										className="text-sm"
									/>
								)}
							</button>
						</form>

						{state?.error && (
							<p className="text-[10px] text-red-300 bg-red-900/20 py-1 px-3 rounded border border-red-900/40 animate-pulse">
								{state.error}
							</p>
						)}

						<div className="flex items-center gap-6 pt-4 border-t border-white/10">
							{socialLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									aria-label={link.name}
									className="text-white/60 hover:text-brand-lemon transition-colors duration-200 hover:scale-110">
									<FontAwesomeIcon
										icon={link.icon}
										className="text-lg"
									/>
								</a>
							))}
						</div>
					</div>
				</div>

				{/* BOTTOM BAR */}
				<div className="border-t border-white/10 pt-8 text-center">
					<p className="text-xs text-white/40 tracking-widest uppercase">
						&copy; {currentYear} TUSH-CLOUDS.
						Managed by Oluwadipe Godwin. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
