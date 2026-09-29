import { getProductBySlug } from "@/lib/api/products";
import { getReviewsByProductId } from "@/lib/api/reviews";
import { getOrdersByUserId } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductNotFound from "./ProductNotFound";

export default async function ProductSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productRes = await getProductBySlug(slug);
  const product = productRes?.data;

  if (!product) return <ProductNotFound slug={slug} />;

  const [currentUser, reviewsRes] = await Promise.all([
    getUserSession(),
    getReviewsByProductId(product.id),
  ]);

  // Check if current user ordered / has delivered order for this product
  let hasOrdered = false;
  let hasPurchased = false;
  let hasAlreadyReviewed = false;
  const fetchedReviews = reviewsRes?.data?.reviews ?? reviewsRes?.data ?? [];

  if (currentUser?.id) {
    const ordersRes = await getOrdersByUserId(currentUser.id);
    const orders = ordersRes?.data?.orders || ordersRes?.data || [];

    // Check if user ordered this product at all
    const matchingOrders = orders.filter((order: any) =>
      order.items?.some(
        (item: any) =>
          String(item.productId?._id || item.productId?.id || item.productId) === String(product.id)
      )
    );
    hasOrdered = matchingOrders.length > 0;

    // Check if any of those orders are delivered
    hasPurchased = matchingOrders.some(
      (order: any) => String(order.orderStatus).toLowerCase() === "delivered"
    );

    // Check if this user already left a review on this product
    hasAlreadyReviewed = Array.isArray(fetchedReviews) && fetchedReviews.some(
      (r: any) =>
        String(r.userId?._id || r.userId?.id || r.userId) === String(currentUser.id)
    );
  }

  return (
    <ProductDetailsPage
      product={product}
      initialReviews={fetchedReviews}
      currentUser={currentUser}
      hasOrdered={hasOrdered}
      hasPurchased={hasPurchased}
      hasAlreadyReviewed={hasAlreadyReviewed}
    />
  );
}