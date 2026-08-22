export interface AdminProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  img?: string | null;
  rent: string | number;
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;

  landlord: {
    id: string;
    name: string;
    email: string;
  };

  category: {
    id: string;
    name: string;
  };

  rentalRequest: {
    id: string;
    status: string;
  }[];
}

export interface AdminPropertiesMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}