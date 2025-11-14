import {
  Menu,
  X,
  CheckCircle,
  Camera,
  Upload,
  Shield,
  Star,
  ChevronDown,
} from "lucide-react";

const HowItWorks = () => (
  <div
    id="how-it-works"
    className="bg-gray-50 px-4 py-32 pt-20 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-12 text-center text-4xl font-bold text-charcoal">
        Get your diagnosis with Zero Hassle
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Take a Photo
          </h3>
          <p className="text-gray-600">
            Pull out your phone and click a clear, high-quality picture of the
            area on your skin. A good photo improves your
            chances of getting the most accurate diagnosis.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Hand it to Dr. Derma
          </h3>
          <p className="text-gray-600">
            Dr. Derma, our in-house AI model analyses your disease and
            identifies. After the diagnosis is done, you can chat with the model
            to find the symptoms, medication and similar information
          </p>
        </div>
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Consult the right doctor for you
          </h3>
          <p className="text-gray-600">
            To gain an even deeper understanding of your disease, consult the
            doctors suited just for your needs. Get all this without the hassle
            of transits as the meeting will be online.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;
