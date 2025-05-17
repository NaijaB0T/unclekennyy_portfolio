'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';
import OpenStreetMap from '@/components/utils/OpenStreetMap';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Video Production',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Video Production',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-24 relative ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl lg:text-4xl font-bold mb-12 text-center max-w-3xl mx-auto"
        >
          Thinking big? Connect with us and let's create <span className="text-[#ff6d00]">wonders</span>!
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent ${
                    theme === 'dark' 
                      ? 'border-gray-300 bg-white text-black' 
                      : 'border-gray-700 bg-gray-900 text-white'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent ${
                    theme === 'dark' 
                      ? 'border-gray-300 bg-white text-black' 
                      : 'border-gray-700 bg-gray-900 text-white'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Contact Number</label>
                <div className="flex">
                  <div className={`flex items-center rounded-l-lg px-3 border border-r-0 ${
                    theme === 'dark' 
                      ? 'bg-gray-100 border-gray-300 text-gray-500' 
                      : 'bg-gray-800 border-gray-700 text-gray-400'
                  }`}>
                    <span>+234</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-r-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent ${
                      theme === 'dark' 
                        ? 'border-gray-300 bg-white text-black' 
                        : 'border-gray-700 bg-gray-900 text-white'
                    }`}
                    placeholder="8012345678"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">Selected Service</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent ${
                    theme === 'dark' 
                      ? 'border-gray-300 bg-white text-black' 
                      : 'border-gray-700 bg-gray-900 text-white'
                  }`}
                >
                  <option value="Video Production">Video Production</option>
                  <option value="Music Videos">Music Videos</option>
                  <option value="3D & CGI">3D & CGI</option>
                  <option value="Commercial Production">Commercial Production</option>
                  <option value="Photography">Photography</option>
                  <option value="Equipment Rental">Equipment Rental</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff6d00] focus:border-transparent ${
                  theme === 'dark' 
                    ? 'border-gray-300 bg-white text-black' 
                    : 'border-gray-700 bg-gray-900 text-white'
                }`}
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="px-8 py-4 bg-[#ff6d00] text-white rounded-lg font-bold text-lg hover:bg-[#e55d00] transition-colors"
              >
                SUBMIT →
              </button>
            </div>
          </motion.form>
          
          {/* Map & Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Map */}
            <div className="mb-8 rounded-xl overflow-hidden h-72">
              <OpenStreetMap 
                latitude={6.4281} 
                longitude={3.4219} 
                zoom={14}
                className="h-72"
              />
            </div>
            
            {/* Contact Info */}
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-100' : 'bg-gray-900'}`}>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="min-w-8 mt-1">📍</div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                      Victoria Island, Lagos, Nigeria
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-8 mt-1">📧</div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                      hello@unclekenny.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="min-w-8 mt-1">📞</div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>
                      +234 123 4567 890
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-[#ff6d00] transition-colors">INSTAGRAM</a>
                  <a href="#" className="hover:text-[#ff6d00] transition-colors">LINKEDIN</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;