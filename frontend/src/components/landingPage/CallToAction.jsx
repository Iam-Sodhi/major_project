import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';
import GridPattern from './GridPattern';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-32">
      <div className="absolute inset-0 overflow-hidden">
        <GridPattern className="w-full h-full opacity-20" /> {/* Adds opacity to make text clearer */}
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h2 className="text-3xl font-bold text-charcoal mb-6">
          Seems too good to be true?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          The only thing left is to see it for yourself. Join the many users who trust Aurea for their skin health.
        </p>
        <button className="bg-peach text-black px-12 py-6 rounded-lg text-xl font-semibold hover:bg-opacity-90 shadow-lg" onClick={() => navigate("/predict")}>
          Get your diagnosis
        </button>
      </div>
    </div>
  );
}

export default CallToAction;
