import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants/services';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-350">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-green-950 text-base md:text-lg">{question}</span>
        <Icons.ChevronDown className={`text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 text-ink-muted text-sm md:text-base leading-relaxed border-t border-slate-50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Contact() {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: location.state?.subject || '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message. We have received it and will get back to you soon!');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert('There was an issue sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please ensure the server is running.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Get In Touch</h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Ready to start your investment journey? We're here to help you achieve your financial goals.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

          {/* Left Column: Contact Information */}
          <div className="lg:w-1/3 bg-white p-8 md:p-12 border-r border-gray-100">
            <h2 className="text-3xl font-bold text-green-950 mb-8">Contact Information</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {/* Address */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Address</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    3, Aagman apartment, Jain merchant society, Mahalaxmi five road, Paldi, Ahmedabad-380007
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Phone</h3>
                  <p className="text-ink-muted text-sm mb-1">+91 97730 96553</p>
                  <p className="text-ink-muted text-sm">+91 97730 96553</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Email</h3>
                  <p className="text-ink-muted text-sm">aadiinvestors10@gmail.com</p>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Business Hours</h3>
                  <p className="text-ink-muted text-sm mb-1">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-ink-muted text-sm">Sun: On Advance Appointment Basis</p>
                </div>
              </motion.div>


              {/* Social Media */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-green-950 mb-4">Follow Us</h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/netra-shah-ns1009', color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                    { label: 'Facebook', href: 'https://www.facebook.com/share/1Fn5DoTZpg/?mibextid=wwXIfr', color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                    { label: 'Instagram', href: 'https://www.instagram.com/aadi_investors?igsh=eGMzZncxMW52eThz&utm_source=qr', color: 'hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                    { label: 'YouTube', href: 'https://www.youtube.com/@AadiInvestors', color: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg> },
                    { label: 'Twitter / X', href: 'https://x.com/aadiinvestors?s=11', color: 'hover:bg-black hover:text-white hover:border-black', icon: <span className="font-bold text-sm">𝕏</span> },
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
                      transition={{ delay: i * 0.08, duration: 0.35, type: 'spring' }}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`h-10 w-10 rounded-full bg-white border border-green-200 flex items-center justify-center text-gold-600 transition-all duration-300 shadow-sm ${s.color}`}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-2/3 p-8 md:p-12 bg-white">
            <h2 className="text-3xl font-bold text-green-950 mb-8">Send Us a Message</h2>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="fullName" className="text-green-950 font-semibold md:w-1/3">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="email" className="text-green-950 font-semibold md:w-1/3">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="phone" className="text-green-950 font-semibold md:w-1/3">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="subject" className="text-green-950 font-semibold md:w-1/3">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-slate-500"
                  >
                    <option value="" disabled>Select a subject</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 pt-4">
                <label htmlFor="message" className="text-green-950 font-semibold md:w-1/6">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="6"
                  className="w-full md:w-5/6 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-6 md:pl-[16.666667%]">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3.5 shadow-lg shadow-gold-400/15"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 h-[500px] w-full overflow-hidden">
          <iframe
            title="Adi Investments Location"
            src="https://maps.google.com/maps?q=3,%20Aagman%20apartment,%20Jain%20merchant%20society,%20Mahalaxmi%20five%20road,%20Paldi,%20Ahmedabad-380007&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '0.75rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-green-950 mb-4">Frequently Asked Questions</h2>
          <p className="text-ink-muted">Quick answers to common questions about starting your investment journey with us.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem 
            question="What documents do I need to start investing?" 
            answer="To start investing in mutual funds or SIPs, you will need a PAN card, an Aadhaar card (for KYC verification), a cancelled cheque or bank statement, and a passport-size photograph."
          />
          <FAQItem 
            question="How is the advisory fee calculated?" 
            answer="At Adi Investments, our advisory pricing is structured to be completely transparent. We operate on a customized basis depending on the complexity of your financial plan, with no hidden brokerages."
          />
          <FAQItem 
            question="Can NRIs invest in Mutual Funds through you?" 
            answer="Yes, Non-Resident Indians (NRIs) can easily invest in Indian mutual funds on a fully repatriable or non-repatriable basis using NRE or NRO bank accounts."
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
