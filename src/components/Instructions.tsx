import React from 'react';
import { Info } from 'lucide-react';

interface InstructionProps {
  title: string;
  steps: string[];
}

function InstructionList({ title, steps }: InstructionProps) {
  return (
    <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
      <h3 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
        <Info className="w-4 h-4 flex-shrink-0" />
        {title}
      </h3>
      <ol className="list-decimal list-inside space-y-1 ml-1">
        {steps.map((step, index) => (
          <li key={index} className="leading-relaxed">{step}</li>
        ))}
      </ol>
    </div>
  );
}

export function WatermarkInstructions() {
  const steps = [
    "Click the Upload Image button to select the image you want to watermark.",
    "Once uploaded, you'll see a preview of your image.",
    "Click the Apply Watermark button to add a secure, invisible watermark.",
    "After processing, click Download to save the watermarked image.",
  ];

  return <InstructionList title="How to Watermark" steps={steps} />;
}

export function DetectionInstructions() {
  const steps = [
    "Click the Upload Image button to select the image you want to check.",
    "The system will automatically analyze the image.",
    "Results will show either 'AI-Generated' or 'Real Image'.",
    "You can upload additional photos for detection by repeating these steps.",
  ];

  return <InstructionList title="How to Detect" steps={steps} />;
}

export function GeneralNotes() {
  return (
    <div className="mt-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg text-xs sm:text-sm text-gray-300 border border-gray-600">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Info className="w-4 h-4 flex-shrink-0" />
        Important Notes
      </h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Supported formats: JPEG, PNG, and WEBP</li>
        <li>The watermark is invisible and does not alter the image's visual quality</li>
        <li>Maximum file size: 10MB</li>
        <li>This tool enhances security and detects AI-generated content</li>
      </ul>
    </div>
  );
}