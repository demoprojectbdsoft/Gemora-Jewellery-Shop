// ─── Home Page Specific Types ──────────────────────────────────────────────────

export interface HeroSlide {
  id: string;
  tabTitle: string;
  subtitle?: string;
  title: string;
  productName: string;
  price: string;
  originalPrice?: string;
  image: string;
  buttonText: string;
  href: string;
  hours: number;
  mins: number;
  secs: number;
}

export interface PromoBanner {
  id: string;
  subtitle: string;
  title: string;
  highlightText?: string;
  titleSuffix?: string;
  href: string;
  image: string;
  imageAlt: string;
  buttonText?: string;
  pricePrefix?: string;
  price?: number | string;
  priceDollars?: string;
  priceCents?: string;
  priority?: boolean;
}

export interface TabletPromoProps {
  categorySlug?: string;
  titlePrefix?: string;
  highlightText?: string;
  titleSuffix?: string;
  startingPrice?: string;
  cents?: string;
  imageSrc?: string;
}

export interface SlideItem {
  id: string;
  _id?: string;
  ownerId?: string;
  productId: string;
  tabTitle: string;
  subtitle: string;
  tagline: string;
  targetDate: string | Date;
  order?: number;
  isActive?: boolean;
  productName?: string;
  price?: number | string;
  originalPrice?: number | string;
  image?: string;
  href?: string;
  createdAt?: string;
  updatedAt?: string;
}
