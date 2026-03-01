"use client";

import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { footerConfig } from '@/config/site';

export default function NewFooter() {
  return (
    <footer className="relative w-full bg-void-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-display text-2xl text-white mb-2">{footerConfig.brandName}</h3>
            <p className="text-white/60 text-sm mb-6">{footerConfig.brandSubtitle}</p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display text-sm text-white uppercase tracking-wider mb-6">
              {footerConfig.contactTitle}
            </h4>
            <div className="space-y-6">
              {footerConfig.locations.map((location, index) => (
                <div key={index}>
                  <h5 className="text-white text-sm font-bold mb-2">{location.name}</h5>
                  <address className="text-white/60 text-sm not-italic space-y-1">
                    <p>{location.address}</p>
                    <p>{location.city}</p>
                  </address>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm text-white uppercase tracking-wider mb-6">
              Contact Info
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${footerConfig.phone}`}
                className="flex items-center gap-3 text-white/60 hover:text-primary-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{footerConfig.phone}</span>
              </a>
              <a
                href={`mailto:${footerConfig.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-primary-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{footerConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">{footerConfig.copyrightText}</p>
            
            <div className="flex items-center gap-6">
              {footerConfig.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-primary-accent transition-colors"
                  aria-label={social.label}
                >
                  {social.icon === 'facebook' && <Facebook className="w-5 h-5" />}
                  {social.icon === 'instagram' && <Instagram className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
