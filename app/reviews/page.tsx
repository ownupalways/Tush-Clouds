"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  category?: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data.data || []);
      setAverageRating(data.averageRating || 0);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, filled: boolean = true) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        style={{
          color: i < rating ? (filled ? "#ffc107" : "#ddd") : "#ddd",
          marginRight: "3px",
        }}
      />
    ));
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", background: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "3rem", color: "#333", marginBottom: "10px" }}>
            Customer Reviews
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "20px" }}>
            See what our customers think about our work
          </p>
          
          {!loading && reviews.length > 0 && (
            <div
              style={{
                display: "inline-block",
                background: "#fff",
                padding: "20px 40px",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#4a90e2", marginBottom: "10px" }}>
                {averageRating}
              </div>
              <div style={{ marginBottom: "10px" }}>
                {renderStars(Math.round(averageRating))}
              </div>
              <p style={{ margin: 0, color: "#666" }}>
                Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>No reviews yet. Be the first to leave a review!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  borderLeft: "4px solid #4a90e2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "1.2rem" }}>
                      {review.name}
                    </h3>
                    <div>{renderStars(review.rating)}</div>
                  </div>
                  {review.category && (
                    <span
                      style={{
                        padding: "5px 12px",
                        background: "#e3f2fd",
                        color: "#1976d2",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {review.category}
                    </span>
                  )}
                </div>
                
                <p style={{ margin: 0, color: "#555", lineHeight: "1.8", fontSize: "1rem" }}>
                  {review.comment}
                </p>
                
                <small style={{ display: "block", marginTop: "15px", color: "#999" }}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
