"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Headphones } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRss,
} from "react-icons/fa6";

export default function Footer() {
  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", href: "#" },
    { icon: FaXTwitter, label: "Twitter", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
    { icon: FaRss, label: "RSS Feed", href: "#" },
  ];

  return (
    <footer className="w-full bg-slate-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-sans border-t border-sky-100/60 dark:border-gray-800">
      
      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Contact (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Logo matching luxury jewellery language */}
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/logo.svg"
                alt="Gemora Fine Jewellery"
                width={170}
                height={42}
                className="h-9 md:h-10 w-auto object-contain dark:hidden"
              />
              <Image
                src="/logo-footer.svg"
                alt="Gemora Fine Jewellery"
                width={170}
                height={42}
                className="h-9 md:h-10 w-auto object-contain hidden dark:block"
              />
            </Link>

            {/* 24/7 Call Center Hotline Block (Gradient Blue & Gold Accents) */}
            <div className="flex items-center gap-4 py-2">
              <div className="p-3.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/40 shadow-xs shrink-0">
                <Headphones className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Private Concierge &amp; Queries 24/7:
                </p>
                <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                  (800) 8001-8588, (0600) 874 548
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                Showroom &amp; Atelier
              </h4>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                17 Princess Road, Mayfair, London NW1 8JR, UK
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white dark:hover:text-white hover:border-transparent transition-all duration-300 shadow-xs flex items-center justify-center"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Column 2 & 3: Find It Fast Links (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Jewellery Collections
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs md:text-sm">
              
              {/* Left Link Group */}
              <ul className="space-y-2.5">
                {[
                  { name: "Diamond Rings", query: "diamond-rings" },
                  { name: "Gold Necklaces", query: "necklaces-pendants" },
                  { name: "Luxury Bracelets", query: "bracelets-bangles" },
                  { name: "Gemstone Earrings", query: "earrings" },
                  { name: "Bridal & Wedding", query: "bridal-wedding" },
                  { name: "Precious Gemstones", query: "gemstones" },
                  { name: "High Jewellery", query: "high-jewellery" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/shop?category=${link.query}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Right Link Group */}
              <ul className="space-y-2.5">
                {[
                  { name: "About Gemora", href: "/about" },
                  { name: "Bespoke Services", href: "/services" },
                  { name: "Wishlist", href: "/dashboard/customer/wishlist" },
                  { name: "Compare Pieces", href: "/compare" },
                  { name: "Boutique Locator", href: "/store-locator" },
                  { name: "Contact Concierge", href: "/contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Column 4: Customer Care (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              {[
                { name: "My Account", href: "/account" },
                { name: "Track your Order", href: "/track-order" },
                { name: "Bespoke Consultations", href: "/services" },
                { name: "Diamond Certification", href: "/services" },
                { name: "Jewellery Care & Sizing", href: "/services" },
                { name: "Privacy & Terms", href: "/terms" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Sub-Footer Bar ── */}
      <div className="w-full bg-slate-100/80 dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400">
          
          <p className="text-center md:text-left">
            © <strong className="font-semibold text-gray-800 dark:text-gray-200">Gemora Fine Jewellery</strong> - All Rights Reserved
          </p>

          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-black text-xs text-blue-900 dark:text-sky-400 tracking-wider">
              DISCOVER
            </span>
            <div className="flex -space-x-1">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block" />
            </div>
            <span className="font-bold text-xs italic text-blue-800 dark:text-blue-400">
              PayPal
            </span>
            <span className="font-bold text-xs text-purple-700 dark:text-purple-400">
              Skrill
            </span>
            <span className="font-black text-xs text-blue-700 dark:text-sky-300 italic">
              VISA
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}