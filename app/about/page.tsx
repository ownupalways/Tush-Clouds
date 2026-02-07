import { Metadata } from "next";
import AboutClient from "@/components/AboutClient"; // ✅ NEW

// ✅ metadata now valid
export const metadata: Metadata = {
  title: "About | TUSH-CLOUDS",
  description:
    "Learn about Godwin and the TUSH-CLOUDS mission to deliver exceptional digital solutions.",
};

export default function AboutPage() {
  return <AboutClient />; // ✅ delegate UI to client
}
