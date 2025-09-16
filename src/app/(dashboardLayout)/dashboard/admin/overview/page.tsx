"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Star,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Leaf,
  Sprout,
  TreePine,
  Home,
} from "lucide-react";
import { PRODUCT_SIZES, PRODUCT_TAGS } from "@/lib/staticData";

type ProductSize = (typeof PRODUCT_SIZES)[number];
type ProductTag = (typeof PRODUCT_TAGS)[number];
type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

// TypeScript interfaces
interface Product {
  id: number;
  name: string;
  status: "active" | "out_of_stock";
  category: string;
  price: number;
  sales: number;
  size: ProductSize;
  tags: ProductTag[];
}

interface Order {
  id: number;
  status: OrderStatus;
  total: number;
  date: Date;
  customerName?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  joinDate: Date;
}

interface Blog {
  id: number;
  title: string;
  status: "published" | "draft";
  views: number;
  publishDate: Date;
}

interface Review {
  id: number;
  rating: number;
  status: "approved" | "pending";
  productId: number;
}

interface Category {
  name: string;
  count: number;
  color: string;
}

interface AnalyticsData {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number };
  loading?: boolean;
  color?: "default" | "success" | "warning" | "error";
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}

// Mock hook return types
interface UseProductsReturn {
  data:
    | {
        products: Product[];
        categories: Category[];
      }
    | undefined;
  isLoading: boolean;
}

interface UseOrdersReturn {
  data:
    | {
        orders: Order[];
        recentOrders: Order[];
      }
    | undefined;
  isLoading: boolean;
}

interface UseUsersReturn {
  data:
    | {
        users: User[];
      }
    | undefined;
  isLoading: boolean;
}

interface UseBlogsReturn {
  data:
    | {
        blogs: Blog[];
      }
    | undefined;
  isLoading: boolean;
}

interface UseReviewsReturn {
  data:
    | {
        reviews: Review[];
      }
    | undefined;
  isLoading: boolean;
}

// Mock hooks to simulate your Tanstack Query hooks
const useProducts = (): UseProductsReturn => ({
  data: {
    products: Array.from(
      { length: 1247 },
      (_, i): Product => ({
        id: i + 1,
        name: `Plant ${i + 1}`,
        status: Math.random() > 0.8 ? "out_of_stock" : "active",
        category: [
          "Indoor Plants",
          "Outdoor Plants",
          "Succulents",
          "Planters",
          "Plant Care",
        ][Math.floor(Math.random() * 5)],
        price: Math.floor(Math.random() * 200) + 20,
        sales: Math.floor(Math.random() * 100),
        size: PRODUCT_SIZES[Math.floor(Math.random() * PRODUCT_SIZES.length)],
        tags: [PRODUCT_TAGS[Math.floor(Math.random() * PRODUCT_TAGS.length)]],
      })
    ),
    categories: [
      { name: "Indoor Plants", count: 342, color: "#10b981" },
      { name: "Outdoor Plants", count: 289, color: "#3b82f6" },
      { name: "Succulents", count: 156, color: "#f59e0b" },
      { name: "Planters", count: 234, color: "#ef4444" },
      { name: "Plant Care", count: 226, color: "#8b5cf6" },
    ],
  },
  isLoading: false,
});

const useOrders = (): UseOrdersReturn => ({
  data: {
    orders: Array.from({ length: 3452 }, (_, i): Order => {
      const statuses: OrderStatus[] = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ];
      return {
        id: i + 1,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        total: Math.floor(Math.random() * 300) + 50,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      };
    }),
    recentOrders: Array.from({ length: 5 }, (_, i): Order => {
      const statuses: OrderStatus[] = ["pending", "confirmed", "shipped"];
      return {
        id: i + 1001,
        customerName: `Plant Lover ${i + 1}`,
        total: Math.floor(Math.random() * 200) + 30,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      };
    }),
  },
  isLoading: false,
});

const useUsers = (): UseUsersReturn => ({
  data: {
    users: Array.from(
      { length: 2847 },
      (_, i): User => ({
        id: i + 1,
        name: `Plant Enthusiast ${i + 1}`,
        email: `plant.lover${i + 1}@example.com`,
        status: Math.random() > 0.3 ? "active" : "inactive",
        joinDate: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ),
      })
    ),
  },
  isLoading: false,
});

const useBlogs = (): UseBlogsReturn => ({
  data: {
    blogs: Array.from(
      { length: 89 },
      (_, i): Blog => ({
        id: i + 1,
        title: `Plant Care Guide ${i + 1}`,
        status: Math.random() > 0.2 ? "published" : "draft",
        views: Math.floor(Math.random() * 1000) + 100,
        publishDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      })
    ),
  },
  isLoading: false,
});

const useReviews = (): UseReviewsReturn => ({
  data: {
    reviews: Array.from(
      { length: 456 },
      (_, i): Review => ({
        id: i + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        status: Math.random() > 0.1 ? "approved" : "pending",
        productId: Math.floor(Math.random() * 1247) + 1,
      })
    ),
  },
  isLoading: false,
});

// Generate mock analytics data
const generateAnalyticsData = (): AnalyticsData[] => {
  const last30Days = Array.from({ length: 30 }, (_, i): AnalyticsData => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: Math.floor(Math.random() * 3000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
      visitors: Math.floor(Math.random() * 500) + 100,
    };
  });
  return last30Days;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  loading = false,
  color = "default",
}) => {
  const colorClasses = {
    default: "text-green-600 bg-green-50",
    success: "text-emerald-600 bg-emerald-50",
    warning: "text-yellow-600 bg-yellow-50",
    error: "text-red-600 bg-red-50",
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
              {trend && (
                <div
                  className={`flex items-center gap-1 ${
                    trend.value > 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {trend.value > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {trend.value > 0 ? "+" : ""}
                    {trend.value}%
                  </span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
};

const getOrderStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "destructive";
    case "confirmed":
      return "default";
    case "shipped":
      return "secondary";
    case "delivered":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "#ef4444";
    case "confirmed":
      return "#f59e0b";
    case "shipped":
      return "#3b82f6";
    case "delivered":
      return "#10b981";
    case "cancelled":
      return "#6b7280";
    default:
      return "#3b82f6";
  }
};

export default function DynamicAdminOverview() {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: ordersData, isLoading: ordersLoading } = useOrders();
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const { data: blogsData, isLoading: blogsLoading } = useBlogs();
  const { data: reviewsData, isLoading: reviewsLoading } = useReviews();

  const analyticsData = generateAnalyticsData();

  // Calculate statistics with null safety
  const totalProducts = productsData?.products?.length ?? 0;
  const activeProducts =
    productsData?.products?.filter((p) => p.status === "active").length ?? 0;
  const outOfStockProducts =
    productsData?.products?.filter((p) => p.status === "out_of_stock").length ??
    0;

  const totalOrders = ordersData?.orders?.length ?? 0;
  const pendingOrders =
    ordersData?.orders?.filter((o) => o.status === "pending").length ?? 0;
  const confirmedOrders =
    ordersData?.orders?.filter((o) => o.status === "confirmed").length ?? 0;
  const shippedOrders =
    ordersData?.orders?.filter((o) => o.status === "shipped").length ?? 0;
  const deliveredOrders =
    ordersData?.orders?.filter((o) => o.status === "delivered").length ?? 0;
  const cancelledOrders =
    ordersData?.orders?.filter((o) => o.status === "cancelled").length ?? 0;
  const totalRevenue =
    ordersData?.orders?.reduce((sum, order) => sum + order.total, 0) ?? 0;

  const totalUsers = usersData?.users?.length ?? 0;
  const activeUsers =
    usersData?.users?.filter((u) => u.status === "active").length ?? 0;
  const newUsersThisMonth =
    usersData?.users?.filter((u) => {
      if (!u.joinDate) return false;
      const joinDate = new Date(u.joinDate);
      const now = new Date();
      return (
        joinDate.getMonth() === now.getMonth() &&
        joinDate.getFullYear() === now.getFullYear()
      );
    }).length ?? 0;

  const totalBlogs = blogsData?.blogs?.length ?? 0;
  const publishedBlogs =
    blogsData?.blogs?.filter((b) => b.status === "published").length ?? 0;
  const totalViews =
    blogsData?.blogs?.reduce((sum, blog) => sum + blog.views, 0) ?? 0;

  const totalReviews = reviewsData?.reviews?.length ?? 0;
  const averageRating =
    totalReviews > 0
      ? (reviewsData?.reviews?.reduce(
          (sum, review) => sum + review.rating,
          0
        ) ?? 0) / totalReviews
      : 0;
  const pendingReviews =
    reviewsData?.reviews?.filter((r) => r.status === "pending").length ?? 0;

  // Order status data for pie chart
  const orderStatusData = [
    { name: "Delivered", value: deliveredOrders, color: "#10b981" },
    { name: "Shipped", value: shippedOrders, color: "#3b82f6" },
    { name: "Confirmed", value: confirmedOrders, color: "#f59e0b" },
    { name: "Pending", value: pendingOrders, color: "#ef4444" },
    { name: "Cancelled", value: cancelledOrders, color: "#6b7280" },
  ].filter((item) => item.value > 0);

  const loading =
    productsLoading ||
    ordersLoading ||
    usersLoading ||
    blogsLoading ||
    reviewsLoading;

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-green-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TreePine className="h-8 w-8 text-green-600" />
              Plant Store Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Grow your business with insights into your plant store performance
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-sm font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="All time plant sales"
          icon={DollarSign}
          trend={{ value: 22.4 }}
          loading={loading}
          color="success"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle={`${pendingOrders} pending orders`}
          icon={ShoppingCart}
          trend={{ value: 15.7 }}
          loading={loading}
          color="default"
        />
        <StatCard
          title="Plant Lovers"
          value={activeUsers}
          subtitle={`${newUsersThisMonth} new this month`}
          icon={Users}
          trend={{ value: 18.2 }}
          loading={loading}
          color="success"
        />
        <StatCard
          title="Plants & Products"
          value={totalProducts}
          subtitle={`${outOfStockProducts} out of stock`}
          icon={Sprout}
          trend={{ value: 12.5 }}
          loading={loading}
          color="default"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Analytics */}
        <ChartCard
          title="Plant Sales Analytics (Last 30 Days)"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Revenue",
                ]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Order Status Distribution */}
        <ChartCard title="Order Status Distribution" loading={loading}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }: PieLabelRenderProps) =>
                  `${name} ${((percent as number) * 100).toFixed(0)}%`
                }
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Plant Care Guides"
          value={publishedBlogs}
          subtitle={`${totalViews.toLocaleString()} total views`}
          icon={Eye}
          loading={loading}
          color="default"
        />
        <StatCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          subtitle={`${totalReviews} customer reviews`}
          icon={Star}
          loading={loading}
          color="success"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReviews}
          subtitle="Awaiting approval"
          icon={MessageSquare}
          loading={loading}
          color="warning"
        />
        <StatCard
          title="Processing Orders"
          value={confirmedOrders + shippedOrders}
          subtitle="Being fulfilled"
          icon={Clock}
          loading={loading}
          color="warning"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <ChartCard title="Product Categories" loading={loading}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsData?.categories ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Recent Plant Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {ordersData?.recentOrders?.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Home className="h-4 w-4 text-green-600" />
                        <p className="font-medium">Order #{order.id}</p>
                        <Badge
                          variant={getOrderStatusBadgeVariant(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.customerName ?? `Customer #${order.id}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-700">
                        ${order.total}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Sales Target</span>
                <span className="text-green-700 font-medium">78%</span>
              </div>
              <Progress value={78} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="text-green-700 font-medium">
                  {Math.round(averageRating * 18.4)}%
                </span>
              </div>
              <Progress
                value={Math.round(averageRating * 18.4)}
                className="h-3"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Plant Inventory Health</span>
                <span className="text-green-700 font-medium">
                  {totalProducts > 0
                    ? Math.round(
                        ((totalProducts - outOfStockProducts) / totalProducts) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <Progress
                value={
                  totalProducts > 0
                    ? Math.round(
                        ((totalProducts - outOfStockProducts) / totalProducts) *
                          100
                      )
                    : 0
                }
                className="h-3"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Order Fulfillment</span>
                <span className="text-green-700 font-medium">94%</span>
              </div>
              <Progress value={94} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Package className="h-4 w-4" />
                Add Plant
              </button>
              <button className="p-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Process Orders
              </button>
              <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" />
                Plant Care Guide
              </button>
              <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Star className="h-4 w-4" />
                View Analytics
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
