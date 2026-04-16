// types/admin.ts
export type TabType = "contacts" | "testimonials" | "reviews";
export type UpdateableTab = "testimonials" | "reviews" | "contact" ;

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}
