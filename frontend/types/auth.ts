export interface LoginCredentials {
  username_or_email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user: {
    user_id: string;
    email: string;
    role: "admin" | "teacher" | "parent" | "student";
  };
  message?: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

