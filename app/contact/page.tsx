"use client";

import React, { useRef, ChangeEvent, useState } from "react";
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

  // Add state to track form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully!",
      });
      
      // Reset form data
      setFormData({ name: "", email: "", message: "" });
      form.current.reset();
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
    <section
      id="contact"
      className="mb-5 px-5 md:px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h5 className="text-lg text-white tracking-wider mb-2">
          Get In Touch
        </h5>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-green">
          Contact Me
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Options */}
        <div className="space-y-6">
          {/* Email */}
          <article className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-3xl text-gray-700 dark:text-gray-300 mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">
              Email
            </h4>
            <h5 className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              oluwadipegodwin@gmail.com
            </h5>
            
             <a href="mailto:oluwadipegodwin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Send a Message &rarr;
            </a>
          </article>

          {/* Messenger */}
          <article className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              className="text-3xl text-gray-700 dark:text-gray-300 mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">
              Messenger
            </h4>
            <h5 className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Oluwadipe J. Godwin
            </h5>
            
              <a href="https://m.me/oluwadipe.jesuropo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Send a Message &rarr;
            </a>
          </article>

          {/* WhatsApp */}
          <article className="card text-center dark:hover:border-gray-500 hover:border-gray-300">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-3xl text-gray-700 dark:text-gray-300 mb-4"
            />
            <h4 className="text-lg font-semibold mb-2">
              WhatsApp
            </h4>
            <h5 className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              +234 706 638 2167
            </h5>
            
              <a href="https://wa.me/message/FGQFJJHGOWSQN1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Send a Message &rarr;
            </a>
          </article>
        </div>

        {/* Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-10 card px-3">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="input"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="input"
            />
          </div>

          <div>
            <textarea
              name="message"
              rows={7}
              placeholder="Your Message"
              required
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="input"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
              }`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full text-center">
            {isSubmitting
              ? "Sending..."
              : "Send Message"}
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex justify-center">
            <i>
              Be sure to get feedback soon.
              Thanks!
            </i>{" "}
            🥰
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
