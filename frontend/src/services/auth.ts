import { api } from '../config/api';

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  googleId: string;
}

export interface AuthResponse {
  success: boolean;
  data: User;
}

export class AuthService {
  static async getProfile(): Promise<User> {
    const response = await api.get<AuthResponse>('/auth/profile');
    return response.data.data;
  }

  static async verifyToken(): Promise<User> {
    const response = await api.get<AuthResponse>('/auth/verify');
    return response.data.data;
  }

  static async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  static getGoogleAuthUrl(): string {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/auth/google`;
  }
}