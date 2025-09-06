import { ColumnDef } from "@tanstack/react-table";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date
  createdBy: string;
  __v: number;
}

export interface CategoryProps {
  category: ICategory[];
}
type createdByName = {
  name: string;
  email: string;
};
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
}

export interface ProductsProps {
  popProducts: IProduct[];
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
  role: TUserRole;
  status: TUserStatus;
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
