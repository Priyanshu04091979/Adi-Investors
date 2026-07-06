import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';
import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/netra-shah-ns1009',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: 'hover:bg-[#0077B5]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1Fn5DoTZpg/?mibextid=wwXIfr',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    color: 'hover:bg-[#1877F2]',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aadi_investors?igsh=eGMzZncxMW52eThz&utm_source=qr',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@AadiInvestors',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
    color: 'hover:bg-[#FF0000]',
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/aadiinvestors?s=11',
    icon: <span className="font-bold text-sm leading-none">𝕏</span>,
    color: 'hover:bg-black',
  },
];

function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 97730 96553');
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
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group self-start">
              <img 
                src="/logo_mark.png" 
                alt="Aadi Investors Logo" 
                className="h-14 w-14 object-contain hover:scale-105 transition-transform duration-250" 
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl leading-none tracking-wide group-hover:text-gold-400 transition-colors duration-250">
                  Aadi Investors
                </span>
                <span className="text-gold-400 text-[11px] font-bold tracking-widest leading-none mt-1.5 uppercase">
                  Invest Today, Grow Tomorrow
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Adi Investments is a premier financial advisory firm dedicated to guiding clients through wealth generation, strategic investments, and reliable insurance planning.
            </p>
            {/* Social Icons with Animations */}
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-10 w-10 rounded-full bg-green-700/20 border border-gold-400/15 flex items-center justify-center text-gold-400 hover:text-white transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
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
                <a href="https://maps.google.com/?q=3,+Aagman+apartment,+Jain+merchant+society,+Mahalaxmi+five+road,+Paldi,+Ahmedabad-380007" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-gold-400 transition-colors duration-200">
                  Adi Investments Office,<br />
                  3, Aagman apartment, Jain merchant society, <br />Mahalaxmi five road, Paldi, Ahmedabad-380007
                </a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer w-fit" onClick={handleCopyPhone}>
                {copied ? <Check size={18} className="text-green-500 shrink-0" /> : <Phone size={18} className="text-gold-400 shrink-0 group-hover:text-green-500 transition-colors duration-200" />}
                <span className={`transition-colors duration-200 ${copied ? 'text-green-500' : 'group-hover:text-white'}`}>
                  {copied ? 'Copied!' : '+91 97730 96553'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=adiinvestors10@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors duration-200">
                  adiinvestors10@gmail.com
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
            &copy; {new Date().getFullYear()} Adi Investments. All rights reserved.
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
