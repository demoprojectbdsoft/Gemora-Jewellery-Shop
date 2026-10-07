"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  Button,
} from "@heroui/react";
import {
  ArrowLeft,
  Package,
  Layers,
  Sparkles,
  DollarSign,
  CheckCircle2,
  XCircle,
  Star,
  Tag,
  Hash,
  Info,
  Calendar,
} from "lucide-react";
import { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const allImages = [
    product.image,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const catName =
    product.categoryId?.name ||
    (product.categories && product.categories[0]) ||
    "Uncategorized";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* ── Breadcrumb & Back Action ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/admin" className="hover:text-sky-600 transition-colors">
            Admin
          </Link>
          <span>/</span>
          <Link href="/dashboard/admin/products" className="hover:text-sky-600 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-sky-600 dark:text-sky-400 font-bold truncate max-w-xs">
            {product.title}
          </span>
        </div>

        <Link
          href="/dashboard/admin/products"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* ── Main Product Header & Summary ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-200/50 dark:border-sky-800/40">
              <Layers className="w-3.5 h-3.5" />
              {catName}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
                <CheckCircle2 className="w-3 h-3" />
                Made to Order
              </span>

            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
                <Sparkles className="w-3 h-3" /> Featured Item
              </span>
            )}

            {product.badges?.map((b) => (
              <span
                key={b}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 uppercase tracking-wider"
              >
                {b}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
            {product.sku && <span>SKU: {product.sku}</span>}
            <span>Slug: /{product.slug}</span>
            {product.id && <span>ID: {product.id}</span>}
          </div>
        </div>

        <div className="flex md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-gray-800">
          <span className="text-[11px] uppercase font-bold text-gray-400">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              ${product.price?.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm font-semibold text-gray-400 line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          {product.discountPercentage ? (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Save {product.discountPercentage}%
            </span>
          ) : null}
        </div>
      </div>

      {/* ── Grid: Media + Details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Images Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-4 overflow-hidden shadow-xs">
            {/* Active Image */}
            <div className="relative w-full aspect-square bg-slate-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-700/60">
              {allImages[activeImageIndex] ? (
                <Image
                  src={allImages[activeImageIndex]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain p-4"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="w-16 h-16" />
                </div>
              )}
            </div>

            {/* Thumbnail previews */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-50 dark:bg-gray-800 p-1 ${
                      activeImageIndex === idx
                        ? "border-sky-500 shadow-xs ring-2 ring-sky-500/20"
                        : "border-slate-200 dark:border-gray-700 hover:border-sky-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Customer Rating
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-base font-black text-gray-900 dark:text-white">
                  {product.rating ?? 0}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviewCount ?? 0} reviews)
                </span>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Availability
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  Crafted to Order
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Specifications & Description (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Description */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-500" />
              Product Description
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description || "No product description provided."}
            </div>
          </Card>

          {/* Specifications */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" />
              Technical Specifications
            </h2>

            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-gray-800 border border-slate-100 dark:border-gray-800 rounded-2xl overflow-hidden text-xs">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-3 p-3 bg-white dark:bg-gray-900 even:bg-slate-50/60 dark:even:bg-gray-800/30"
                  >
                    <span className="font-semibold text-gray-500 dark:text-gray-400">
                      {key}
                    </span>
                    <span className="col-span-2 font-medium text-gray-900 dark:text-white">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No technical specifications available for this product.
              </p>
            )}
          </Card>

          {/* Hierarchy & Taxonomy */}
          <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-500" />
              Categorization &amp; Hierarchy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Primary Category
                </span>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {catName}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-gray-800/40 rounded-xl border border-slate-200/60 dark:border-gray-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Subcategories
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.subCategoryIds && product.subCategoryIds.length > 0 ? (
                    product.subCategoryIds.map((s: any, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300"
                      >
                        {typeof s === "object" ? s.name : s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-[11px]">None assigned</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
