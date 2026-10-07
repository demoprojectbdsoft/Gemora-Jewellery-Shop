import React from "react";
import CustomerWishlistClient from "./CustomerWishlistClient";
import { getWishlistByUserId } from "@/lib/api/wishlist";
import { getCategories } from "@/lib/api/categories";
import { getUserSession } from "@/lib/core/session";

export default async function CustomerWishlistPage() {
  const user = await getUserSession();
  const [wishlistRes, categoriesRes] = await Promise.all([
    user?.id ? getWishlistByUserId(user.id) : null,
    getCategories(),
  ]);

  const rawItems = wishlistRes?.data?.items || wishlistRes?.data || [];
  const categories = categoriesRes?.data || categoriesRes || [];

  const items = rawItems
    .filter((item: any) => item?.productId)
    .map((item: any) => {
      const p = item.productId;
      return {
        id: item._id,
        productId: p._id || p.id,
        title: p.title,
        slug: p.slug,
        price: p.price,
        originalPrice: p.originalPrice,
        discountPercentage:
          p.originalPrice && p.originalPrice > p.price
            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
            : undefined,
        image: p.image,

        rating: p.rating ?? 0,
        category: p.category?.name || p.category || "Jewellery",
        addedAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "",
      };
    });

  return <CustomerWishlistClient initialItems={items} categories={categories} />;
}
