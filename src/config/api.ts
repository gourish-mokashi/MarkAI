export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const API_ENDPOINTS = {
  watermark: `${API_BASE_URL}/watermark`,
  detect: `${API_BASE_URL}/detect`,
} as const;                  