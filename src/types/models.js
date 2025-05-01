// /home/ubuntu/fairfield-work-management/src/types/models.js

/**
 * Represents a Subcontractor company.
 */
export interface Subcontractor {
  id: number | string; // Unique identifier
  companyName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  serviceTypes?: string[]; // Array of services offered
  insuranceExpiry?: string; // Date string (e.g., "YYYY-MM-DD")
  complianceStatus?: "Compliant" | "Non-Compliant" | "Pending";
  rating?: number; // e.g., 1-5 stars
  notes?: string;
  // Add other relevant fields: EIN, license numbers, etc.
}

/**
 * Represents a Crew working under a Subcontractor.
 */
export interface Crew {
  id: number | string; // Unique identifier
  crewLead: string;
  members?: string[]; // Array of member names or IDs
  skills?: string[]; // Array of skills
  certifications?: string[]; // Array of certifications
  associatedSubcontractorId: number | string; // Link to Subcontractor
  notes?: string;
}

/**
 * Represents a Work Order.
 * (Expanding on the existing structure in workorders-section.jsx)
 */
export interface WorkOrder {
  id: number | string;
  title: string;
  description?: string;
  jobId?: number | string; // Link to Job
  jobName?: string; // Denormalized for display
  assignedToId?: number | string; // Link to Subcontractor or Crew ID
  assignedToName?: string; // Denormalized for display
  assignedToType?: "Subcontractor" | "Crew"; // To differentiate assignment
  status: "Pending" | "In Progress" | "Completed" | "On Hold" | "Cancelled";
  priority?: "Low" | "Medium" | "High" | "Urgent";
  location?: string; // Address or description
  coordinates?: { lat: number; lng: number }; // For mapping
  startDate?: string; // Date string
  dueDate?: string; // Date string
  completionDate?: string; // Date string
  estimatedHours?: number;
  completedHours?: number;
  progress?: number; // Percentage 0-100
  materials?: string[];
  attachments?: { name: string; url: string; version?: number; uploadedAt?: string }[]; // Link to uploaded files
  specialInstructions?: string;
  contactPerson?: string;
  contactPhone?: string;
  notes?: string;
  auditLog?: { timestamp: string; user: string; action: string; details?: string }[]; // For tracking changes
  isDeleted?: boolean; // For soft delete
}

/**
 * Represents a Job (Project).
 * (Based on fields seen in workorders-section.jsx)
 */
export interface Job {
  id: number | string;
  jobName: string;
  description?: string;
  status?: "Planning" | "Active" | "Completed" | "On Hold";
  location?: string;
  clientName?: string;
  budget?: number;
  // Add other relevant fields: start date, end date, project manager, etc.
}

/**
 * Represents an Expense.
 * (Based on expenses-section.jsx)
 */
export interface Expense {
  id: number | string;
  description: string;
  amount: number;
  date: string; // Date string
  category?: string;
  jobId?: number | string; // Link to Job
  workOrderId?: number | string; // Link to Work Order
  receiptUrl?: string; // Link to uploaded receipt
  status?: "Pending" | "Approved" | "Rejected";
  notes?: string;
}

// Add other models/types as needed (e.g., User, Role)

