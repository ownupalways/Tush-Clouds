"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCopy,
	faCheck,
	faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

const links = [
	{
		label: "Request a Testimonial",
		description:
			"Send to clients to collect testimonials",
		path: "/testimonials?action=add",
		color:
			"border-brand-green text-brand-green dark:text-brand-lemon",
	},
	{
		label: "Request a Review",
		description:
			"Send to customers to collect reviews",
		path: "/reviews?action=add",
		color: "border-brand-lemon text-brand-lemon",
	},
];

export function ShareLinks() {
	const [copiedIndex, setCopiedIndex] = useState<
		number | null
	>(null);
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: "";

	const handleCopy = (
		path: string,
		index: number,
	) => {
		navigator.clipboard.writeText(
			`${baseUrl}${path}`,
		);
		setCopiedIndex(index);
		setTimeout(() => setCopiedIndex(null), 2000);
	};

	return (
		<div className="mb-8 p-4 sm:p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
			{/* Header */}
			<div className="flex items-center gap-2 mb-4">
				<FontAwesomeIcon
					icon={faShareNodes}
					className="text-brand-green dark:text-brand-lemon"
				/>
				<h2 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
					Shareable Request Links
				</h2>
			</div>

			{/* Links */}
			<div className="flex flex-col gap-3">
				{links.map((link, index) => (
					<div
						key={index}
						className={`flex flex-col gap-3 p-4 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-800 ${link.color}`}>
						{/* Label & Description */}
						<div>
							<p
								className={`font-semibold text-sm ${link.color}`}>
								{link.label}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
								{link.description}
							</p>
						</div>

						{/* URL + Copy Button */}
						<div className="flex flex-col sm:flex-row gap-2">
							<code className="flex-1 min-w-0 text-xs bg-white dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 break-all leading-relaxed">
								{baseUrl}
								{link.path}
							</code>
							<button
								onClick={() =>
									handleCopy(link.path, index)
								}
								className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-lg bg-brand-green dark:bg-brand-lemon text-white dark:text-brand-green text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5">
								<FontAwesomeIcon
									icon={
										copiedIndex === index
											? faCheck
											: faCopy
									}
									className="text-xs"
								/>
								{copiedIndex === index
									? "Copied!"
									: "Copy"}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
