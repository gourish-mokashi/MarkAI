import { API_ENDPOINTS } from "../config/api";
import type { WatermarkResponse, DetectionResponse } from "../types/api";

export async function uploadImageForWatermark(
  file: File
): Promise<WatermarkResponse> {
  // Get the original file name
  const originalFileName = file.name;
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(API_ENDPOINTS.watermark, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to watermark image");
    }

    // Get the watermarked image as Blob
    const blob = await response.blob();

    // Check if the response is a valid image type
    if (!blob.type.startsWith("image/")) {
      throw new Error("Server did not return a valid image format");
    }

    // Create a temporary URL for the image and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Set the download file name: append "_MarkAI" to the original file name and set .jpg extension
    link.download = `${originalFileName
      .split(".")
      .slice(0, -1)
      .join(".")}_MarkAI.jpg`;

    document.body.appendChild(link);
    link.click();

    // Clean up after download
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Return success with the image URL (or additional metadata)
    return { success: true, imageUrl: url }; // We can return the image URL for further use
  } catch (error) {
    console.error("Error watermarking image:", error);

    // Return error response if something went wrong
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function detectImage(file: File): Promise<DetectionResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(API_ENDPOINTS.detect, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to detect image");
    }

    const result = await response.json();
    return {
      isAIGenerated: result.isAIGenerated,
      confidence: result.confidence,
    };
  } catch (error) {
    console.error("Detection error:", error);
    return {
      isAIGenerated: false,
      confidence: 0,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
