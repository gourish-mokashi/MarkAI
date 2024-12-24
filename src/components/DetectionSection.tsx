import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { ImagePreview } from './ImagePreview';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { DetectionInstructions, GeneralNotes } from './Instructions';
import { detectImage } from '../services/api';
import type { DetectionResponse } from '../types/api';

export function DetectionSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResponse | null>(null);

  const handleImageSelect = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setError(null);
    setLoading(true);

    try {
      const detectionResult = await detectImage(file);
      
      if (detectionResult.error) {
        throw new Error(detectionResult.error);
      }

      setResult(detectionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect image');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Detect AI Generation</h2>
      <DetectionInstructions />
      <ImageUpload
        onImageSelect={handleImageSelect}
        label="Click to upload an image for detection"
      />
      <ImagePreview imageUrl={selectedImage} alt="Selected image for detection" />
      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg text-sm text-red-200 border border-red-700">
          {error}
        </div>
      )}
      {loading && (
        <div className="mt-4 p-4 bg-blue-900/50 rounded-lg text-sm text-blue-200 border border-blue-700">
          Analyzing image...
        </div>
      )}
      {result && !error && (
        <div className={`mt-4 p-4 rounded-lg border ${
          result.isAIGenerated 
            ? 'bg-red-900/50 border-red-700' 
            : 'bg-green-900/50 border-green-700'
        }`}>
          <div className="flex items-center gap-2">
            {result.isAIGenerated ? (
              <>
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <span className="font-semibold text-red-200">
                  AI Generated Image Detected
                  <span className="block text-sm font-normal">
                    Confidence: {result.confidence.toFixed(1)}%
                  </span>
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <span className="font-semibold text-green-200">
                  Real Image Detected
                </span>
              </>
            )}
          </div>
        </div>
      )}
      <GeneralNotes />
    </div>
  );
}