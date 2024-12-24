import React from 'react';
import { Header } from './components/Header';
import { WatermarkSection } from './components/WatermarkSection';
import { DetectionSection } from './components/DetectionSection';

export function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="py-4 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
            Secure and detect AI-generated images with our advanced watermarking system
          </p>
          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <WatermarkSection />
            <DetectionSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;