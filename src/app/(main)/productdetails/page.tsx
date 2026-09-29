import { getUserSession } from "@/lib/core/session";
import ProductDetailsPage from "../shop/[slug]/ProductDetailsPage";
import { Product, ProductReview } from "@/types";

const SAMPLE_PRODUCT: Product = {
  id: "hero-sample-4k-tv",
  title: "Ultra HD 4K Smart TV 55 Inch with Dolby Vision & Atmos",
  slug: "productdetails",
  categories: ["TV & Audio", "Smart Home", "Electronics"],
  categoryId: { name: "TV & Audio", slug: "tv-audio" },
  subCategoryIds: [
    { name: "Smart TVs", slug: "smart-tvs" },
    { name: "4K Displays", slug: "4k-displays" },
  ],
  price: 399.00,
  originalPrice: 499.00,
  discountPercentage: 20,
  image: "https://i.ibb.co.com/mVYgHKHt/black-color-wall-mount-32-inch-smart-led-tv-full-hd-display-065-removebg-preview.png",
  additionalImages: [
    "https://i.ibb.co.com/mVYgHKHt/black-color-wall-mount-32-inch-smart-led-tv-full-hd-display-065-removebg-preview.png",
    "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    "https://i.ibb.co.com/1tR8Pt8S/392223-large-removebg-preview.png",
  ],
  inStock: true,
  stockQuantity: 24,
  rating: 4.8,
  reviewCount: 42,
  sku: "TV-4K-55-UHD-PRO",
  badges: ["hot", "discount"],
  isFeatured: true,
  description:
    "Experience breathtaking visual clarity and vibrant HDR colors with the Ultra HD 4K Smart TV 55 Inch. Engineered with ultra-thin bezels, crystal-clear 4K upscaling, integrated streaming services, and Dolby Audio surround sound for cinema-quality entertainment at home.",
  specifications: {
    "Display Size": "55 Inch (139 cm)",
    "Resolution": "3840 x 2160 Pixels (4K Ultra HD)",
    "Display Technology": "QLED Quantum Dot HDR10+",
    "Refresh Rate": "120 Hz Motion Flow",
    "Audio Output": "20W Stereo Speakers with Dolby Atmos",
    "Connectivity": "Wi-Fi 6, Bluetooth 5.2, 4x HDMI 2.1, 2x USB 3.0, Ethernet",
    "Operating System": "Smart TV OS with Voice Assistant",
    "Warranty": "2 Years Official Manufacturer Warranty",
  },
};

const SAMPLE_REVIEWS: ProductReview[] = [
  {
    id: "sample-rev-1",
    userName: "Alexander Wright",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "The picture quality on this 55-inch panel is absolutely stunning. 4K HDR playback is fluid and the audio quality punches way above its price class.",
    date: "2026-03-18",
  },
  {
    id: "sample-rev-2",
    userName: "Sophia Martinez",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "Super easy to mount and the built-in smart TV interface is fast and snappy. Highly recommended for gaming and movie nights!",
    date: "2026-03-14",
  },
  {
    id: "sample-rev-3",
    userName: "Marcus Brody",
    rating: 4,
    comment:
      "Great value for money. Colors are vivid and response times on HDMI 2.1 are great for PlayStation 5.",
    date: "2026-03-09",
  },
];

import { getOrdersByUserId } from "@/lib/api/orders";
import { getReviewsByProductId } from "@/lib/api/reviews";

export default async function ProductDetailsRoutePage() {
  const currentUser = await getUserSession();

  // Check if current user ordered / has delivered order for this product
  let hasOrdered = false;
  let hasPurchased = false;
  let hasAlreadyReviewed = false;

  if (currentUser?.id) {
    const ordersRes = await getOrdersByUserId(currentUser.id);
    const orders = ordersRes?.data?.orders || ordersRes?.data || [];

    // Check if user ordered this product at all
    const matchingOrders = orders.filter((order: any) =>
      order.items?.some(
        (item: any) =>
          String(item.productId?._id || item.productId?.id || item.productId) === String(SAMPLE_PRODUCT.id)
      )
    );
    hasOrdered = matchingOrders.length > 0;

    // Check if any of those orders are delivered
    hasPurchased = matchingOrders.some(
      (order: any) => String(order.orderStatus).toLowerCase() === "delivered"
    );

    // Check if this user already left a review on this product
    const reviewsRes = await getReviewsByProductId(SAMPLE_PRODUCT.id);
    const allReviews = reviewsRes?.data?.reviews ?? reviewsRes?.data ?? [];
    hasAlreadyReviewed = Array.isArray(allReviews) && allReviews.some(
      (r: any) =>
        String(r.userId?._id || r.userId?.id || r.userId) === String(currentUser.id)
    );
  }

  return (
    <ProductDetailsPage
      product={SAMPLE_PRODUCT}
      initialReviews={SAMPLE_REVIEWS}
      currentUser={currentUser}
      hasOrdered={hasOrdered}
      hasPurchased={hasPurchased}
      hasAlreadyReviewed={hasAlreadyReviewed}
    />
  );
}
