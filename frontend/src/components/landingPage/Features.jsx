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

const Features = () => (
  <div id="features" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl p-16 rounded-3xl border-[3px] my-20 border-charcoal">
      <h2 className="mb-12 text-center text-4xl font-bold text-charcoal">
        Advanced Features for Accurate Diagnosis
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg bg-white p-6">
          <Camera className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            Diagnose your disease in seconds
          </h3>
          <p className="text-gray-600 text-center">
            Our state-of-the-art AI technology enables rapid analysis of skin
            images, giving you a preliminary diagnosis almost instantly. With
            advanced image processing, we deliver reliable results to help you
            make informed health decisions quickly.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white p-6">
          <Upload className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            Connect with the right specialist
          </h3>
          <p className="text-gray-600 text-center">
            Once your image is analyzed, our platform provides personalized
            recommendations for specialists based on your diagnosis. With access
            to top dermatologists and skin experts, you can confidently follow
            up on your results with professionals in the field.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white p-6 ">
          <Shield className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            Control where your data goes
          </h3>
          <p className="text-gray-600 text-center">
            Your privacy is our top priority. We ensure your personal data
            remains secure, using encryption in blockchain. You
            have complete control over whom the data is distributed to,
            giving you peace of mind.
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default Features;
