import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ImagePreview } from './ImagePreview';
import { WatermarkInstructions, GeneralNotes } from './Instructions';
import { uploadImageForWatermark } from '../services/api';

export function WatermarkSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // Store the original file name

  const handleImageSelect = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setFileName(file.name); // Save the original file name
    setError(null);
  };

  const handleWatermark = async () => {
    if (!selectedImage || !fileName) {
      return;
    }

    const file = await fetch(selectedImage!)
      .then(r => r.blob())
      .then(blob => new File([blob], fileName, { type: 'image/jpeg' }));

    setLoading(true);
    setError(null);

    try {
      const result = await uploadImageForWatermark(file);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to watermark image');
      }

      const link = document.createElement('a');
      link.href = result.watermarkedImageUrl!;


      link.click();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to watermark image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-white">Apply Watermark</h2>
      <WatermarkInstructions />
      <ImageUpload
        onImageSelect={handleImageSelect}
        label="Click to upload an image for watermarking"
      />
      <ImagePreview imageUrl={selectedImage} alt="Selected image for watermarking" />
      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg text-sm text-red-200 border border-red-700">
          {error}
        </div>
      )}
      {selectedImage && (
        <button
          onClick={handleWatermark}
          disabled={loading}
          className={`mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg transition-colors ${
            loading
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          <Download className="w-5 h-5" />
          {loading ? 'Processing...' : 'Apply Watermark & Download'}
        </button>
      )}
      <GeneralNotes />
    </div>
  );
}
