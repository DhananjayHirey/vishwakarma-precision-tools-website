import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-900 border-t border-neutral-800 text-neutral-400 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold text-white mb-4 block">
            &lt;VP&gt;
          </Link>
          <p className="text-sm leading-relaxed">
            Vishwakarma Precision Tools - Delivering excellence in precision engineering since 1986. Trusted by global leaders for quality and innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
             <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
             <li><Link to="/products" className="hover:text-emerald-400 transition-colors">Products</Link></li>
             <li><Link to="/why-choose-us" className="hover:text-emerald-400 transition-colors">Why Choose Us</Link></li>
             <li><Link to="/testimonials" className="hover:text-emerald-400 transition-colors">Testimonials</Link></li>
              <li><Link to="/our-customers" className="hover:text-emerald-400 transition-colors">Our Customers</Link></li>
             <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Contact Us</h4>
           <div className="space-y-3 text-sm">
             <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-emerald-500" />
                <span>Nashik, Maharashtra,<br/>India.</span>
             </div>
             <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+91 98906 93195</span>
             </div>
             <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>vishwa.precision@gmail.com</span>
             </div>
           </div>
        </div>

        {/* Socials */}
        {/* <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-4">
                <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                    <Facebook className="w-4 h-4" />
                </a>
                 <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                    <Twitter className="w-4 h-4" />
                </a>
                 <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                    <Instagram className="w-4 h-4" />
                </a>
                 <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-emerald-600 hover:text-white transition-all">
                    <Linkedin className="w-4 h-4" />
                </a>
            </div>
        </div> */}
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} Vishwakarma Precision Tools. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed & Developed with precision.</p>
      </div>
    </footer>
  );
}
