import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
import ServicesDropdown from './ServicesDropdown';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${isScrolled
          ? 'bg-green-950 shadow-navbar py-3 border-b border-gold-400/10'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <div 
              className="h-11 w-11 bg-gold-400 flex items-center justify-center font-bold text-white text-sm shadow-md group-hover:scale-105 transition-transform duration-250"
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

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to={ROUTES.HOME}
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 ${isLinkActive(ROUTES.HOME) ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              Home
            </Link>

            <Link
              to={ROUTES.ABOUT}
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 ${isLinkActive(ROUTES.ABOUT) ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              About Us
            </Link>

            {/* Services Trigger (Hover / Click) */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors duration-250 focus:outline-none cursor-pointer ${location.pathname.startsWith('/services') ? 'text-gold-400' : 'text-white hover:text-gold-400'
                  }`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-250 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <ServicesDropdown
                isOpen={isServicesDropdownOpen}
                onClose={() => setIsServicesDropdownOpen(false)}
              />
            </div>

            <Link
              to={ROUTES.PRODUCTS}
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 ${isLinkActive(ROUTES.PRODUCTS) ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              Products
            </Link>

            <Link
              to={ROUTES.CALCULATORS}
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 ${isLinkActive(ROUTES.CALCULATORS) ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              Calculators
            </Link>

            <Link
              to={ROUTES.CONTACT}
              className={`text-sm font-semibold tracking-wide transition-colors duration-250 ${isLinkActive(ROUTES.CONTACT) ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link to={ROUTES.CONTACT} className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
              <PhoneCall size={16} />
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-400 focus:outline-none cursor-pointer p-2 rounded-md hover:bg-green-700/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-in Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-green-950 border-l border-gold-400/10 shadow-2xl p-6 z-50 transform transition-transform duration-350 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold-400/15">
          <span className="text-white font-bold tracking-wide">NAVIGATION</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-gold-400 focus:outline-none cursor-pointer p-1 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-140px)]">
          <Link
            to={ROUTES.HOME}
            className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.HOME) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white hover:text-gold-400'
              }`}
          >
            Home
          </Link>

          <Link
            to={ROUTES.ABOUT}
            className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.ABOUT) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white hover:text-gold-400'
              }`}
          >
            About Us
          </Link>

          {/* Mobile Services Accordion */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className={`flex items-center justify-between text-base font-semibold py-1.5 transition-colors duration-250 focus:outline-none cursor-pointer ${location.pathname.startsWith('/services') ? 'text-gold-400' : 'text-white hover:text-gold-400'
                }`}
            >
              <span>Services</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-250 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="pl-4 mt-2 border-l border-gold-400/20 flex flex-col gap-3">
                <Link
                  to={ROUTES.SERVICES}
                  className="text-sm text-gray-300 hover:text-gold-400 py-1 transition-colors duration-250 font-medium"
                >
                  All Services Overview
                </Link>
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    to={service.href}
                    className="text-sm text-gray-300 hover:text-gold-400 py-1 transition-colors duration-250"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to={ROUTES.PRODUCTS}
            className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.PRODUCTS) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white hover:text-gold-400'
              }`}
          >
            Products
          </Link>

          <Link
            to={ROUTES.CALCULATORS}
            className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.CALCULATORS) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white hover:text-gold-400'
              }`}
          >
            Calculators
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={`text-base font-semibold py-1.5 transition-colors duration-250 ${isLinkActive(ROUTES.CONTACT) ? 'text-gold-400 border-l-2 border-gold-400 pl-2' : 'text-white hover:text-gold-400'
              }`}
          >
            Contact Us
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className="btn-primary flex items-center justify-center gap-2 mt-4 py-3"
          >
            <PhoneCall size={18} />
            <span>Get in Touch</span>
          </Link>
        </div>
      </div>

      {/* Overlay backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </nav>
  );
}

export default Navbar;
