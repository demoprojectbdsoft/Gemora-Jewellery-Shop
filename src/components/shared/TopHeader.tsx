import React from 'react';
import Link from 'next/link';
import { MapPin, Truck, ShoppingBag } from 'lucide-react';
import { TopBarItem } from '@/types';

// Top Bar Specific Data Array
export const TOP_BAR_ITEMS: TopBarItem[] = [
  { label: 'Store Locator', href: '/store-locator', icon: MapPin },
  { label: 'Track Your Order', href: '/track-order', icon: Truck },
  // { label: 'Shop', href: '/shop', icon: ShoppingBag },
];

export default function TopBar() {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#1a2236] via-[#1e2d45] to-[#1a2236] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-xs transition-colors duration-200 shadow-md">
      {/* Bottom accent gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-sky-400 to-indigo-500 pointer-events-none" />

      <div className="w-full px-4 md:px-14 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">

        {/* Left Side: Welcome Text */}
        <div className="flex items-center">
          <span className="font-medium text-gray-300/90 tracking-wide">
            Welcome to Worldwide Electronics Store
          </span>
        </div>

        {/* Right Side: Links mapped from TOP_BAR_ITEMS */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {TOP_BAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === TOP_BAR_ITEMS.length - 1;

            return (
              <React.Fragment key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-all duration-200 relative"
                >
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 blur-sm bg-primary/20 transition-opacity duration-200 -z-10" />
                  <Icon className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_rgba(var(--color-primary),0.8)] transition-all duration-200" />
                  <span className="group-hover:text-white font-medium tracking-wide">
                    {item.label}
                  </span>
                </Link>

                {!isLast && (
                  <span className="text-gray-600 font-light select-none">|</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}