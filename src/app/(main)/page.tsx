import { Suspense } from "react";
import HeroSlider from "@/components/homepage/HeroSlider";
import CategoriesDropdown from "@/components/shared/CategoriesDropdown";
import PromoBanners from "@/components/homepage/PromoBanners";
import WarehouseDeals from "@/components/homepage/WarehouseDeals";
import TrendingProducts from "@/components/homepage/TrendingProducts";
import PopularProducts from "@/components/homepage/PopularProducts";
import NewArrivals from "@/components/homepage/NewArrivals";
import { Product } from "@/types";
import { PromoBanner, TabletPromoProps } from "@/types/home";
import TabletPromoBanner from "@/components/homepage/TabletPromoBanner";
import Brand from "@/components/homepage/Brand";
import { getProducts } from "@/lib/api/products";
import { getSlides } from "@/lib/api/slides";

// ─── Static data ─────────────────────────────────────────────────────────────

const promoBannersData: PromoBanner[] = [
  {
    id: "banner-diamonds",
    subtitle: "TIMELESS BRILLIANCE",
    title: "SOLITAIRE DIAMOND RINGS",
    highlightText: "NEW",
    href: "/shop?category=diamond-rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    imageAlt: "Solitaire Diamond Rings",
    buttonText: "Shop now",
    priority: true,
  },
  {
    id: "banner-necklaces",
    subtitle: "18K GOLD & GEMSTONES",
    title: "ROYAL PENDANTS & CHAINS",
    href: "/shop?category=necklaces-pendants",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    imageAlt: "Royal Pendants and Chains",
    pricePrefix: "FROM",
    priceDollars: "499",
    priceCents: "00",
  },
];

const tabletPromoData: TabletPromoProps = {
  categorySlug: "bridal-wedding",
  titlePrefix: "HANDCRAFTED",
  highlightText: "ROYAL BRIDAL",
  titleSuffix: "HERITAGE COLLECTION",
  startingPrice: "899",
  cents: "00",
  imageSrc: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
};

// ─── Per-section async server components ─────────────────────────────────────

async function HeroSliderSection() {
  const slidesRes = await getSlides("isActive=true");
  const slides = Array.isArray(slidesRes?.data)
    ? slidesRes.data
    : Array.isArray(slidesRes)
    ? slidesRes
    : [];

  return <HeroSlider initialSlides={slides} />;
}

async function NewArrivalsSection() {
  const res = await getProducts({ sort: "newest", limit: 14 });
  const products: Product[] = res?.data?.products ?? [];
  return <NewArrivals products={products} />;
}

async function TrendingSection() {
  const res = await getProducts({ badge: "trending", limit: 14 });
  const products: Product[] = res?.data?.products ?? [];
  return <TrendingProducts products={products} />;
}

async function PopularSection() {
  const res = await getProducts({ badge: "popular", limit: 14 });
  const products: Product[] = res?.data?.products ?? [];
  return <PopularProducts products={products} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ── Hero Section: Left Docked Categories & Right-Shifted Slider ── */}
      <section className="w-full max-w-7xl mx-auto my-6 relative z-30">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="hidden lg:block w-[270px] shrink-0 relative z-40">
            <CategoriesDropdown variant="docked" label="All Departments" />
          </div>
          <div className="flex-1 min-w-0 w-full relative z-10">
            <Suspense fallback={<HeroSlider />}>
              <HeroSliderSection />
            </Suspense>
          </div>
        </div>
      </section>

      <WarehouseDeals />

      {/* New Arrivals — shows skeleton while fetching */}
      <Suspense fallback={<NewArrivals loading />}>
        <NewArrivalsSection />
      </Suspense>

      <PromoBanners banners={promoBannersData} />

      {/* Trending Products — shows skeleton while fetching */}
      <Suspense fallback={<TrendingProducts loading />}>
        <TrendingSection />
      </Suspense>

      {/* Popular Products — shows skeleton while fetching */}
      <Suspense fallback={<PopularProducts loading />}>
        <PopularSection />
      </Suspense>

      <TabletPromoBanner tabletPromoData={tabletPromoData} />
      <Brand />
    </>
  );
}
