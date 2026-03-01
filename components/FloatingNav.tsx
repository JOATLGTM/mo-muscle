"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Briefcase, Dumbbell, BookOpen, Heart, Calendar } from 'lucide-react';
import Schedule from '@/components/Schedule';
import { useScheduleModal } from '@/hooks/useScheduleModal';

const allNavItems = [
  { label: 'Home', sectionId: 'hero', icon: Home, href: '/' },
  { label: 'About', sectionId: 'about', icon: Users, href: '/#about' },
  { label: 'Services', sectionId: 'services', icon: Briefcase, href: '/#services' },
  { label: 'Team', sectionId: 'team', icon: Dumbbell, href: '/#team' },
  { label: 'Trainers', sectionId: null, icon: Users, href: '/trainers' },
  { label: 'Blog', sectionId: null, icon: BookOpen, href: '/blog' },
  { label: 'Why Mo Muscle', sectionId: null, icon: Heart, href: '/whymomuscle' },
  { label: 'Schedule', sectionId: null, icon: Calendar, href: null },
];

interface FloatingNavProps {
  showOnly?: string[]; // Optional filter to show only specific items
}

export default function FloatingNav({ showOnly }: FloatingNavProps = {}) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { showModal, openModal, setShowModal } = useScheduleModal();

  // Filter nav items if showOnly is provided
  const navItems = showOnly 
    ? allNavItems.filter(item => showOnly.includes(item.label))
    : allNavItems;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (item: typeof navItems[0]) => (e: React.MouseEvent) => {
    // If it's the Schedule button, open modal
    if (item.label === 'Schedule') {
      e.preventDefault();
      openModal();
      return;
    }

    // If on homepage and has sectionId, scroll to section
    if (isHomePage && item.sectionId) {
      e.preventDefault();
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Otherwise, let the Link handle navigation (including /#section for other pages)
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 hidden md:block transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            
            if (item.href === null) {
              // Schedule button - no Link wrapper
              return (
                <button
                  key={item.label}
                  onClick={handleNavClick(item)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5 whitespace-nowrap"
                  aria-label={item.label}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick(item)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5 whitespace-nowrap"
                aria-label={item.label}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Schedule Modal */}
      <Schedule showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
