"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  faEnvelope,
  faStar,
  faComment,
  faSignOutAlt,
  faTrash,
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
  UpdateableTab,
} from "@/types/admin";

type ApiResponse<T> = {
  data?: T[];
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("contacts");

  // ✅ Always arrays (never undefined)
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // 🔥 Centralized endpoint resolver
  const getEndpoint = (tab: TabType) => {
    switch (tab) {
      case "contacts":
        return "/api/contact";
      case "testimonials":
        return "/api/testimonials?all=true";
      case "reviews":
        return "/api/reviews?all=true";
    }
  };

  // 🔥 Safe fetch
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(getEndpoint(activeTab));
      const result: ApiResponse<Contact | Testimonial | Review> =
        await res.json();

      const safeData = result?.data ?? [];

      switch (activeTab) {
        case "contacts":
          setContacts(safeData as Contact[]);
          break;
        case "testimonials":
          setTestimonials(safeData as Testimonial[]);
          break;
        case "reviews":
          setReviews(safeData as Review[]);
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      // ✅ fallback safety
      if (activeTab === "contacts") setContacts([]);
      if (activeTab === "testimonials") setTestimonials([]);
      if (activeTab === "reviews") setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router, fetchData]);

  // 🔥 Action wrapper
  const handleAction = async (id: string, fn: () => Promise<void>) => {
    setActionId(id);
    try {
      await fn();
    } finally {
      setActionId(null);
    }
  };

  // 🔥 Update
  const updateItem = async (
    type: UpdateableTab | "contacts",
    id: string,
    updates: Partial<Contact | Testimonial | Review>
  ) => {
    try {
      const res = await fetch(
        `/api/${type === "contacts" ? "contact" : type}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updates }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      await fetchData();
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  // 🔥 Delete
  const deleteItem = async (type: TabType, id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      await fetch(
        `/api/${type === "contacts" ? "contact" : type}?id=${id}`,
        { method: "DELETE" }
      );

      await fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  // 🔥 Derived current list (cleaner rendering)
  const currentData =
    activeTab === "contacts"
      ? contacts
      : activeTab === "testimonials"
      ? testimonials
      : reviews;

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-bg-primary">
        <LoadingSpinner size="xl" />
        <p className="text-linear font-bold animate-pulse">
          Initializing Dashboard...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
		<div className="min-h-screen bg-bg-secondary p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				{/* HEADER */}
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-linear text-3xl font-bold">
						Admin Dashboard
					</h1>

					<button
						onClick={() =>
							signOut({
								callbackUrl: "/admin/login",
							})
						}
						className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white flex items-center gap-2">
						<FontAwesomeIcon
							icon={faSignOutAlt}
						/>
						Logout
					</button>
				</header>

				{/* TABS */}
				<nav className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-2xl w-fit">
					<TabButton
						active={activeTab === "contacts"}
						onClick={() =>
							setActiveTab("contacts")
						}
						icon={faEnvelope}
						label="Contacts"
						count={contacts.length}
					/>
					<TabButton
						active={activeTab === "testimonials"}
						onClick={() =>
							setActiveTab("testimonials")
						}
						icon={faComment}
						label="Testimonials"
						count={testimonials.length}
					/>
					<TabButton
						active={activeTab === "reviews"}
						onClick={() =>
							setActiveTab("reviews")
						}
						icon={faStar}
						label="Reviews"
						count={reviews.length}
					/>
				</nav>

				{/* CONTENT */}
				<div className="relative min-h-100">
					{loading && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-3xl">
							<LoadingSpinner size="lg" />
						</div>
					)}

					{/* EMPTY STATE */}
					{!loading &&
						currentData.length === 0 && (
							<div className="text-center py-20 text-gray-500">
								No {activeTab} found.
							</div>
						)}

					{/* DATA */}
					<div
						className={`grid gap-4 ${loading ? "opacity-30" : ""}`}>
						{activeTab === "contacts" &&
							contacts.map((c) => (
								<div
									key={c._id}
									className="card border-l-4 border-l-brand-green p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
									<div className="flex justify-between">
										<div>
											<h3 className="font-bold">
												{c.name}
											</h3>
											<p className="text-sm text-green-500">
												{c.email}
											</p>
										</div>

										<div className="flex gap-2">
											<button
												disabled={
													actionId === c._id
												}
												onClick={() =>
													handleAction(
														c._id,
														() =>
															updateItem(
																"contacts",
																c._id,
																{
																	status:
																		c.status ===
																		"new"
																			? "read"
																			: "new",
																},
															),
													)
												}>
												{actionId === c._id
													? "Updating..."
													: "Toggle"}
											</button>

											<button
												onClick={() =>
													deleteItem(
														"contacts",
														c._id,
													)
												}>
												<FontAwesomeIcon
													icon={faTrash}
												/>
											</button>
										</div>
									</div>

									<p className="mt-3 italic">
										&quot;{c.message}&quot;
									</p>
								</div>
							))}

						{activeTab === "testimonials" && (
							<div className="grid md:grid-cols-2 gap-4">
								{testimonials.map((item) => (
									<DashboardCard
										key={item._id}
										item={item}
										isActionLoading={
											actionId === item._id
										}
										onUpdate={(id, updates) =>
											handleAction(id, () =>
												updateItem(
													"testimonials",
													id,
													updates,
												),
											)
										}
										onDelete={(id) =>
											handleAction(id, () =>
												deleteItem(
													"testimonials",
													id,
												),
											)
										}
									/>
								))}
							</div>
						)}

						{activeTab === "reviews" && (
							<div className="grid md:grid-cols-2 gap-4">
								{reviews.map((item) => (
									<DashboardCard
										key={item._id}
										item={item}
										isActionLoading={
											actionId === item._id
										}
										onUpdate={(id, updates) =>
											handleAction(id, () =>
												updateItem(
													"reviews",
													id,
													updates,
												),
											)
										}
										onDelete={(id) =>
											handleAction(id, () =>
												deleteItem("reviews", id),
											)
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
