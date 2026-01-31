import Testimonial from "@/components/Testimonial";
import FeaturedProjects from "@/components/FeaturedProjects";


export default function HomePage() {
    return (
        <>
            {/* Hero */}
            <section className="mb-28 text-center">
                <h1>Hi, I&apos;m Godwin</h1>
                <p className="mx-auto mt-6 max-w-2xl">
                    I design and build clean, professional
                    web experiences using Next.js and
                    TypeScript — focused on clarity,
                    performance, and long-term
                    maintainability.
                </p>
            </section>

            {/* Featured Projects */}
           <FeaturedProjects />

            {/* Testimonials Section */}
            <Testimonial />

            {/* About Preview */}
            <section className="mb-28 max-w-3xl mx-auto">
                <h2 className="mb-6">About Me</h2>
                <p>
                    I am a web developer with a strong focus
                    on structure, readability, and
                    thoughtful UI decisions. My work
                    prioritizes clean code, scalable
                    layouts, and user-centered design over
                    unnecessary effects.
                </p>
            </section>

            {/* Contact CTA */}
            <section className="text-center mb-28">
                <h2 className="mb-4">Get in Touch</h2>
                <p className="mb-6">
                    Interested in working together or
                    discussing a project?
                </p>
                <a href="/contact" className="btn-primary">
                    Contact Me
                </a>
            </section>
        </>
    );
}
