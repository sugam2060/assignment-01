import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.enum(["user", "owner", "admin"]),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

export interface User {
  user_id: number;
  email: string;
  fullname: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  user?: User;
}
