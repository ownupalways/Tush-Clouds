"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCamera, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { openCloudinaryWidget } from "@/lib/cloudinary";

interface ReviewFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  type?: "testimonial" | "review"; // Add type option
  showImageUpload?: boolean; // Optional: control image upload visibility
  showRoleField?: boolean; // Optional: control role field visibility
}

export default function ReviewForm({ 
  onClose, 
  onSuccess,
  type = "testimonial", // Default to testimonial
  showImageUpload = true,
  showRoleField = true
}: ReviewFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    role: "",
    review: "",
    rating: 5,
    category: "", // For reviews (e.g., "Service", "Product Quality")
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    openCloudinaryWidget((url) => {
      setFormData((prev) => ({ ...prev, image: url }));
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Determine which API endpoint to use based on type
      const endpoint = type === "testimonial" ? "/api/testimonials" : "/api/reviews";
      
      // Prepare payload based on type
      const payload = type === "testimonial" 
        ? {
            name: formData.name,
            image: formData.image,
            position: formData.role,
            message: formData.review,
            rating: formData.rating,
          }
        : {
            name: formData.name,
            comment: formData.review,
            rating: formData.rating,
            category: formData.category,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic text based on type
  const title = type === "testimonial" ? "Share Your Experience" : "Leave a Review";
  const submitText = type === "testimonial" ? "Submit Testimonial" : "Submit Review";
  const placeholderText = type === "testimonial" ? "Your testimonial..." : "Your review...";

  return (
		<div className="w-full max-w-lg mx-auto">
			<h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
				{title}
			</h3>

			{success ? (
				<div className="text-center py-8">
					<div className="text-green-600 text-5xl mb-4">
						✓
					</div>
					<p className="text-gray-600 dark:text-gray-300">
						Success! Closing form...
					</p>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className="space-y-1">
					{/* Photo Upload - Only for testimonials */}
					{showImageUpload &&
						type === "testimonial" && (
							<div className="flex flex-col gap-2">
								<label className="text-sm font-medium text-left">
									Profile Photo (Optional)
								</label>
								<div className="flex items-center gap-4">
									<button
										type="button"
										onClick={handleUpload}
										className="flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded-lg text-sm font-semibold">
										<FontAwesomeIcon
											icon={faCamera}
										/>
										{formData.image
											? "Change Photo"
											: "Upload Photo"}
									</button>
									{formData.image && (
										<div className="flex items-center gap-1 text-green-600 text-xs">
											<FontAwesomeIcon
												icon={faCheckCircle}
											/>{" "}
											Uploaded!
										</div>
									)}
								</div>
							</div>
						)}

					{/* Name Input */}
					<div>
						<label className="text-sm text-left font-medium mb-2 block">
							Your Name
						</label>
						<input
							required
							className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-brand-green"
							placeholder="Your Name"
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
						/>
					</div>

					{/* Role/Position - Only for testimonials */}
					{showRoleField &&
						type === "testimonial" && (
							<div>
								<label className="text-sm text-left font-medium mb-2 block">
									Role/Position (Optional)
								</label>
								<input
									className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-brand-green"
									placeholder="e.g., CEO at Company Name"
									value={formData.role}
									onChange={(e) =>
										setFormData({
											...formData,
											role: e.target.value,
										})
									}
								/>
							</div>
						)}

					{/* Category - Only for reviews */}
					{type === "review" && (
						<div>
							<label className="text-sm text-left font-medium mb-2 block">
								Category (Optional)
							</label>
							<select
								className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-brand-green"
								value={formData.category}
								onChange={(e) =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}>
								<option value="">
									Select a category
								</option>
								<option value="service">
									Service Quality
								</option>
								<option value="communication">
									Communication
								</option>
								<option value="delivery">
									Delivery Time
								</option>
								<option value="value">
									Value for Money
								</option>
								<option value="overall">
									Overall Experience
								</option>
							</select>
						</div>
					)}

					{/* Rating Stars */}
					<div>
						<label className="text-sm text-left font-medium mb-2 block">
							Rating
						</label>
						<div className="flex gap-2">
							{[1, 2, 3, 4, 5].map((num) => (
								<button
									key={num}
									type="button"
									onClick={() =>
										setFormData({
											...formData,
											rating: num,
										})
									}
									className="text-2xl transition-transform hover:scale-110">
									<FontAwesomeIcon
										icon={faStar}
										className={
											num <= formData.rating
												? "text-brand-lemon w-2/3l"
												: "text-gray-300 w-2xs"
										}
									/>
								</button>
							))}
						</div>
					</div>

					{/* Review/Testimonial Text */}
					<div>
						<label className="text-sm text-left font-medium mb-2 block">
							{type === "testimonial"
								? "Your Testimonial"
								: "Your Review"}
						</label>
						<textarea
							required
							rows={4}
							maxLength={500}
							className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 focus:ring-2 focus:ring-brand-green resize-none"
							placeholder={placeholderText}
							value={formData.review}
							onChange={(e) =>
								setFormData({
									...formData,
									review: e.target.value,
								})
							}
						/>
						<p className="text-xs text-gray-500 mt-1">
							{formData.review.length}/500
							characters
						</p>
					</div>

					{error && (
						<div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<p className="text-red-600 dark:text-red-400 text-sm">
								{error}
							</p>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex-1 py-3 bg-brand-green text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-green/90 transition-colors">
							{isSubmitting
								? "Submitting..."
								: submitText}
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
