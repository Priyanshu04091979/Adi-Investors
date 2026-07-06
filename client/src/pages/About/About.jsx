import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
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

function About() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-sm animate-pulse">
            Trusted Investment Advisors
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            About <span className="text-gold-400 font-extrabold relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Adi Investments</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Empowering financial futures through expert investment guidance and innovative solutions
          </p>
        </motion.div>

        {/* Decorative Gold Bottom Wave Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 3. Founder Section */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Meet Our Founder</h2>
          </div>
          <div className="bg-white rounded-card border border-green-700/5 shadow-sm p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="md:w-1/3 flex flex-col items-center">
               <div className="w-48 h-48 rounded-full bg-green-50 border-4 border-gold-400/20 flex items-center justify-center mb-6 shadow-md overflow-hidden">
                  <Icons.User className="text-green-700/20 w-24 h-24" />
                  <span className="sr-only">Founder Photo Container</span>
               </div>
               <div className="flex gap-3 flex-wrap justify-center mt-2">
                 {[
                   { label: 'LinkedIn', href: 'https://www.linkedin.com/in/netra-shah-ns1009', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>, color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]' },
                   { label: 'Instagram', href: 'https://www.instagram.com/aadi_investors?igsh=eGMzZncxMW52eThz&utm_source=qr', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>, color: 'hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]' },
                   { label: 'YouTube', href: 'https://www.youtube.com/@AadiInvestors', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>, color: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]' },
                   { label: 'Twitter / X', href: 'https://x.com/aadiinvestors?s=11', icon: <span className="font-bold text-sm">𝕏</span>, color: 'hover:bg-black hover:text-white hover:border-black' },
                 ].map((s, i) => (
                   <motion.a
                     key={s.label}
                     href={s.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={s.label}
                     initial={{ opacity: 0, scale: 0.7 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1, duration: 0.4, type: 'spring' }}
                     whileHover={{ scale: 1.2, y: -3 }}
                     whileTap={{ scale: 0.9 }}
                     className={`h-10 w-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-700 transition-all duration-300 ${s.color}`}
                   >
                     {s.icon}
                   </motion.a>
                 ))}
               </div>
            </div>
                        <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-green-950 mb-2">Founder</h3>
              <p className="text-gold-600 font-semibold mb-6 uppercase tracking-wider text-sm">Founder, Adi Investments</p>
              <p className="text-ink-muted text-body-lg mb-6 leading-relaxed">
                At Adi Investments, we believe that financial security begins with trust. Every interaction, every recommendation, and every solution is guided by values that put our clients first.
              </p>
              <p className="text-ink-muted text-body-lg mb-6 leading-relaxed">
                We promise to keep things simple, honest, and transparent. Instead of overwhelming you with complex terms or one-size-fits-all solutions, we take the time to understand your needs and recommend what truly works for you.
              </p>
              <p className="text-ink-muted text-body-lg mb-6 leading-relaxed">
                From choosing the right plan to support you when it matters most, we’re committed to being a trusted partner you can rely on - today and in the years ahead.
              </p>
              <blockquote className="border-l-4 border-gold-400 pl-6 py-4 bg-green-50/50 italic text-green-950 font-medium rounded-r-lg">
                “Because your trust means more to us than any policy we sell.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>


      {/* 5. Core Values */}
      <section className="section-pad bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Transparency', desc: 'Complete transparency in all our investment strategies and fee structures.', icon: Icons.Eye },
              { title: 'Trust', desc: 'Building long-term relationships based on trust and consistent performance.', icon: Icons.ShieldCheck },
              { title: 'Excellence', desc: 'Striving for excellence in every aspect of our investment services.', icon: Icons.Star },
              { title: 'Security', desc: 'Ensuring the highest level of security for your investments and data.', icon: Icons.Lock },
            ].map((v, i) => (
              <motion.div variants={itemVariants} key={i} className="card flex flex-col items-center text-center border-t-4 border-t-transparent hover:border-t-gold-400 transition-colors duration-300 shadow-sm hover:shadow-md">
                <div className="p-4 bg-green-100 text-green-700 rounded-full mb-6">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-950 mb-3">{v.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7. Our Approach */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Our Approach</h2>
            <p className="text-ink-muted text-body-lg mt-4">Comprehensive financial solutions tailored to your needs</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-6 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-green-100 before:via-gold-400/50 before:to-green-100">
            {[
              { step: 1, title: "Understanding the client's Financial Goal", image: "/images/approach_step1.png" },
              { step: 2, title: "Developing an Investment Strategy", image: "/images/approach_step2.png" },
              { step: 3, title: "Selecting Investment", image: "/images/approach_step3.png" },
              { step: 4, title: "Monitoring and adjusting the Portfolio", image: "/images/approach_step4.png" },
              { step: 5, title: "Providing ongoing advice and support", image: "/images/approach_step5.png" },
            ].map((s, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Step Circle */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gold-400 text-white font-bold text-lg shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {s.step}
                </div>
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white rounded-card border border-green-700/10 shadow-sm hover:shadow-md hover:border-gold-400 transition-all duration-300 overflow-hidden group/card">
                  <div className="w-full aspect-video bg-green-50 flex items-center justify-center border-b border-green-700/10 relative overflow-hidden">
                     <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center bg-white relative z-10">
                    <h3 className="font-bold text-green-950 text-lg">{s.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us */}
      <section className="section-pad bg-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">Why Choose Adi Investments?</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              Choosing Adi Investments means choosing a partner committed to your financial growth and empowerment. We combine personalized strategies, transparency, and proven expertise to help clients achieve their financial goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold-400 mb-6 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold-400/20 group-hover:bg-gold-400 group-hover:text-white transition-all duration-300">
                  <Icons.Briefcase size={28} />
                </div>
                <h3 className="font-bold text-green-950 mb-3 text-lg group-hover:text-gold-400 transition-colors duration-300">Personalized Strategies</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Tailored investment plans based on your unique financial goals and risk profile.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold-400 mb-6 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold-400/20 group-hover:bg-gold-400 group-hover:text-white transition-all duration-300">
                  <Icons.Eye size={28} />
                </div>
                <h3 className="font-bold text-green-950 mb-3 text-lg group-hover:text-gold-400 transition-colors duration-300">Complete Transparency</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Clear communication and transparent processes in all our investment recommendations.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold-400 mb-6 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold-400/20 group-hover:bg-gold-400 group-hover:text-white transition-all duration-300">
                  <Icons.Award size={28} />
                </div>
                <h3 className="font-bold text-green-950 mb-3 text-lg group-hover:text-gold-400 transition-colors duration-300">Proven Expertise</h3>
                <p className="text-ink-muted text-sm leading-relaxed">15+ years of experience delivering consistent results for our valued clients.</p>
             </div>
             <div className="bg-white p-8 rounded-card border border-green-700/5 shadow-sm text-center hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group">
                <div className="text-gold-400 mb-6 bg-green-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-gold-400/20 group-hover:bg-gold-400 group-hover:text-white transition-all duration-300">
                  <Icons.Globe size={28} />
                </div>
                <h3 className="font-bold text-green-950 mb-3 text-lg group-hover:text-gold-400 transition-colors duration-300">NRI Specialization</h3>
                <p className="text-ink-muted text-sm leading-relaxed">Recognized as trusted NRI investment advisors delivering global solutions.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Mission & Vision */}
      <section className="section-pad bg-green-950 text-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-card border border-gold-400/20 hover:bg-white/10 transition-colors duration-300">
               <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center text-gold-400 mb-8 border border-gold-400/30">
                 <Icons.Rocket size={32} />
               </div>
               <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Mission</h3>
               <p className="text-gray-300 leading-relaxed text-lg">
                 To deliver personalized financial strategies that help our clients build, protect, and grow their wealth—while fostering financial literacy and long-term confidence across generations.
               </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-card border border-gold-400/20 hover:bg-white/10 transition-colors duration-300">
               <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center text-gold-400 mb-8 border border-gold-400/30">
                 <Icons.Eye size={32} />
               </div>
               <h3 className="text-3xl font-bold mb-6 tracking-tight">Our Vision</h3>
               <p className="text-gray-300 leading-relaxed text-lg">
                 To become the most trusted and client-first financial advisory firm, empowering individuals and families through transparent advice, strategic solutions, and lifelong relationships.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Contact CTA Strip */}
      <section className="bg-white py-20 px-4 md:px-8 text-center relative overflow-hidden border-t border-gold-400/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-950 tracking-tight">Connect With Us</h2>
          <p className="text-ink-muted mb-10 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Your financial future deserves expert guidance and strategic planning. Connect with Adi Investments today and take the first step toward financial empowerment, long-term growth, and wealth creation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.CONTACT} className="btn-primary w-full sm:w-auto px-8 py-4 inline-flex items-center justify-center gap-2 group shadow-lg shadow-gold-400/15 text-lg">
              <span>Get Started Today</span>
              <Icons.ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link to={ROUTES.CONTACT} className="btn-ghost-gold w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-lg">
              <span>Schedule Consultation</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
