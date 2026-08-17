export interface PaymentProperty {
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

  property: PaymentProperty;
}

export interface Payment {
  id: string;
  rentalRequestId: string;
  tenantId: string;
  transactionId: string;
  amount: string;
  provider: string;
  status: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;

  rentalRequest: RentalRequest;
}

export interface PaymentResponse {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: Payment[];
}