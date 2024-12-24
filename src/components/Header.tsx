import React from 'react';
import { Fingerprint } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">MarkAI</h1>
          </div>
          <a
            href="https://github.com/gourish-mokashi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors"
          >
            Created by Gourish Mokashi
          </a>
        </div>
      </div>
    </header>
  );
}