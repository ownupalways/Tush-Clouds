import { ArrowRight, Laptop, Users } from "lucide-react";


export default function Hero() {
return (
<section className="section relative overflow-hidden">
<div className="container grid lg:grid-cols-2 gap-16 items-center">
{/* Text */}
<div>
<span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-sm">
Web Developer • Tech Coach
</span>


<h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
I Build <span className="text-violet-400">Modern Websites</span>
<br /> & Train Developers
</h1>


<p className="text-lg text-[var(--muted)] max-w-xl mb-8">
I help individuals and teams learn modern web development
through hands‑on coaching — online or physical — while also
building fast, scalable production websites.
</p>


<div className="flex flex-wrap gap-4">
<a href="#contact" className="btn-primary">
Book a Session <ArrowRight size={18} />
</a>
<a href="#services" className="btn-secondary">
View Services
</a>
</div>
</div>


{/* Visual */}
<div className="relative">
<div className="card backdrop-blur-xl">
<div className="flex items-center gap-4 mb-6">
<Laptop className="text-violet-400" />
<h3 className="font-semibold">What I Do</h3>
</div>


<ul className="space-y-4 text-[var(--muted)]">
<li>⚡ Build high‑performance Next.js apps</li>
<li>🎓 One‑on‑One & Group Tech Training</li>
<li>🌍 Online & Physical Coaching</li>
<li>🚀 Career‑focused mentorship</li>
</ul>
</div>
</div>
</div>
</section>
);
}
