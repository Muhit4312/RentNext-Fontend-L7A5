export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export interface RentalRequest {
  id: string;
  note: string;
  moveInDate: string;
  message: string | null;

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
    img: string | null;
    address: string | null;
    city: string | null;
    rent: string;
    bedrooms: number;
    bathrooms: number;
    isAvailable: boolean;
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    category: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}