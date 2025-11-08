export interface User {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "agent" | "admin";
}

export interface Agent {
  id: string;
  name: string;
  ownerUserId: string; // auth uid of agent
  phone: string;
  logoUrl: string;
  description: string;
  verified: boolean;
  rating: number; // update when reviews change
  specialties: string[];
  locations: string[];
}

export interface Package {
  id: string;
  agentId: string;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  itinerary: ItineraryDay[];
  images: string[];
  seatsAvailable: number;
  destination: string;
  travelType: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  agentId: string;
  packageId: string;
  pax: number;
  status: "inquiry" | "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  specialRequests?: string;
}

export interface Review {
  id: string;
  userId: string;
  agentId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
