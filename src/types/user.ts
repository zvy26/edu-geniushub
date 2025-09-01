// src/types/user.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface UserProfileUpdateData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Agar kerak bo'lsa, UserFormData ni qo'shing
export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password?: string;
}