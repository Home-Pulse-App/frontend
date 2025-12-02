// Types & Interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
export interface PaginationParams {
  limit?: number;
  skip?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
}
export interface PaginationResponse {
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
  page: number;
  totalPages: number;
}
// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}