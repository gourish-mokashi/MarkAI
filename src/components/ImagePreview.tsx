import React from 'react';

interface ImagePreviewProps {
  imageUrl: string | null;
  alt: string;
}

export function ImagePreview({ imageUrl, alt }: ImagePreviewProps) {
  if (!imageUrl) return null;

  return (
    <div className="mt-4 relative">
      <div className="aspect-video w-full flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[300px] sm:max-h-[400px] object-contain"
        />
      </div>
    </div>
  );
}