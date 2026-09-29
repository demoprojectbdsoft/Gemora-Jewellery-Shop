"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutProps } from "@/types";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import CustomerSidebar from "@/components/dashboard/CustomerSidebar";
import MobileBottomNav from "@/components/shared/MobileBottomNav";

export default function DashboardLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If path is under /dashboard/admin, show AdminSidebar, otherwise default to CustomerSidebar
  const isAdmin = pathname.startsWith("/dashboard/admin");

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      {/* Responsive Collapsible Sidebar */}
      {isAdmin ? (
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      ) : (
        <CustomerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Render Page Children */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-20 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Fixed Mobile Bottom Bar for responsive devices */}
      <MobileBottomNav />
    </div>
  );
}
