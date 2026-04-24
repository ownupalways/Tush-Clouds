import Link from "next/link";

export default function TermsOfService() {
  const lastUpdated = "April 14, 2026";

  return (
		<main className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4">
			<div className="max-w-3xl mx-auto">
				<header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
					<h1 className="text-4xl font-bold text-brand-green dark:text-white mb-4">
						Terms of Service
					</h1>
					<p className="text-sm text-slate-500 italic">
						Last Updated: {lastUpdated}
					</p>
				</header>

				<article className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-700 dark:text-slate-300">
					<section>
						<h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">
							1. Acceptance of Terms
						</h2>
						<p>
							By accessing{" "}
							<strong>TUSH-CLOUD</strong>  {" "}
							portfolio, you agree to be
							bound by these terms. If you do not
							agree to any part of these terms,
							you may not use our services.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">
							2. Intellectual Property
						</h2>
						<p>
							The code, design, and original
							content within TUSH-CLOUD (including
							brand assets and the
							&quot;Godwin.dev&quot; identity) are
							the exclusive property of{" "}
							<strong>Godwin Oluwadipe</strong>.
						</p>
						<ul className="list-disc pl-5 space-y-2 mt-2">
							<li>
								Users may not reproduce or &quot;clone&quot;
								the UI/UX design of our services
								without express written
								permission.
							</li>
							<li>
								Unauthorized use of our brand
								names (TUSH-CLOUD, SydneyShopping,
								Syd & Co) is strictly prohibited.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">
							3. Ecommerce & Payments
						</h2>
						<p>
							Our ecommerce operations utilize{" "}
							<strong>Stripe</strong> for secure
							payment processing.
						</p>
						<div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
							<ul className="list-disc pl-5 space-y-2 text-sm">
								<li>
									<strong>Pricing:</strong> We
									reserve the right to change
									prices for products or services
									at any time.
								</li>
								<li>
									<strong>Refunds:</strong> Refund
									policies vary by product type
									and are subject to the terms
									provided at the point of sale.
								</li>
								<li>
									<strong>Accuracy:</strong> While
									we strive for precision, we do
									not warrant that product
									descriptions or colors on the
									SydneyShopping store are 100%
									accurate due to display
									variations.
								</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">
							4. User Conduct
						</h2>
						<p>
							You agree not to engage in any of
							the following prohibited activities:
						</p>
						<ul className="list-disc pl-5 space-y-2">
							<li>
								Attempting to interfere with the
								proper working of the site or our{" "}
								<strong>MongoDB</strong> backend.
							</li>
							<li>
								Using automated systems (bots,
								crawlers) to scrape data from our
								ecommerce platform.
							</li>
							<li>
								Providing false information during
								checkout or newsletter
								subscription.
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">
							5. Limitation of Liability
						</h2>
						<p className="text-sm">
							TUSH-CLOUD and its associates shall
							not be liable for any indirect,
							incidental, or consequential damages
							resulting from your use of the site
							or any products purchased through
							the SydneyShopping store.
						</p>
					</section>
				</article>

				<footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
					<Link
						href="/"
						className="text-brand-green dark:text-brand-lemon font-semibold hover:opacity-70 transition-opacity">
						&larr; Return to TUSH-CLOUD
					</Link>
				</footer>
			</div>
		</main>
	);
}
