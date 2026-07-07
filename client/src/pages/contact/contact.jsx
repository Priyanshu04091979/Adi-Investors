import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants/services';

// ─── PASTE YOUR APPS SCRIPT WEB APP URL HERE AFTER DEPLOYING ───────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyG_ighXr4iLAY8p6y6FyRCYSA5MjIXCMbJgUwLVS06chUSnDhJ2DCQh8ZclFS_TBD1/exec';
// ────────────────────────────────────────────────────────────────────────────

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

// ── Send Animation Overlay ────────────────────────────────────────────────────
function SendOverlay({ status }) {
  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl"
        >
          {status === 'sending' && (
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated paper-plane */}
              <div className="relative w-24 h-24">
                <motion.div
                  animate={{
                    x: [0, 60, 120],
                    y: [0, -30, -60],
                    rotate: [0, -15, -30],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center text-gold-500"
                >
                  <Icons.Send size={48} strokeWidth={1.5} />
                </motion.div>
                {/* Trail dots */}
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gold-400"
                    style={{ left: `${20 + i * 20}px`, top: `${50 + i * 10}px` }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                ))}
              </div>
              <div className="text-center">
                <p className="text-green-950 font-bold text-xl mb-1">Sending your message…</p>
                <p className="text-gray-400 text-sm">Please wait a moment</p>
              </div>
              {/* Pulsing dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-gold-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              className="flex flex-col items-center gap-5 text-center px-8"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Success checkmark circle */}
              <motion.div
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <Icons.Check size={48} className="text-green-600" strokeWidth={3} />
                </motion.div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-green-950 mb-2">Message Sent! 🎉</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Thank you! We've received your message and will get back to you within 24 hours.
                </p>
              </div>
              {/* Confetti particles */}
              <div className="relative w-full h-8 overflow-hidden">
                {['#f5c518','#22c55e','#3b82f6','#ef4444','#a855f7'].map((color, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-sm"
                    style={{ backgroundColor: color, left: `${15 + i * 18}%`, top: 0 }}
                    animate={{ y: [0, 40], rotate: [0, 360], opacity: [1, 0] }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className="flex flex-col items-center gap-5 text-center px-8"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-400"
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Icons.AlertCircle size={48} className="text-red-500" strokeWidth={1.5} />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Please try again or email us directly at<br />
                  <a href="mailto:aadiinvestors10@gmail.com" className="text-gold-600 font-semibold">aadiinvestors10@gmail.com</a>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Contact() {
  const location = useLocation();

  const emptyForm = { fullName: '', email: '', phone: '', subject: location.state?.subject || '', message: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      // Send to Google Apps Script (no-cors because Apps Script returns opaque response)
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });

      // Because mode=no-cors, we can't read the response — assume success if no throw
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData(emptyForm);
      }, 3500);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const inputClass = "w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                  <a href="tel:+919773096553" className="text-ink-muted text-sm hover:text-gold-600 transition-colors">+91 97730 96553</a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Email</h3>
                  <a href="mailto:aadiinvestors10@gmail.com" className="text-ink-muted text-sm hover:text-gold-600 transition-colors">
                    aadiinvestors10@gmail.com
                  </a>
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
          <div className="lg:w-2/3 p-8 md:p-12 bg-white relative">
            {/* Send Animation Overlay */}
            <SendOverlay status={submitStatus} />

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
                    className={inputClass}
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
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address."
                    required
                    className={inputClass}
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
                    placeholder="Enter your 10-digit phone number"
                    pattern="\d{10}"
                    title="Please enter exactly 10 digits"
                    maxLength="10"
                    required
                    className={inputClass}
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
                    className={inputClass + ' text-slate-500'}
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
                <motion.button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  whileHover={{ scale: submitStatus === 'idle' ? 1.03 : 1 }}
                  whileTap={{ scale: submitStatus === 'idle' ? 0.97 : 1 }}
                  className="btn-primary px-8 py-3.5 shadow-lg shadow-gold-400/15 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Icons.Send size={18} />
                  {submitStatus === 'sending' ? 'Sending…' : 'Send Message'}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 h-[500px] w-full overflow-hidden">
          <iframe
            title="Aadi Investments Location"
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
            answer="At Aadi Investments, our advisory pricing is structured to be completely transparent. We operate on a customized basis depending on the complexity of your financial plan, with no hidden brokerages."
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
