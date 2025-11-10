
import React from 'react';
import type { Page } from '../App';
import { HomeIcon, SalonIcon, VideoIcon, PackageIcon, ProfileIcon, ShoppingCartIcon } from './IconComponents';

interface FooterProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
  const defaultNavItems = [
    { name: 'Home', icon: HomeIcon, page: 'home' as Page },
    { name: 'Salon', icon: SalonIcon, page: 'salon' as Page },
    { name: 'Video', icon: VideoIcon, page: 'video' as Page },
    { name: 'Orders', icon: PackageIcon, page: 'order' as Page },
    { name: 'Profile', icon: ProfileIcon, page: 'profile' as Page },
  ];

  const salonNavItems = [
    { name: 'Home', icon: HomeIcon, page: 'home' as Page },
    { name: 'Salon', icon: SalonIcon, page: 'salon' as Page },
    { name: 'Shop', icon: ShoppingCartIcon, page: 'shop' as Page },
    { name: 'Orders', icon: PackageIcon, page: 'order' as Page },
    { name: 'Profile', icon: ProfileIcon, page: 'profile' as Page },
  ];

  const navItems = (currentPage === 'salon' || currentPage === 'top-salons') ? salonNavItems : defaultNavItems;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentPage(item.page)}
            className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-purple-600 transition-colors"
          >
            <item.icon className={`h-6 w-6 mb-1 ${currentPage === item.page ? 'text-purple-600' : ''}`} />
            <span className={`text-xs font-medium ${currentPage === item.page ? 'text-purple-600' : ''}`}>
              {item.name}
            </span>
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;