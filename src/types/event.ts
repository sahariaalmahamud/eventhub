export interface EventItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  ticketPrice: number;
  capacity: number;
  coverImage: string;
  gallery: string[];
  createdBy: string;
  createdAt: string;
  featured?: boolean;
}

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface EventQuery {
  search?: string;
  category?: string;
  location?: string;
  sortBy?: "date" | "price";
  sortOrder?: "asc" | "desc";
  page?: number;
  perPage?: number;
}

export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  categories: string[];
  capacity: number;
  averagePrice: number;
  categoryBreakdown: Array<{ name: string; value: number }>;
}
