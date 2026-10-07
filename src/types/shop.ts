import { Product, Category, SubCategory } from "./index";

export interface ShopQueryParams {
  search?: string;
  category?: string;
  categoryId?: string;
  subCategory?: string;
  subCategoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  discount?: string;
  badge?: string;
  isFeatured?: string;

  sort?: string;
  page?: string;
}

export interface ShopPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsTopBarProps {
  categories: Category[];
  totalResults: number;
  onToggleMobileFilter?: () => void;
}

export interface ProductsSidebarFilterProps {
  categories?: Category[];
  subCategories: SubCategory[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export interface ProductsGridProps {
  products: Product[];
  pagination: ShopPagination;
}

export interface ProductCardProps {
  product: Product;
  hasRightBorder?: boolean;
  showDiscountBadge?: boolean;
}
