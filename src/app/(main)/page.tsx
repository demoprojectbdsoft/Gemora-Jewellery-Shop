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
    id: "banner-cameras",
    subtitle: "CATCH HOTTEST",
    title: "IN CAMERAS CATEGORY",
    highlightText: "DEALS",
    href: "/shop?category=cameras",
    image: "https://dezlwerqy1h00.cloudfront.net/Media/Images/Product/Visual/22879_pictures_product_visual_1.png?auto=webp&format=pjpg&quality=100",
    imageAlt: "Cameras Category Deals",
    buttonText: "Shop now",
    priority: true,
  },
  {
    id: "banner-tablets",
    subtitle: "TABLETS, SMARTPHONES",
    title: "AND MORE",
    href: "/shop?category=tablets-smartphones",
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    imageAlt: "Tablets and Smartphones",
    pricePrefix: "FROM",
    priceDollars: "749",
    priceCents: "99",
  },
];

const tabletPromoData: TabletPromoProps = {
  categorySlug: "tablets",
  titlePrefix: "SHOP AND",
  highlightText: "SAVE BIG",
  titleSuffix: "ON HOTTEST TABLETS",
  startingPrice: "79",
  cents: "99",
  imageSrc: "https://i.ibb.co.com/zh1qTHwh/Tablets.png",
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
