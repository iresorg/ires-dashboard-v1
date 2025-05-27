export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "responder";
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: "active" | "resolved" | "pending";
  severity: "low" | "medium" | "high" | "critical";
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Responder {
  id: string;
  name: string;
  status: "available" | "busy" | "offline";
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
