"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCamera, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { openCloudinaryWidget } from "@/lib/cloudinary";

// 1. FIX: Define the missing interface
interface ReviewFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ReviewForm({ onClose, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    role: "",
    review: "",
    rating: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    openCloudinaryWidget((url) => {
      setFormData((prev) => ({ ...prev, image: url }));
    });
  };

  // 2. FIX: Restore the missing handleSubmit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          position: formData.role,
          message: formData.review,
          rating: formData.rating,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.(); // Now used!
        onClose();    // Now used!
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Share Your Experience
      </h3>

      {success ? (
        <div className="text-center py-8">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <p className="text-gray-600 dark:text-gray-300">Success! Closing form...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Profile Photo</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleUpload}
                className="flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-lg text-sm font-semibold"
              >
                <FontAwesomeIcon icon={faCamera} />
                {formData.image ? "Change Photo" : "Upload Photo"}
              </button>
              {formData.image && (
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <FontAwesomeIcon icon={faCheckCircle} /> Uploaded!
                </div>
              )}
            </div>
          </div>

          {/* Name Input */}
          <input
            required
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Stars - FIX: Using faStar here resolves the 'never read' error */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setFormData({ ...formData, rating: num })}
                className="text-xl"
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className={num <= formData.rating ? "text-brand-lemon" : "text-gray-300"}
                />
              </button>
            ))}
          </div>

          {/* Review Textarea */}
          <textarea
            required
              rows={3}
              maxLength={200}
            className="w-full p-3 border rounded-lg dark:bg-gray-800"
            placeholder="Your review..."
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-brand-green text-white rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
