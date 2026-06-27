import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';

// Custom SVG Social Icons (since brand icons are removed in recent Lucide versions)
function LinkedinIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 98765 43210');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-green-950 text-white border-t border-gold-400/15">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 group self-start">
              <div 
                className="h-11 w-11 bg-gold-400 flex items-center justify-center font-bold text-white text-sm shadow-md"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                SBS
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-none tracking-wide group-hover:text-gold-400 transition-colors duration-250">
                  SBS
                </span>
                <span className="text-gold-400 text-xs font-semibold tracking-widest leading-none mt-0.5">
                  INVESTMENTS
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              SBS Investments is a premier financial advisory firm dedicated to guiding clients through wealth generation, strategic investments, and reliable insurance planning.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/sbs-prospectss"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/sbs.prospects"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              {/* Custom SVG or simple Lucide standard for X/Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-green-700/20 hover:bg-gold-400 hover:text-green-950 flex items-center justify-center text-gold-400 transition-all duration-250 border border-gold-400/10 font-bold text-xs"
                aria-label="Twitter (X)"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              QUICK LINKS
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', path: ROUTES.HOME },
                { label: 'About Us', path: ROUTES.ABOUT },
                { label: 'Products', path: ROUTES.PRODUCTS },
                { label: 'Calculators', path: ROUTES.CALCULATORS },
                { label: 'Contact Us', path: ROUTES.CONTACT },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gold-400 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              OUR SERVICES
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-gold-400 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="text-gold-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="line-clamp-1">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-5">
            <h3 className="text-gold-400 font-bold text-base tracking-wider relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-400 after:mt-2">
              CONTACT INFO
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <a href="https://maps.google.com/?q=Span+Trade+Centre,+Paldi+Rd,+Near+Bony+Travels,+Pritam+Nagar,+Paldi,+Ahmedabad,+Gujarat+380006" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-gold-400 transition-colors duration-200">
                  SBS Investments Office,<br />
                  Span Trade Centre, Paldi Rd, <br />Near Bony Travels, Pritam Nagar, Paldi,<br /> Ahmedabad, Gujarat 380006
                </a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer w-fit" onClick={handleCopyPhone}>
                {copied ? <Check size={18} className="text-green-500 shrink-0" /> : <Phone size={18} className="text-gold-400 shrink-0 group-hover:text-green-500 transition-colors duration-200" />}
                <span className={`transition-colors duration-200 ${copied ? 'text-green-500' : 'group-hover:text-white'}`}>
                  {copied ? 'Copied!' : '+91 98765 43210'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=prospectssbs@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors duration-200">
                  prospectssbs@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <span>
                  Mon – Sat: 9:00 AM – 6:00 PM<br />
                  <span className="text-xs text-gray-400">(Closed on Sundays)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gold-400/10 py-6 bg-green-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} SBS Investments. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to={ROUTES.HOME} className="hover:text-gold-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to={ROUTES.HOME} className="hover:text-gold-400 transition-colors duration-200">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
