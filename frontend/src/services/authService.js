import { apiService } from "./api";
import {
  API_ENDPOINTS,
  STORAGE_KEYS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "../constants";
import { setLocalStorage, removeLocalStorage, getLocalStorage } from "../utils";

class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.token) {
        setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.token);
        setLocalStorage(STORAGE_KEYS.USER_DATA, response.user);
      }

      return {
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.UNAUTHORIZED,
      };
    }
  }

  async signup(userData) {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.AUTH.SIGNUP,
        userData
      );

      if (response.token) {
        setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.token);
        setLocalStorage(STORAGE_KEYS.USER_DATA, response.user);
      }

      return {
        success: true,
        message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }
  }

  async logout() {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.clearAuthData();
    }
  }

  clearAuthData() {
    removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeLocalStorage(STORAGE_KEYS.USER_DATA);
  }

  isAuthenticated() {
    const token = getLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  }

  getCurrentUser() {
    return getLocalStorage(STORAGE_KEYS.USER_DATA);
  }

  getToken() {
    return getLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
  }

  async refreshToken() {
    try {
      const response = await apiService.post("/api/auth/refresh");

      if (response.token) {
        setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }

      return response;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  async updateProfile(userData) {
    try {
      const response = await apiService.put("/api/auth/profile", userData);

      setLocalStorage(STORAGE_KEYS.USER_DATA, response.user);

      return {
        success: true,
        message: SUCCESS_MESSAGES.PROFILE_UPDATED,
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }
  }

  async changePassword(passwordData) {
    try {
      await apiService.post("/api/auth/change-password", passwordData);

      return {
        success: true,
        message: SUCCESS_MESSAGES.PASSWORD_CHANGED,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }
  }

  async forgotPassword(email) {
    try {
      await apiService.post("/api/auth/forgot-password", { email });

      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }
  }

  async resetPassword(token, password) {
    try {
      await apiService.post("/api/auth/reset-password", { token, password });

      return {
        success: true,
        message: "Password reset successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }
  }
}

export const authService = new AuthService();
