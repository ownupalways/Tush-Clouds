"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faStar,
  faComment,
  faCheck,
  faTimes,
  faTrash,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  rating?: number;
  approved: boolean;
  createdAt: string;
}

interface Review {
  _id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  category?: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "contacts" | "testimonials" | "reviews"
  >("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!session) {
    return null;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "contacts") {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setContacts(data.data || []);
      } else if (activeTab === "testimonials") {
        const res = await fetch("/api/testimonials?all=true");
        const data = await res.json();
        setTestimonials(data.data || []);
      } else if (activeTab === "reviews") {
        const res = await fetch("/api/reviews?all=true");
        const data = await res.json();
        setReviews(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const approveTestimonial = async (id: string, approved: boolean) => {
    try {
      await fetch("/api/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      fetchData();
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const approveReview = async (id: string, approved: boolean) => {
    try {
      await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      fetchData();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteItem = async (
    type: "testimonials" | "reviews",
    id: string
  ) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f5f5" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "2rem", color: "#333", margin: 0 }}>
            Admin Dashboard
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              padding: "10px 20px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => setActiveTab("contacts")}
            style={{
              padding: "10px 20px",
              background: activeTab === "contacts" ? "#4a90e2" : "#fff",
              color: activeTab === "contacts" ? "#fff" : "#333",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} /> Contacts ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            style={{
              padding: "10px 20px",
              background: activeTab === "testimonials" ? "#4a90e2" : "#fff",
              color: activeTab === "testimonials" ? "#fff" : "#333",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faComment} /> Testimonials (
            {testimonials.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            style={{
              padding: "10px 20px",
              background: activeTab === "reviews" ? "#4a90e2" : "#fff",
              color: activeTab === "reviews" ? "#fff" : "#333",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faStar} /> Reviews ({reviews.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div>
                {contacts.length === 0 ? (
                  <p>No contacts yet.</p>
                ) : (
                  contacts.map((contact) => (
                    <div
                      key={contact._id}
                      style={{
                        background: "#fff",
                        padding: "20px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <h3 style={{ margin: "0 0 10px 0" }}>{contact.name}</h3>
                      <p style={{ color: "#666", margin: "5px 0" }}>
                        {contact.email}
                      </p>
                      <p style={{ margin: "10px 0" }}>{contact.message}</p>
                      <small style={{ color: "#999" }}>
                        {new Date(contact.createdAt).toLocaleString()}
                      </small>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "2px 8px",
                          background:
                            contact.status === "new" ? "#ffc107" : "#28a745",
                          color: "#fff",
                          borderRadius: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {contact.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === "testimonials" && (
              <div>
                {testimonials.length === 0 ? (
                  <p>No testimonials yet.</p>
                ) : (
                  testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      style={{
                        background: "#fff",
                        padding: "20px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <div>
                          <h3 style={{ margin: "0 0 5px 0" }}>
                            {testimonial.name}
                          </h3>
                          {testimonial.position && (
                            <p style={{ color: "#666", margin: "0" }}>
                              {testimonial.position}
                              {testimonial.company &&
                                ` at ${testimonial.company}`}
                            </p>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                          {!testimonial.approved && (
                            <button
                              onClick={() =>
                                approveTestimonial(testimonial._id, true)
                              }
                              style={{
                                padding: "5px 10px",
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            >
                              <FontAwesomeIcon icon={faCheck} /> Approve
                            </button>
                          )}
                          {testimonial.approved && (
                            <button
                              onClick={() =>
                                approveTestimonial(testimonial._id, false)
                              }
                              style={{
                                padding: "5px 10px",
                                background: "#ffc107",
                                color: "#fff",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} /> Unapprove
                            </button>
                          )}
                          <button
                            onClick={() =>
                              deleteItem("testimonials", testimonial._id)
                            }
                            style={{
                              padding: "5px 10px",
                              background: "#dc3545",
                              color: "#fff",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: "10px 0" }}>{testimonial.message}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <small style={{ color: "#999" }}>
                          {new Date(testimonial.createdAt).toLocaleString()}
                        </small>
                        <span
                          style={{
                            padding: "2px 8px",
                            background: testimonial.approved
                              ? "#28a745"
                              : "#ffc107",
                            color: "#fff",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        >
                          {testimonial.approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      style={{
                        background: "#fff",
                        padding: "20px",
                        marginBottom: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <div>
                          <h3 style={{ margin: "0 0 5px 0" }}>{review.name}</h3>
                          <div style={{ color: "#ffc107" }}>
                            {[...Array(review.rating)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={faStar} />
                            ))}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                          {!review.approved && (
                            <button
                              onClick={() => approveReview(review._id, true)}
                              style={{
                                padding: "5px 10px",
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            >
                              <FontAwesomeIcon icon={faCheck} /> Approve
                            </button>
                          )}
                          {review.approved && (
                            <button
                              onClick={() => approveReview(review._id, false)}
                              style={{
                                padding: "5px 10px",
                                background: "#ffc107",
                                color: "#fff",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} /> Unapprove
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem("reviews", review._id)}
                            style={{
                              padding: "5px 10px",
                              background: "#dc3545",
                              color: "#fff",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: "10px 0" }}>{review.comment}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <small style={{ color: "#999" }}>
                          {new Date(review.createdAt).toLocaleString()}
                        </small>
                        <span
                          style={{
                            padding: "2px 8px",
                            background: review.approved ? "#28a745" : "#ffc107",
                            color: "#fff",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        >
                          {review.approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
