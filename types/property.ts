export interface Property {
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

  landlord: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };

  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  rentalRequest: RentalRequest[];
}

export interface RentalRequest {
  id: string;
  note: string;
  moveInDate: string;
  message: string;
  propertyId: string;
  tenantId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property[];
  meta: PropertyMeta;
}

export interface SinglePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property;
}

export interface LandlordProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  img: string | null;
  address: string | null;
  city: string | null;
  rent: string | number;
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

  rentalRequest: {
    id: string;
    note: string;
    moveInDate: string;
    message: string;
    propertyId: string;
    tenantId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
}