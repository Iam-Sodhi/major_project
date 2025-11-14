import { Menu, X, CheckCircle, Camera, Upload, Shield, Star, ChevronDown } from 'lucide-react';

const Footer = () => (
    <footer className="bg-charcoal text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Aurea</h3>
            <p className="text-gray-300">
              AI-powered skin condition detection for everyone
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-melon">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-melon">How It Works</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-melon">Benefits</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-melon">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-melon">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-melon">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-melon">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">support@aurea.com</li>
              <li className="text-gray-300">1-800-AUREA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} Aurea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  export default Footer;