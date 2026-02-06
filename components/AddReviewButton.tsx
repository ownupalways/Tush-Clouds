"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "./ReviewForm";

interface AddReviewButtonProps {
	type: "testimonial" | "review";
	onSuccess?: () => void;
	buttonText?: string;
	className?: string;
}

export default function AddReviewButton({
	type,
	onSuccess,
	buttonText,
	className = "btn-primary",
}: AddReviewButtonProps) {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<button
				onClick={() => setShowForm(true)}
				className={className}>
				<FontAwesomeIcon
					icon={faPlus}
					className="text-sm"
				/>
				{buttonText ??
					(type === "testimonial"
						? "Write Your Testimonial"
						: "Add Your Review")}
			</button>

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full">
						<ReviewForm
							type={type}
							onClose={() => setShowForm(false)}
							onSuccess={() => {
								setShowForm(false);
								onSuccess?.();
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
}
