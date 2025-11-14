import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const Benefits = () => (
    <div id="benefits" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          Why Choose Aurea
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-melon mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Early Detection
              </h3>
              <p className="text-gray-600">
                Identify potential skin conditions early for better treatment outcomes
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-melon mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Save Time & Money
              </h3>
              <p className="text-gray-600">
                Avoid unnecessary doctor visits for minor skin concerns
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-melon mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Peace of Mind
              </h3>
              <p className="text-gray-600">
                Get instant answers about your skin concerns
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-melon mt-1 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Receive professional recommendations for next steps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default Benefits;