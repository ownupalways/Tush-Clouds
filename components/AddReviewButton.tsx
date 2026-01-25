"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "./ReviewForm";

interface AddReviewButtonProps {
  onSuccess?: () => void;
  buttonText?: string;
  className?: string;
}

export default function AddReviewButton({ 
  onSuccess, 
  buttonText = "Add Your Review",
  className = "btn-primary"
}: AddReviewButtonProps) {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
    onSuccess?.();
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setShowForm(true)}
        className={className}
      >
        <FontAwesomeIcon icon={faPlus} className="text-sm" />
        {buttonText}
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <ReviewForm 
              onClose={() => setShowForm(false)} 
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}
