"use client";

import React, { useRef, FormEvent, useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // Send to Next.js API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      e.currentTarget.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please contact directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Us</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <FontAwesomeIcon icon={faEnvelope} className="contact__option-icon" />
            <h4>Email</h4>
            <h5>oluwadipegodwin@gmail.com</h5>
            <a href="mailto:oluwadipegodwin@gmail.com" target="_blank" rel="noopener noreferrer">
              Send a Message
            </a>
          </article>
          <article className="contact__option">
            <FontAwesomeIcon icon={faFacebookMessenger} className="contact__option-icon" />
            <h4>Messenger</h4>
            <h5>Oluwadipe J. Godwin</h5>
            <a href="https://m.me/oluwadipe.jesuropo" target="_blank" rel="noopener noreferrer">
              Send a Message
            </a>
          </article>
          <article className="contact__option">
            <FontAwesomeIcon icon={faWhatsapp} className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <h5>+2347066382167</h5>
            <a href="https://wa.me/message/FGQFJJHGOWSQN1" target="_blank" rel="noopener noreferrer">
              Send a Message
            </a>
          </article>
        </div>
        {/* END OF SOCIAL MEDIA-HANDLES */}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
            disabled={isSubmitting}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            disabled={isSubmitting}
          />
          <textarea
            name="message"
            rows={7}
            placeholder="Your Message"
            required
            disabled={isSubmitting}
          />
          
          {submitStatus.type && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
