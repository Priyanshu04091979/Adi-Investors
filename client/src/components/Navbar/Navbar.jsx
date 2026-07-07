import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
import ServicesDropdown from './ServicesDropdown';
import { motion } from 'framer-motion';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  const linkRefs = useRef([]);
  const goldOrbRef = useRef(null);

  // Set ref callback helper
  const setLinkRef = (index) => (el) => {
    linkRefs.current[index] = el;
  };

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

  // Check overlap between links and the moving gold orb
  useEffect(() => {
    let animationFrameId;

    const checkOverlap = () => {
      if (!goldOrbRef.current) return;
      const orbRect = goldOrbRef.current.getBoundingClientRect();
      const orbCenter = orbRect.left + orbRect.width / 2;

      linkRefs.current.forEach((linkEl) => {
        if (!linkEl) return;
        const linkRect = linkEl.getBoundingClientRect();

        // If the moving gold orb's center matches the horizontal bounds of the link
        if (orbCenter >= linkRect.left && orbCenter <= linkRect.right) {
          linkEl.classList.add('scale-110', '-translate-y-1', 'bg-gold-400/20', 'text-gold-400', 'shadow-md');
          linkEl.classList.remove('text-white');
        } else {
          linkEl.classList.remove('scale-110', '-translate-y-1', 'bg-gold-400/20', 'text-gold-400', 'shadow-md');
          // Retain active styling if the link is active
          const isActive = linkEl.getAttribute('data-active') === 'true';
          if (!isActive) {
            linkEl.classList.add('text-white');
            linkEl.classList.remove('text-gold-400');
          } else {
            linkEl.classList.add('text-gold-400');
            linkEl.classList.remove('text-white');
          }
        }
      });

      animationFrameId = requestAnimationFrame(checkOverlap);
    };

    animationFrameId = requestAnimationFrame(checkOverlap);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  const isLinkActive = (path) => {
    if (path === ROUTES.HOME) return location.pathname === ROUTES.HOME;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (e, closeMenu = false) => {
    // Only execute on standard left-click without modifiers (allow middle/ctrl clicks for new tabs)
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      if (closeMenu) setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${isScrolled
          ? 'bg-green-950 shadow-navbar py-3 border-b border-gold-400/10'
          : 'bg-transparent py-5'
        }`}
    >
      {/* Moving Gold Coin & Trend Line Background Animation Overlay (Param Marketing Style) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <motion.div 
          className="absolute w-full h-full flex items-center"
          animate={{ x: ["-25vw", "110vw"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {/* Glowing warm gold aura */}
          <div 
            ref={goldOrbRef}
            className="absolute top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gold-400/20 blur-2xl"
            style={{ left: "0" }}
          />
          {/* Glowing Candlestick Chart SVG */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[20px] opacity-40">
            <svg width="110" height="40" viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Candlestick 1 (Green) */}
              <line x1="15" y1="5" x2="15" y2="35" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="8" y="12" width="14" height="15" fill="#22C55E" rx="1" />
              
              {/* Candlestick 2 (Red - Hollow) */}
              <line x1="40" y1="8" x2="40" y2="38" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="33" y="18" width="14" height="12" fill="none" stroke="#EF4444" strokeWidth="1.8" rx="1" />
              
              {/* Candlestick 3 (Green) */}
              <line x1="65" y1="2" x2="65" y2="32" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="58" y="6" width="14" height="18" fill="#22C55E" rx="1" />
              
              {/* Candlestick 4 (Green) */}
              <line x1="90" y1="0" x2="90" y2="25" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="83" y="2" width="14" height="15" fill="#22C55E" rx="1" />
            </svg>
          </div>
          {/* Faint rotating logo mark coin representation */}
          <motion.img 
            src="/logo_mark.png" 
            alt="rotating gold coin" 
            className="absolute top-1/2 -translate-y-1/2 h-8 w-8 object-contain opacity-25"
            style={{ left: "150px" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={ROUTES.HOME} 
            onClick={(e) => {
              if (location.pathname === ROUTES.HOME) {
                handleNavClick(e);
              }
            }}
            className="flex items-center gap-3 z-50 group outline-none"
          >
            <img 
              src="/logo_mark.png" 
              alt="Aadi Investors Logo" 
              className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-250" 
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base xl:text-lg leading-none tracking-wide group-hover:text-gold-400 transition-colors duration-250 whitespace-nowrap">
                Aadi Investors
              </span>
              <span className="text-gold-400 text-[9px] xl:text-[10px] font-bold tracking-widest leading-none mt-1.5 uppercase whitespace-nowrap">
                Invest Today, Grow Tomorrow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-8">
            <Link
              to={ROUTES.HOME}
              onClick={handleNavClick}
              ref={setLinkRef(0)}
              data-active={isLinkActive(ROUTES.HOME) ? "true" : ""}
              className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 whitespace-nowrap ${isLinkActive(ROUTES.HOME) ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
                }`}
            >
              Home
            </Link>

            <Link
              to={ROUTES.ABOUT}
              onClick={handleNavClick}
              ref={setLinkRef(1)}
              data-active={isLinkActive(ROUTES.ABOUT) ? "true" : ""}
              className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 whitespace-nowrap ${isLinkActive(ROUTES.ABOUT) ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
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
              <Link
                to={ROUTES.SERVICES}
                onClick={handleNavClick}
                ref={setLinkRef(2)}
                data-active={location.pathname.startsWith('/services') ? "true" : ""}
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 focus:outline-none cursor-pointer whitespace-nowrap ${location.pathname.startsWith('/services') ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
                  }`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-250 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>
              <ServicesDropdown
                isOpen={isServicesDropdownOpen}
                onClose={() => setIsServicesDropdownOpen(false)}
              />
            </div>

            <Link
              to={ROUTES.PRODUCTS}
              onClick={handleNavClick}
              ref={setLinkRef(3)}
              data-active={isLinkActive(ROUTES.PRODUCTS) ? "true" : ""}
              className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 whitespace-nowrap ${isLinkActive(ROUTES.PRODUCTS) ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
                }`}
            >
              Products
            </Link>

            <Link
              to={ROUTES.CALCULATORS}
              onClick={handleNavClick}
              ref={setLinkRef(4)}
              data-active={isLinkActive(ROUTES.CALCULATORS) ? "true" : ""}
              className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 whitespace-nowrap ${isLinkActive(ROUTES.CALCULATORS) ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
                }`}
            >
              Calculators
            </Link>

            <Link
              to={ROUTES.CONTACT}
              onClick={handleNavClick}
              ref={setLinkRef(5)}
              data-active={isLinkActive(ROUTES.CONTACT) ? "true" : ""}
              className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full transition-all duration-350 whitespace-nowrap ${isLinkActive(ROUTES.CONTACT) ? 'text-gold-400 bg-gold-400/10' : 'text-white hover:text-gold-400'
                }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop Right CTA Button */}
          <div className={`hidden lg:flex items-center transition-opacity duration-300 ${location.pathname === ROUTES.CONTACT ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link to={ROUTES.CONTACT} onClick={handleNavClick} className="btn-primary flex items-center gap-1.5 xl:gap-2 text-xs xl:text-sm px-3 py-2 xl:px-5 xl:py-2.5 whitespace-nowrap">
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
            onClick={(e) => handleNavClick(e, true)}
            className={`block px-4 py-3 text-lg font-medium transition-colors border-b border-green-700/30 ${location.pathname === ROUTES.HOME ? 'text-gold-400' : 'text-white'
              }`}
          >
            Home
          </Link>

          <Link
            to={ROUTES.ABOUT}
            onClick={(e) => handleNavClick(e, true)}
            className={`block px-4 py-3 text-lg font-medium transition-colors border-b border-green-700/30 ${location.pathname.startsWith(ROUTES.ABOUT) ? 'text-gold-400' : 'text-white'
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
                    onClick={(e) => handleNavClick(e, true)}
                    className="block px-4 py-3 text-gold-400 font-semibold border-b border-green-700/30"
                  >
                  All Services Overview
                </Link>
                {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={service.href}
                      onClick={(e) => handleNavClick(e, true)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to={ROUTES.PRODUCTS}
            onClick={(e) => handleNavClick(e, true)}
            className={`block px-4 py-3 text-lg font-medium transition-colors border-b border-green-700/30 ${location.pathname.startsWith(ROUTES.PRODUCTS) ? 'text-gold-400' : 'text-white'
              }`}
          >
            Products
          </Link>

          <Link
            to={ROUTES.CALCULATORS}
            onClick={(e) => handleNavClick(e, true)}
            className={`block px-4 py-3 text-lg font-medium transition-colors border-b border-green-700/30 ${location.pathname.startsWith(ROUTES.CALCULATORS) ? 'text-gold-400' : 'text-white'
              }`}
          >
            Calculators
          </Link>

          <Link
            to={ROUTES.CONTACT}
            onClick={(e) => handleNavClick(e, true)}
            className={`block px-4 py-3 text-lg font-medium transition-colors ${location.pathname.startsWith(ROUTES.CONTACT) ? 'text-gold-400' : 'text-white'
              }`}
          >
            Contact Us
          </Link>

          {location.pathname !== ROUTES.CONTACT && (
            <Link
              to={ROUTES.CONTACT}
              onClick={(e) => handleNavClick(e, true)}
              className="btn-primary w-full flex justify-center items-center gap-2 py-3"
            >
              <PhoneCall size={18} />
              <span>Get in Touch</span>
            </Link>
          )}
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
