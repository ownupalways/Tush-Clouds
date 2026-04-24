"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMsg("");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error || "Something went wrong");

			setStatus("success");
			setForm({ name: "", email: "", message: "" });
		} catch (err: unknown) {
			setStatus("error");
			setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
		}
	};

	return (
		<main className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4">
			<div className="max-w-2xl mx-auto">

				{/* Header */}
				<div className="mb-12">
					<Link
						href="/"
						className="text-sm text-brand-green dark:text-brand-lemon font-medium hover:opacity-70 transition-opacity mb-6 inline-block"
					>
						&larr; Back to Home
					</Link>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Get in{" "}
						<span className="text-brand-green dark:text-brand-lemon">Touch</span>
					</h1>
					<p className="text-gray-600 dark:text-gray-400 text-lg">
						Interested in working together or discussing a project? Send me a message and I&apos;ll get back to you as soon as possible.
					</p>
				</div>

				{/* Success State */}
				{status === "success" ? (
					<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
						<div className="text-4xl mb-4">✅</div>
						<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-6">
							Thanks for reaching out. I&apos;ll get back to you shortly.
						</p>
						<button
							onClick={() => setStatus("idle")}
							className="text-brand-green dark:text-brand-lemon font-semibold hover:opacity-70 transition-opacity"
						>
							Send another message
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">

						{/* Name */}
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={form.name}
								onChange={handleChange}
								placeholder="Godwin Oluwadipe"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-lemon transition-all"
							/>
						</div>

						{/* Email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={form.email}
								onChange={handleChange}
								placeholder="you@example.com"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-lemon transition-all"
							/>
						</div>

						{/* Message */}
						<div>
							<label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={6}
								required
								value={form.message}
								onChange={handleChange}
								placeholder="Tell me about your project or just say hello..."
								className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-lemon transition-all resize-none"
							/>
						</div>

						{/* Error */}
						{status === "error" && (
							<p className="text-red-500 text-sm">{errorMsg}</p>
						)}

						{/* Submit */}
						<button
							type="submit"
							disabled={status === "loading"}
							className="w-full py-4 px-6 bg-brand-green dark:bg-brand-lemon text-white dark:text-brand-green font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{status === "loading" ? "Sending..." : "Send Message"}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}
