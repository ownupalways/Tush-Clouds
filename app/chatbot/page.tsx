import Link from "next/link";

export const metadata = {
	title: "Chatbot – Coming Soon",
	description:
		"Our AI chatbot experience is launching soon.",
};

export default function ChatbotComingSoon() {
	return (
		<main className="min-h-screen flex items-center justify-center px-4">
			<div className="max-w-md text-center">
				<span className="inline-block mb-4 rounded-full bg-brand-lemon/20 px-4 py-1 text-sm font-semibold text-brand-green">
					Coming Soon
				</span>

				<h1 className="text-3xl sm:text-4xl font-bold mb-4">
					AI Chatbot
				</h1>

				<p className="text-gray-600 dark:text-gray-400 mb-6">
					We’re building something smart, fast,
					and human-friendly. This chatbot
					experience is almost ready.
				</p>

				<div className="flex justify-center gap-3">
					<Link
						href="/"
						className="rounded-lg bg-brand-green px-5 py-2 font-medium text-white hover:opacity-90 transition">
						Go Home
					</Link>

					<Link
						href="/projects"
						className="rounded-lg border px-5 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
						View Projects
					</Link>
				</div>
			</div>
		</main>
	);
}
