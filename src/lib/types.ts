import { ColumnDef } from "@tanstack/react-table";
type createdByName = {
  name: string;
  email: string;
};

export interface ICategory {
  _id: string;
  name: string;
  slug?: string;
  description: string;
  image: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | createdByName;
}

export interface CategoryProps {
  category: ICategory[];
}

export interface IProduct {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  detailsDesc?: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand?: string;
  images: string[];
  stock: number;
  tags: string[] | [];
  ratings: number;
  numReviews: number;
  size?: string;
  createdBy?: string | createdByName;
  createdAt?: Date;
  isActive?: boolean;
}

export interface ProductsProps {
  popProducts: IProduct[];
}

type TCreatedByInfo = {
  name: string;
  image: string;
  email: string;
};

export interface IBlog {
  _id?: string;
  image: string;
  title: string;
  subTitle?: string;
  description: string;
  tags: string[];
  category: string;
  slug?: string;
  isPublished: boolean;
  createdBy?: TCreatedByInfo;
  createdAt?: string;
  updatedAt?: Date;
}

export interface BlogsProps {
  blog: IBlog;
}
export interface BlogProps {
  blogs: IBlog[];
}

export interface CartItem {
  productId: IProduct;
  quantity: number;
  _id: string;
}

export interface ICart {
  data: {
    items: CartItem[];
  };
}

export type TUserRole = "user" | "admin" | "staff";
export type TUserStatus = "active" | "inactive" | "banned";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  image?: string;
  role?: TUserRole;
  status?: TUserStatus;
  isDeleted: boolean;
  createdAt?: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string; // Optional since it's in cookies
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  data: {
    user: IUser;
  };
  success?: boolean;
}

export interface AdvancedTableProps<T> {
  // Required props
  title: string;
  columns: ColumnDef<T>[];
  data: T[];

  // Optional configuration
  subtitle?: string;
  loading?: boolean;
  error?: string;
  config?: TableConfig;

  // Pagination options
  pageSizeOptions?: number[];
  defaultPageSize?: number;

  // Export options
  exportFileName?: string;
  exportSheetName?: string;

  // Actions
  rowActions?: TableAction<T>[];
  bulkActions?: TableAction<T[]>[];

  // Custom components
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  errorState?: React.ReactNode;

  // Event handlers
  onRowClick?: (row: T) => void;
  onDataChange?: (data: T[]) => void;
}

export interface TableAction<T> {
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: T) => void;
  variant?: "default" | "destructive" | "outline" | "secondary";
  disabled?: (row: T) => boolean;
}

export interface TableConfig {
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  enableRowSelection?: boolean;
  showTableInfo?: boolean;
  stickyHeader?: boolean;
}

/* Order Schema */
export interface IOrderItem {
  product: string; // product ID (ObjectId as string)
  quantity: number;
  price: number;
}
export interface IShippingAddress {
  name: string;
  phone: string;
  city?: string;
  area?: string;
  address: string;
}

export interface IOrder {
  _id: string;
  user: string; // userId
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;

  paymentMethod: "cod" | "online";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

  totalAmount: number;
  deliveryCharge: number;
  totalPayable: number;

  transactionId: string;

  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
