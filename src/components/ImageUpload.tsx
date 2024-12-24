import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  label: string;
}

export function ImageUpload({ onImageSelect, label }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full h-40 sm:h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors">
        <div className="flex flex-col items-center justify-center px-4 py-3 sm:py-6 text-center">
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-gray-400" />
          <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-400">
            <span className="font-semibold">{label}</span>
          </p>
          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}