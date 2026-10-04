// ─── Admin Dashboard Page Types ───────────────────────────────────────────────

export interface StatCardItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: "DollarSign" | "ShoppingBag" | "Users" | "TrendingUp" | "Package" | "CreditCard";
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  count?: number;
  color: string;
}

export interface OrderStatusDataPoint {
  name: string;
  value: number;
  count: number;
  amount: number;
  color: string;
}

export interface PaymentMethodDataPoint {
  name: string;
  value: number;
  count: number;
  amount: number;
  color: string;
}

export interface TopProductItem {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  unitsSold: number;
  revenue: number;
}

export interface AdminKPIs {
  avgOrderValue: number;
  deliverySuccessRate: number;
  totalProducts: number;
  totalTransactions: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled" | "Shipped" | "Delivered";
  date: string;
}

export interface Transaction {
  _id: string;
  id?: string;
  orderId:
    | string
    | {
        _id: string;
        totalAmount?: number;
        orderStatus?: string;
        shippingAddress?: {
          fullName?: string;
          phone?: string;
          address?: string;
          city?: string;
          postalCode?: string;
        };
        createdAt?: string;
      };
  userId:
    | string
    | {
        _id?: string;
        name?: string;
        email?: string;
        image?: string;
        avatar?: string;
      };
  method: "cod" | "bkash" | "rocket" | "nagad" | string;
  amount: number;
  status: "pending" | "success" | "failed" | string;
  reference: string;
  createdAt?: string;
  updatedAt?: string;
}
