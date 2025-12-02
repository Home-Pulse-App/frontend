export interface CreateUserResponse {
  success: boolean;
  message: string;
}
export interface CreateUserData {
  userName: string;
  email: string;
  password: string;
}
export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}