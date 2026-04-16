"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  faEnvelope, 
  faStar, 
  faComment, 
  faSignOutAlt,
  faTrash 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Local Imports
import LoadingSpinner from "@/components/LoadingSpinner";
import { TabButton } from "@/components/admin/TabButton";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { 
  Contact, 
  Testimonial, 
  Review, 
  TabType, 
  UpdateableTab 
} from "@/types/admin";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

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
      const result = await res.json() as { data: Contact[] | Testimonial[] | Review[] };

      if (activeTab === "contacts") setContacts(result.data as Contact[]);
      else if (activeTab === "testimonials") setTestimonials(result.data as Testimonial[]);
      else if (activeTab === "reviews") setReviews(result.data as Review[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
    if (status === "authenticated") fetchData();
  }, [status, router, fetchData]);

  const handleAction = async (id: string, fn: () => Promise<void>) => {
    setActionId(id);
    try {
      await fn();
    } finally {
      setActionId(null);
    }
  };

  const updateItem = async (type: UpdateableTab | "contacts", id: string, updates: Partial<Contact | Testimonial | Review>) => {
    try {
      const res = await fetch(`/api/${type === "contacts" ? "contact" : type}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchData();
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const deleteItem = async (type: TabType, id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    await fetch(`/api/${type === "contacts" ? "contact" : type}?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-bg-primary">
        <LoadingSpinner size="xl" />
        <p className="text-linear font-bold animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-bg-secondary p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-linear text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </header>

        <nav className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl w-fit">
          <TabButton active={activeTab === "contacts"} onClick={() => setActiveTab("contacts")} icon={faEnvelope} label="Contacts" count={contacts.length} />
          <TabButton active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} icon={faComment} label="Testimonials" count={testimonials.length} />
          <TabButton active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} icon={faStar} label="Reviews" count={reviews.length} />
        </nav>

        <div className="relative min-h-100">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-3xl">
              <LoadingSpinner size="lg" />
            </div>
          )}

          <div className={`grid gap-4 ${loading ? "opacity-30" : "opacity-100"}`}>
            {activeTab === "contacts" && contacts.map((c) => (
              <div key={c._id} className="card border-l-4 border-l-brand-green p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{c.name}</h3>
                    <p className="text-sm text-brand-green-600 dark:text-brand-green-400 font-medium">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={actionId === c._id}
                      onClick={() => handleAction(c._id, () => 
                        updateItem("contacts", c._id, { status: c.status === "new" ? "read" : "new" })
                      )}
                      className={`text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md font-bold transition-all ${
                        c.status === "new" 
                          ? "bg-brand-lemon text-brand-green-900 hover:bg-brand-lemon/80" 
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:opacity-80"
                      }`}
                    >
                      {actionId === c._id ? "Updating..." : c.status === "new" ? "Mark as Read" : "Mark as New"}
                    </button>
                    <button 
                      onClick={() => deleteItem("contacts", c._id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm italic text-text-secondary">&quot;{c.message}&quot;</p>
                </div>
                <div className="mt-3 text-[10px] text-gray-400 text-right">
                  Received: {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}

            {(activeTab === "testimonials" || activeTab === "reviews") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(activeTab === "testimonials" ? testimonials : reviews).map((item) => (
                  <DashboardCard
                    key={item._id}
                    item={item}
                    isActionLoading={actionId === item._id}
                    onUpdate={(id, updates) => 
                      handleAction(id, () => updateItem(activeTab as UpdateableTab, id, updates))
                    }
                    onDelete={(id) => 
                      handleAction(id, () => deleteItem(activeTab, id))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
