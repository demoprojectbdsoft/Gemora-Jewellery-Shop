"use client";

import React from "react";
import { Brand as BrandType } from "@/types";
import Marquee from "react-fast-marquee";

const BRANDS: BrandType[] = [
  {
    id: "1",
    name: "GIA Certified",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 font-bold tracking-widest text-xl text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase">
        <span className="text-2xl font-black font-serif">♦</span>
        <span className="font-extrabold tracking-widest">GIA</span>
      </div>
    ),
  },
  {
    id: "2",
    name: "Cartier",
    renderLogo: () => (
      <div className="font-serif italic text-2xl tracking-wider text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        Cartier
      </div>
    ),
  },
  {
    id: "3",
    name: "Tiffany & Co.",
    renderLogo: () => (
      <div className="font-serif text-xl tracking-widest text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase">
        TIFFANY &amp; CO.
      </div>
    ),
  },
  {
    id: "4",
    name: "Bulgari",
    renderLogo: () => (
      <div className="font-serif font-bold text-2xl tracking-[0.25em] text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase">
        BVLGARI
      </div>
    ),
  },
  {
    id: "5",
    name: "Van Cleef & Arpels",
    renderLogo: () => (
      <div className="font-serif italic text-lg tracking-normal text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        Van Cleef &amp; Arpels
      </div>
    ),
  },
  {
    id: "6",
    name: "Harry Winston",
    renderLogo: () => (
      <div className="flex items-center gap-1 font-serif text-lg tracking-widest uppercase text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        <span>HARRY WINSTON</span>
      </div>
    ),
  },
  {
    id: "7",
    name: "De Beers",
    renderLogo: () => (
      <div className="font-serif font-semibold text-xl tracking-widest uppercase text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        DE BEERS
      </div>
    ),
  },
  {
    id: "8",
    name: "Chopard",
    renderLogo: () => (
      <div className="font-serif italic text-2xl tracking-wide text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        Chopard
      </div>
    ),
  },
  {
    id: "9",
    name: "Graff",
    renderLogo: () => (
      <div className="font-serif font-bold text-2xl tracking-[0.3em] uppercase text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        GRAFF
      </div>
    ),
  },
  {
    id: "10",
    name: "Swarovski",
    renderLogo: () => (
      <div className="font-serif font-light text-xl tracking-widest uppercase text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        SWAROVSKI
      </div>
    ),
  },
  {
    id: "11",
    name: "Boucheron",
    renderLogo: () => (
      <div className="font-serif font-bold text-xl tracking-widest uppercase text-slate-400 dark:text-gray-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
        BOUCHERON
      </div>
    ),
  },
];

export default function Brand() {
  return (
    <section className="w-full py-8 my-6 border-y border-slate-200/80 dark:border-gray-800 relative bg-white/50 dark:bg-gray-950/50">
      
      {/* react-fast-marquee with pause-on-hover */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="select-none py-2"
      >
        <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer shrink-0"
            >
              {brand.renderLogo()}
            </div>
          ))}
        </div>
      </Marquee>

    </section>
  );
}