"use client";

import { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "./ReviewForm";

interface AddReviewButtonProps {
	type: "testimonial" | "review";
	onSuccess?: () => void;
	buttonText?: string;
	className?: string;
}

const AddReviewButton = forwardRef<HTMLButtonElement, AddReviewButtonProps>(
	(
		{
			type,
			onSuccess,
			buttonText,
			className = "btn-primary",
		},
		ref,
	) => {
		const [showForm, setShowForm] = useState(false);

		return (
			<>
				<button
					ref={ref}
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
	},
);

AddReviewButton.displayName = "AddReviewButton";

export default AddReviewButton;
