"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import LoadingSpinner from "@/components/LoadingSpinner";

// --- Type Definitions ---
interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
}

interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

type TabType = "contacts" | "testimonials" | "reviews";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  count: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // FIXED: Wrapped in useCallback to prevent infinite re-renders
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "contacts"
          ? "/api/contact"
          : activeTab === "testimonials"
          ? "/api/testimonials?all=true"
          : "/api/reviews?all=true";
      
      const res = await fetch(endpoint);
      const data = await res.json();

      if (activeTab === "contacts") setContacts(data.data || []);
      else if (activeTab === "testimonials") setTestimonials(data.data || []);
      else if (activeTab === "reviews") setReviews(data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, fetchData]);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-bg-primary">
        <LoadingSpinner size="xl" />
        <p className="text-linear font-bold animate-pulse">Initializing...</p>
      </div>
    );
  }

  if (!session) return null;

  const handleAction = async (id: string, fn: () => Promise<void>) => {
    setActionId(id);
    try {
      await fn();
    } finally {
      setActionId(null);
    }
  };

  const toggleApproval = async (type: "testimonials" | "reviews", id: string, currentStatus: boolean) => {
    await fetch(`/api/${type}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: !currentStatus }),
    });
    fetchData();
  };

  const deleteItem = async (type: TabType, id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-linear">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="group btn-primary bg-red-600 border-red-700 hover:from-red-600 hover:to-red-500"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </header>

        <nav className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl w-fit">
          <TabButton
            active={activeTab === "contacts"}
            onClick={() => setActiveTab("contacts")}
            icon={faEnvelope}
            label="Contacts"
            count={contacts.length}
          />
          <TabButton
            active={activeTab === "testimonials"}
            onClick={() => setActiveTab("testimonials")}
            icon={faComment}
            label="Testimonials"
            count={testimonials.length}
          />
          <TabButton
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
            icon={faStar}
            label="Reviews"
            count={reviews.length}
          />
        </nav>

        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center glass rounded-3xl">
              <LoadingSpinner size="lg" />
            </div>
          )}

          <div className={`grid gap-4 transition-opacity duration-300 ${loading ? "opacity-30" : "opacity-100"}`}>
            {activeTab === "contacts" &&
              contacts.map((c) => (
                <div key={c._id} className="card border-l-4 border-l-brand-green">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-brand-green-800 dark:text-brand-green-300">{c.name}</h3>
                      <p className="text-sm font-mono text-brand-lemon-700 dark:text-brand-lemon-400">{c.email}</p>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold ${
                        c.status === "new" ? "bg-brand-lemon text-brand-green-900" : "bg-brand-green text-white"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-4 text-text-primary italic">&#34;{c.message}&#34;</p>
                  <div className="mt-4 pt-4 border-t border-border-color text-[10px] text-text-tertiary">
                    Received: {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}

            {(activeTab === "testimonials" || activeTab === "reviews") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(activeTab === "testimonials" ? testimonials : reviews).map((item) => (
                  <div key={item._id} className="card flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h3 className="text-lg truncate">{item.name}</h3>
                        <div className="flex gap-2 shrink-0">
                          <button
                            disabled={actionId === item._id}
                            onClick={() =>
                              handleAction(item._id, () =>
                                toggleApproval(activeTab as "testimonials" | "reviews", item._id, item.approved)
                              )
                            }
                            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                              item.approved ? "bg-brand-lemon/20 text-brand-lemon-700" : "bg-brand-green/10 text-brand-green"
                            }`}
                          >
                            {actionId === item._id ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <FontAwesomeIcon icon={item.approved ? faTimes : faCheck} />
                            )}
                          </button>
                          <button
                            onClick={() => handleAction(item._id, () => deleteItem(activeTab, item._id))}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>

                      {"rating" in item && (
                        <div className="flex text-brand-lemon mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className={i < item.rating ? "opacity-100" : "opacity-20"}
                            />
                          ))}
                        </div>
                      )}

                      <p className="mt-3 text-text-secondary text-sm line-clamp-3 italic">
                        &#34;{"message" in item ? item.message : item.comment}&#34;
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border-color pt-3">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.approved ? "Visible" : "Pending"}
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// FIXED: Defined TabButtonProps interface and used it to remove 'any'
const TabButton = ({ active, onClick, icon, label, count }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`w-full md:w-auto flex items-center justify-center cursor-pointer gap-2 px-6 py-2.5 rounded-xl font-medium transition-all hover:bg-gray-800 ${
      active
        ? "bg-white dark:bg-gray-700 text-brand-green-200 shadow-sm ring-1 ring-black/5"
        : "text-text-secondary hover:text-text-primary"
    }`}
  >
    <FontAwesomeIcon icon={icon} className={active ? "text-brand-lemon" : ""} />
    {label} <span className="text-xs opacity-60">({count})</span>
  </button>
);
