export interface RentalProperty {
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
}

export interface RentalTenant {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentalRequest {
  id: string;
  note: string | null;
  moveInDate: string;
  message: string | null;
  propertyId: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  property: RentalProperty;
  tenant: RentalTenant;
}

export interface RentalResponse {
  success: boolean;
  statusCode?: number;
  message: string;

  data?: {
    result: RentalRequest[];
  };
}