import React from 'react';
import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TestimonialBanner from './TestimonialBanner';
import GridPattern from './GridPattern';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Pattern - Positioned absolutely */}
      <div className="absolute inset-0">
        <GridPattern />
      </div>
      
      {/* Content - Positioned relatively to appear above background */}
      <div className="relative  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 w-3/4">
              Detect Skin Conditions with AI Precision and consult the top dermatologists
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 block w-3/5">
              Upload a photo and get instant, accurate skin condition analysis powered by our in-house AI doctor Dr. Derma
            </p>
            
            {/* Uncomment if you want to show the checkmarks
            <div className="flex justify-center space-x-4 mb-12">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-melon mr-2" />
                <span className="text-gray-700">98% Accuracy</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-melon mr-2" />
                <span className="text-gray-700">Instant Results</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-melon mr-2" />
                <span className="text-gray-700">Best doctors</span>
              </div>
            </div>
            */}

            <div className="mb-4">
              <TestimonialBanner />
            </div>

            <button 
              className="text-black bg-peach px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 shadow-lg"
              onClick={() => navigate("/predict")}
            >
              Diagnose your issue with Dr. Derma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;