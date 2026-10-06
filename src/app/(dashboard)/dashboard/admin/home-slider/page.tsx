import React from "react";
import { getSlides } from "@/lib/api/slides";
import { getProducts } from "@/lib/api/products";
import HomeSliderClient from "./HomeSliderClient";

export const dynamic = "force-dynamic";

export default async function AdminHomeSliderPage() {
  const [slidesRes, productsRes] = await Promise.all([
    getSlides(),
    getProducts({ limit: 100 }),
  ]);

  const slides = Array.isArray(slidesRes?.data)
    ? slidesRes.data
    : Array.isArray(slidesRes)
    ? slidesRes
    : [];

  const products = Array.isArray(productsRes?.data?.products)
    ? productsRes.data.products
    : Array.isArray(productsRes?.products)
    ? productsRes.products
    : Array.isArray(productsRes?.data)
    ? productsRes.data
    : Array.isArray(productsRes)
    ? productsRes
    : [];

  return (
    <HomeSliderClient
      initialSlides={slides}
      products={products}
    />
  );
}
