import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "April 14, 2026";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-brand-green dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">Last Updated: {lastUpdated}</p>
        </header>

        <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">1. Information We Collect</h2>
            <p>At TUSH-CLOUD, we only collect information that is necessary to provide our services. This includes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Email Addresses:</strong> Collected when you subscribe to our newsletter via the footer form.</li>
              <li><strong>Payment Data:</strong> Processed securely via Stripe. We do not store credit card numbers on our servers.</li>
              <li><strong>Usage Data:</strong> Anonymous analytics to help us improve site performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">2. How We Use Your Data</h2>
            <p>Your data is stored securely in our <strong>MongoDB Atlas</strong> cluster and is used strictly for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sending requested technical updates and newsletters.</li>
              <li>Processing transactions for services rendered.</li>
              <li>Preventing fraudulent activity on the SydneyShopping platform.</li>
            </ul>
          </section>

          <section className="bg-brand-green/5 dark:bg-brand-lemon/5 p-6 rounded-2xl border border-brand-green/10">
            <h2 className="text-xl font-semibold text-brand-green dark:text-brand-lemon mb-2">3. Data Security</h2>
            <p className="text-sm italic">
              We treat your data like our own code: with strict version control and security. We use industry-standard 
              encryption and never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-green dark:text-brand-lemon mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. 
              If you wish to be removed from our Subscriber list, please contact us at 
              <a href="mailto:oluwadipegodwin@gmail.com" className="text-brand-green dark:text-brand-lemon font-medium ml-1 underline decoration-2 underline-offset-4">
                oluwadipegodwin@gmail.com
              </a>.
            </p>
          </section>
        </article>

        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <Link href="/" className="text-brand-green dark:text-brand-lemon font-semibold hover:opacity-70 transition-opacity">
            &larr; Back to TUSH-CLOUD
          </Link>
        </footer>
      </div>
    </main>
  );
}
