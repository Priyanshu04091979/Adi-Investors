import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICES } from '../../constants/services';
import { ROUTES } from '../../constants/routes';
import { motion } from 'framer-motion';

// Stat counter sub-component for premium scroll feel
function StatItem({ value, label, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = parseFloat(value.replace(/,/g, ''));
    if (isNaN(end)) {
      setDisplayValue(value);
      return;
    }
    const duration = 1200;
    const increment = end / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  const formattedDisplay = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-IN')
    : displayValue;

  return (
    <div ref={itemRef} className="flex flex-col items-center justify-center p-4 text-center px-4">
      <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2 font-sans tracking-tight">
        {formattedDisplay}{suffix}
      </div>
      <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">
        {label}
      </div>
    </div>
  );
}

const illustrations = [
  '/images/illustrations/finance_growth.png',
  '/images/illustrations/retirement_planning.png',
  '/images/illustrations/tax_insurance.png'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="bg-slate-50 pb-24">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-10 shadow-sm animate-pulse">
            Premium Financial Services
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Elevate Your <span className="text-gold-400 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Financial Journey</span>
          </h1>

          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-16">
            Experience sophisticated financial advisory services crafted for discerning clients. Our comprehensive suite of solutions combines time-tested strategies with innovative approaches to deliver exceptional results.
          </p>

        </motion.div>

        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Services Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-950 mb-6 relative inline-block">
            Our Signature Services
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-1 bg-green-600 rounded"></div>
          </h2>
          <p className="text-ink-muted text-lg mt-10 leading-relaxed">
            Discover our comprehensive range of financial services, each designed to address specific aspects of your financial journey with precision and expertise.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-16">
          {SERVICES.map((service, idx) => {
            // Alternate layout: Image left vs Image right
            const isEven = idx % 2 === 0;
            // Cycle through generated illustrations
            const imgSource = illustrations[idx % illustrations.length];

            return (
              <motion.div 
                key={service.id} 
                id={service.id} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={containerVariants}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16 scroll-mt-24 bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-green-900/5 hover:border-gold-400/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 group`}
              >

                {/* Image Side */}
                <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-lg md:max-w-xl">
                    <img src={imgSource} alt={service.title} className="w-full h-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-500" />
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-green-950 mb-6">{service.title}</h3>
                  <p className="text-ink-muted text-lg leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>

                  {/* Focus points mimicking the dot list in reference images */}
                  <ul className="mb-10 space-y-4">
                    {service.focusPoints.map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-green-700/80">
                        <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></div>
                        <span className="font-medium text-base text-ink-dark">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* I'm Interested Button (White BG, colored border & text) */}
                  <Link to={ROUTES.CONTACT} state={{ subject: service.title }} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-green-700 border border-green-600/50 shadow-sm rounded hover:bg-green-50 font-bold transition-all duration-250">
                    <span>I'm Interested</span>
                    <span className="ml-1 opacity-70">→</span>
                  </Link>
                </motion.div>

              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Services;
