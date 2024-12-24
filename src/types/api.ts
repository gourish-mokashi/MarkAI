export interface WatermarkResponse {
  success?: boolean;
  watermarkedImageUrl: string;
  error?: string;
}

export interface DetectionResponse {
  isAIGenerated: boolean;
  confidence?: number;
  error?: string;
}