export type RentalRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export interface LandlordRentalRequest {
  id: string;
  note: string;
  moveInDate: string;
  message: string;
  propertyId: string;
  tenantId: string;
  status: RentalRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LandlordProperty {
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

  rentalRequest: LandlordRentalRequest[];
}

export interface LandlordPropertiesResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    properties: LandlordProperty[];
  };
}