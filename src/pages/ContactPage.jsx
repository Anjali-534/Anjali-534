import { useState } from 'react';
import {
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiSend, FiCheckCircle, FiAlertCircle, FiLoader
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import { SectionHeader, GlassCard, RevealOnScroll } from '../components/UI';
import emailjs from '@emailjs/browser';

const initialForm = { name: '', email: '', subject: '', message: '' };

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  else if (data.message.length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

export default function ContactPage() {
  const { isDark } = useTheme();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate(form);
  if (Object.keys(errs).length > 0) { setErrors(errs); return; }

  setStatus('loading');
  try {
    await emailjs.send(
      'service_0ln6293',    // replace this
      'template_kjmhpya',   // replace this
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      "TCiOCZ3MiOFKZKD3o"    // replace this
    );
    setStatus('success');
    setForm(initialForm);
  } catch (err) {
    console.error(err);
    setStatus('error');
  }
};
  const inputBase = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 ${
    isDark
      ? 'bg-white/5 text-white placeholder-gray-500 border border-white/8'
      : 'bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200'
  }`;
  const inputFocus = 'focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15';

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// contact.send()"
            title="Let's Build Together"
            subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
          />
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <RevealOnScroll className="lg:col-span-2">
            <div className="space-y-4 mb-8">
              {[
                { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <GlassCard key={label} className="!p-5">
                  <a href={href} className="flex items-center gap-4 group">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,212,255,0.15))' }}
                    >
                      <Icon size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <p className={`text-xs mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
                      <p className={`text-sm font-medium group-hover:text-violet-400 transition-colors ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {value}
                      </p>
                    </div>
                  </a>
                </GlassCard>
              ))}
            </div>

            {/* Social */}
            <GlassCard>
              <h4 className={`font-semibold text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Find me on</h4>
              <div className="flex gap-3">
                {[
                  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
                  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group ${
                      isDark
                        ? 'border-white/8 text-gray-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10'
                        : 'border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50'
                    }`}
                  >
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </GlassCard>

            {/* Map embed */}
           
          </RevealOnScroll>

          {/* Contact form */}
          <RevealOnScroll delay={150} className="lg:col-span-3">
            <GlassCard className="!p-8">
              <h3 className={`font-display font-bold text-xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send a Message 💬
              </h3>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <FiCheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                  <h4 className={`font-display font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Message Sent! 🎉
                  </h4>
                  <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className={`${inputBase} ${inputFocus} ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <FiAlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className={`${inputBase} ${inputFocus} ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <FiAlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputBase} ${inputFocus} ${errors.subject ? 'border-red-500/50' : ''}`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <FiAlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <textarea
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputBase} ${inputFocus} resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <FiAlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="mb-4 p-3 rounded-xl text-sm text-red-400 flex items-center gap-2"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <FiAlertCircle /> Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {status === 'loading' ? (
                      <><FiLoader size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <><FiSend size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
