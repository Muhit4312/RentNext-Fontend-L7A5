export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminRental {
  id: string;
  note: string;
  moveInDate: string;
  message: string;
  propertyId: string;
  tenantId: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };

  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    img?: string | null;
    address?: string | null;
    city?: string | null;
    rent: string | number;
    bedrooms: number;
    bathrooms: number;
    isAvailable: boolean;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AdminRentalsMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AdminRentalsResponse {
  success: boolean;
  message: string;
  data: AdminRental[];
  meta: AdminRentalsMeta | null;
}