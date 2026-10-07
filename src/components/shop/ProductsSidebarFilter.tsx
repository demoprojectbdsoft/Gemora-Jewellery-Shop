"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Sparkles, RotateCcw, Tag, Check, Sliders, ChevronDown, Layers, DollarSign, Percent } from "lucide-react";
import { RadioGroup, Radio } from "@heroui/react";
import { ProductsSidebarFilterProps, Category, SubCategory } from "@/types";

const DISCOUNT_TABS = ["0-20", "20-40", "40-60", "60-80", "80-100"] as const;

const MIN_PRICE = 0;
const MAX_PRICE = 2000;

export default function ProductsSidebarFilter({ categories = [], subCategories = [] }: ProductsSidebarFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExpandedResponsive, setIsExpandedResponsive] = useState(false);

  // Read URL params
  const activeCategory = searchParams.get("category") || "";
  const activeSubCat   = searchParams.get("subCategory") || "";
  const activeFeatured = searchParams.get("isFeatured") === "true";

  const urlMin         = Number(searchParams.get("minPrice")) || MIN_PRICE;
  const urlMax         = Number(searchParams.get("maxPrice")) || MAX_PRICE;

  const [rangeMin, setRangeMin] = useState(urlMin);
  const [rangeMax, setRangeMax] = useState(urlMax);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  useEffect(() => { setRangeMin(urlMin); }, [urlMin]);
  useEffect(() => { setRangeMax(urlMax); }, [urlMax]);

  // Auto-expand active category accordion
  useEffect(() => {
    if (activeCategory) setExpandedCats((prev) => ({ ...prev, [activeCategory]: true }));
  }, [activeCategory]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    params.delete("page");
    startTransition(() => router.push(`/shop?${params.toString()}`, { scroll: false }));
  };

  const handleCategoryClick = (cat: Category) => {
    const isCurrent = activeCategory === cat.slug;
    updateParams({
      category: isCurrent ? null : cat.slug,
      subCategory: null,
    });
    setExpandedCats((prev) => ({ ...prev, [cat.slug]: !prev[cat.slug] }));
  };

  const handleSubCatClick = (sub: SubCategory, cat: Category) => {
    const isCurrent = activeSubCat === sub.slug;
    updateParams({
      category: cat.slug,
      subCategory: isCurrent ? null : sub.slug,
    });
  };

  const activeDiscount = searchParams.get("discount") || "";

  const hasActiveFilters = Boolean(
    activeCategory || activeSubCat || activeFeatured || activeDiscount || urlMin > MIN_PRICE || urlMax < MAX_PRICE
  );

  const fillLeft = ((rangeMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const fillRight = ((rangeMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  const filterContent = (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-sky-100/80 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <h2 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => { setRangeMin(MIN_PRICE); setRangeMax(MAX_PRICE); router.push("/shop"); }}
            className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-600 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Categories & Subcategories */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-500" />
          Categories
        </label>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-0.5">
          {categories.map((cat) => {
            const catId = cat._id || cat.id;
            const children = subCategories.filter((sc) => {
              const p = sc.categoryId;
              const pId = typeof p === "object" && p !== null ? (p as any)._id || (p as any).id : p;
              return pId && catId && String(pId) === String(catId);
            });
            const isActive = activeCategory === cat.slug;
            const isExpanded = expandedCats[cat.slug] ?? isActive;

            return (
              <div key={cat.slug} className="rounded-xl border border-sky-100/60 dark:border-gray-800/80 overflow-hidden">
                <div className={`flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive ? "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}>
                  <button type="button" onClick={() => handleCategoryClick(cat)} className="flex items-center gap-1.5 flex-1 text-left cursor-pointer">
                    <Tag className="w-3 h-3 text-sky-500 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                    {children.length > 0 && <span className="text-[10px] text-gray-400 font-normal ml-1">({children.length})</span>}
                  </button>
                  {children.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpandedCats((prev) => ({ ...prev, [cat.slug]: !prev[cat.slug] }))}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {isExpanded && children.length > 0 && (
                  <div className="px-2.5 py-1.5 space-y-0.5 bg-gray-50/50 dark:bg-gray-900/50 border-t border-sky-100/40 dark:border-gray-800/50">
                    {children.map((sub) => {
                      const isSubActive = activeSubCat === sub.slug;
                      return (
                        <button
                          key={sub.slug}
                          type="button"
                          onClick={() => handleSubCatClick(sub, cat)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-left cursor-pointer transition-all ${
                            isSubActive ? "bg-sky-500 text-white font-semibold" : "text-gray-600 dark:text-gray-400 hover:bg-sky-50 dark:hover:bg-gray-800 hover:text-sky-600 dark:hover:text-sky-400"
                          }`}
                        >
                          <span className="pl-1">• {sub.name}</span>
                          {isSubActive && <Check className="w-3 h-3 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-2 border-t border-sky-100/80 dark:border-gray-800">
        <label className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-sky-500" /> Price Range
        </label>
        <div className="flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
          <span>${rangeMin}</span>
          <span className="text-[10px] text-gray-400">—</span>
          <span>${rangeMax}</span>
        </div>
        <div className="relative h-5 flex items-center">
          <div className="absolute w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="absolute h-1.5 rounded-full bg-sky-500" style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }} />
          <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={10} value={rangeMin}
            onChange={(e) => setRangeMin(Math.min(Number(e.target.value), rangeMax - 10))}
            className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer range-thumb"
          />
          <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={10} value={rangeMax}
            onChange={(e) => setRangeMax(Math.max(Number(e.target.value), rangeMin + 10))}
            className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer range-thumb"
          />
        </div>
        <button
          type="button"
          onClick={() => updateParams({ minPrice: rangeMin > MIN_PRICE ? String(rangeMin) : null, maxPrice: rangeMax < MAX_PRICE ? String(rangeMax) : null })}
          disabled={isPending}
          className="w-full h-8 text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
        >
          Apply Price
        </button>
      </div>

      {/* Discount Range */}
      <div className="space-y-2.5 pt-2 border-t border-sky-100/80 dark:border-gray-800">
        <label className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-sky-500" /> Discount
        </label>
        <div className="flex flex-wrap gap-1.5">
          {DISCOUNT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => updateParams({ discount: activeDiscount === tab ? null : tab })}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeDiscount === tab
                  ? "bg-sky-500 text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-sky-400"
              }`}
            >
              {tab}%
            </button>
          ))}
        </div>
      </div>

      {/* Featured & In Stock */}
      <div className="space-y-3 pt-2 border-t border-sky-100/80 dark:border-gray-800">
        <div className="p-2.5 rounded-xl border border-sky-100/80 dark:border-gray-800 bg-sky-50/30 dark:bg-gray-800/40">
          <RadioGroup
            value={activeFeatured ? "yes" : "no"}
            onChange={(val) => updateParams({ isFeatured: val === "yes" ? "true" : null })}
            aria-label="Featured filter"
          >
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Featured
            </div>
            <div className="flex gap-4">
              <Radio value="no">
                <Radio.Content className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400 cursor-pointer">
                  <Radio.Control className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center data-selected:border-sky-500 data-selected:bg-sky-500">
                    <Radio.Indicator className="w-1.5 h-1.5 rounded-full bg-white" />
                  </Radio.Control>
                  All
                </Radio.Content>
              </Radio>
              <Radio value="yes">
                <Radio.Content className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400 cursor-pointer">
                  <Radio.Control className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center data-selected:border-sky-500 data-selected:bg-sky-500">
                    <Radio.Indicator className="w-1.5 h-1.5 rounded-full bg-white" />
                  </Radio.Control>
                  Featured only
                </Radio.Content>
              </Radio>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Responsive Expandable / Collapsible Section (< lg screens) */}
      <div className="lg:hidden w-full mb-4">
        <button
          type="button"
          onClick={() => setIsExpandedResponsive(!isExpandedResponsive)}
          className="w-full flex items-center justify-between px-4 h-11 rounded-2xl border border-sky-100/80 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-sky-400 cursor-pointer shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-500" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isExpandedResponsive ? "rotate-180 text-sky-500" : ""
            }`}
          />
        </button>

        {/* Collapsible Content */}
        {isExpandedResponsive && (
          <div className="mt-2.5 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-sky-100/80 dark:border-gray-800 shadow-xs animate-in fade-in-50 slide-in-from-top-2 duration-200">
            {filterContent}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar (>= lg screens) */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-sky-100/80 dark:border-gray-800 shadow-xs p-5">
          {filterContent}
        </div>
      </aside>
    </>
  );
}
