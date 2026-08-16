export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    categories: Category[];
  };
}