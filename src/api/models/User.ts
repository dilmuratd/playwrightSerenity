export interface User {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  name?: string;
  job?: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export interface SingleUserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse extends CreateUserRequest {
  id: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  name: string;
  job: string;
}

export interface UpdateUserResponse extends UpdateUserRequest {
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  token: string;
}

export interface ErrorResponse {
  error: string;
}