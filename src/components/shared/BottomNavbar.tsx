"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  UserCircle,
  Settings,
  LayoutDashboard,
  Truck,
} from "lucide-react";

// Pages shown in desktop bottom nav & mobile bottom fixed bar
export const NAV_LINKS = [
  { label: "Home",      href: "/",         icon: Home },
  { label: "Shop",      href: "/shop",     icon: ShoppingBag },
  { label: "Profile",   href: "/profile",  icon: UserCircle },
  { label: "Settings",  href: "/settings", icon: Settings },
  { label: "Dashboard", href: "/dashboard",icon: LayoutDashboard },
];

// Pages shown in drawer / hamburger menu only
export const DRAWER_PAGE_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="w-full px-4 md:px-14 flex items-center justify-between gap-4">
        
        {/* Navigation Page Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 no-scrollbar">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap group ${
                  isActive
                    ? "text-primary bg-primary/10 dark:bg-primary/20 shadow-2xs"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100/70 dark:hover:bg-gray-900"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
                  }`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Promotional Text */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0">
          <Truck className="w-4 h-4 text-primary shrink-0" />
          <span>Free Shipping on Orders $50+</span>
        </div>

      </div>
    </div>
  );
}
