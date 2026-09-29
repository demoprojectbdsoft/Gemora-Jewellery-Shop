"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, UserCircle, Settings, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = ((user as { role?: string })?.role || "customer").toLowerCase();

  // Auth-aware hrefs
  const profileHref = user
    ? `/dashboard/${userRole}/profile`
    : "/auth/login";
  const settingsHref = user
    ? `/dashboard/${userRole}/settings`
    : "/auth/login";
  const dashboardHref = user
    ? `/dashboard/${userRole}`
    : "/auth/login";

  const NAV_ITEMS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { label: "Profile", href: profileHref, icon: UserCircle },
    { label: "Settings", href: settingsHref, icon: Settings },
    { label: "Dashboard", href: dashboardHref, icon: LayoutDashboard },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-t border-gray-200/80 dark:border-gray-800/80 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.3)] transition-colors duration-200"
    >
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around relative">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={item.label}
              className="relative flex flex-col items-center justify-center flex-1"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Floating Name Tooltip on Hover */}
              <div
                className={`absolute -top-9 px-2.5 py-1 rounded-md bg-gray-900/95 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-semibold tracking-wide pointer-events-none transition-all duration-200 shadow-md whitespace-nowrap z-50 flex items-center justify-center ${
                  isHovered
                    ? "opacity-100 -translate-y-1 scale-100"
                    : "opacity-0 translate-y-1 scale-90"
                }`}
              >
                <span>{item.label}</span>
                {/* Arrow pointer */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/95 dark:border-t-gray-100" />
              </div>

              {/* Navigation Link */}
              <Link
                href={item.href}
                className={`relative flex flex-col items-center justify-center w-full py-1.5 px-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary dark:text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary active:scale-95"
                }`}
              >
                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 dark:bg-primary/20 shadow-xs"
                      : "hover:bg-gray-100/80 dark:hover:bg-gray-900/80"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? "scale-110 stroke-[2.2]" : "stroke-[1.8]"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>

                <span
                  className={`text-[10px] font-medium tracking-tight mt-0.5 truncate transition-all duration-200 ${
                    isActive
                      ? "font-bold text-primary dark:text-primary"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
