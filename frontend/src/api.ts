import type { LoginFormData, SignupFormData, AuthResponse, MeResponse } from "./types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    return { success: false, message: result.message || result.detail || "Login failed" };
  }
  return result;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    return { success: false, message: result.message || result.detail || "Logout failed" };
  }
  return result;
};

export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    return { success: false, message: result.message || result.detail || "Registration failed" };
  }
  return result;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  return response.json();
};

export const getProperties = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/api/properties`, {
    credentials: "include",
  });
  return response.json();
};

export const getFavourites = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/api/favourites`, {
    credentials: "include",
  });
  return response.json();
};

export const addFavourite = async (propertyId: number): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ property_id: propertyId }),
    credentials: "include",
  });
  return response.json();
};

export const removeFavourite = async (propertyId: number): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/api/favourites/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return response.json();
};
