// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram,
  FaChevronRight
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import logo from '/images/TalentBlocLogo.jpeg'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ];

  const resourceLinks = [
    { path: '/resources/articles', label: 'Articles' },
    { path: '/resources/case-studies', label: 'Case Studies' },
    { path: '/resources/announcements', label: 'Announcements' },
  ];

  const legalLinks = [
    { path: '', label: 'Privacy Policy' },
    { path: '', label: 'Terms of Service' },
  ];

  const socialLinks = [
    // { icon: FaXTwitter, href: 'https://twitter.com/talentbloc', label: 'Twitter' },
    // { icon: FaLinkedinIn, href: 'https://linkedin.com/company/talentbloc', label: 'LinkedIn' },
    // { icon: FaFacebookF, href: 'https://facebook.com/talentbloc', label: 'Facebook' },
    // { icon: FaInstagram, href: 'https://instagram.com/talentbloc', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Talent Bloc Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">
                Talent<span className="text-primary-400">Bloc</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              An AI operations consultancy. We help leaders resolve operational debt, so the business grows without the coordination getting heavier.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Site</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-5 group-hover:ml-0" />
                    <span className="group-hover:ml-1 transition-all duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-5 group-hover:ml-0" />
                    <span className="group-hover:ml-1 transition-all duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:talentbloc.africa@gmail.com"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <FaEnvelope className="w-4 h-4 flex-shrink-0" />
                  <span>talentbloc.africa@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/talentbloc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <FaXTwitter className="w-4 h-4 flex-shrink-0" />
                  <span>@talentbloc</span>
                </a>
              </li>
            </ul>

            {/* Legal */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} TalentBloc. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 italic">
            Operations, quietly done well.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;