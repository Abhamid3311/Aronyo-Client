/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  FileText,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Star,
  Calendar,
  Activity,
  BarChart3,
  UserPlus,
} from "lucide-react";

// Static data - will be replaced with dynamic data later
const overviewData = {
  products: {
    total: 1247,
    active: 1156,
    outOfStock: 23,
    trending: 68,
    growth: 12.5,
  },
  blogs: {
    total: 89,
    published: 82,
    draft: 7,
    views: 15420,
    growth: 8.3,
  },
  orders: {
    total: 3452,
    pending: 42,
    processing: 18,
    shipped: 156,
    delivered: 3236,
    growth: 15.7,
  },
  revenue: {
    total: 87650,
    thisMonth: 12450,
    growth: 22.4,
  },
  users: {
    total: 2847,
    active: 1923,
    new: 127,
    growth: 18.2,
  },
  analytics: {
    pageViews: 45230,
    sessions: 12847,
    bounceRate: 32.5,
    avgSessionTime: "3:42",
  },
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = "default",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  trend?: number;
  trendLabel?: string;
  color?: "default" | "success" | "warning" | "error";
}) => {
  const colorClasses = {
    default: "text-blue-600 bg-blue-50",
    success: "text-green-600 bg-green-50",
    warning: "text-yellow-600 bg-yellow-50",
    error: "text-red-600 bg-red-50",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
              {trend && (
                <div
                  className={`flex items-center gap-1 ${
                    trend > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">
                    {trend > 0 ? "+" : ""}
                    {trend}%
                  </span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trendLabel && (
              <p className="text-xs text-muted-foreground mt-1">{trendLabel}</p>
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

const QuickStatsCard = ({
  title,
  stats,
  icon: Icon,
}: {
  title: string;
  stats: { label: string; value: number; color?: string }[];
  icon: any;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    stat.color || "bg-blue-500"
                  }`}
                />
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <span className="text-sm font-medium">
                {stat.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function OverviewPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your business
            today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={overviewData.products.total}
          subtitle={`${overviewData.products.active} active products`}
          icon={Package}
          trend={overviewData.products.growth}
          trendLabel="vs last month"
          color="default"
        />

        <StatCard
          title="Blog Posts"
          value={overviewData.blogs.total}
          subtitle={`${overviewData.blogs.views.toLocaleString()} total views`}
          icon={FileText}
          trend={overviewData.blogs.growth}
          trendLabel="vs last month"
          color="success"
        />

        <StatCard
          title="Total Orders"
          value={overviewData.orders.total}
          subtitle={`${overviewData.orders.pending} in progress`}
          icon={ShoppingCart}
          trend={overviewData.orders.growth}
          trendLabel="vs last month"
          color="warning"
        />

        <StatCard
          title="Total Revenue"
          value={`$${overviewData.revenue.total.toLocaleString()}`}
          subtitle={`$${overviewData.revenue.thisMonth.toLocaleString()} this month`}
          icon={DollarSign}
          trend={overviewData.revenue.growth}
          trendLabel="vs last month"
          color="success"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={overviewData.users.total}
          subtitle={`${overviewData.users.active} active users`}
          icon={Users}
          trend={overviewData.users.growth}
          color="default"
        />

        <StatCard
          title="Page Views"
          value={overviewData.analytics.pageViews}
          subtitle={`${overviewData.analytics.sessions.toLocaleString()} sessions`}
          icon={Eye}
          color="default"
        />

        <StatCard
          title="Avg Session Time"
          value={overviewData.analytics.avgSessionTime}
          subtitle={`${overviewData.analytics.bounceRate}% bounce rate`}
          icon={Clock}
          color="success"
        />

        <StatCard
          title="New Customers"
          value={overviewData.users.new}
          subtitle="This month"
          icon={UserPlus}
          color="success"
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickStatsCard
          title="Product Status"
          icon={Package}
          stats={[
            {
              label: "Active Products",
              value: overviewData.products.active,
              color: "bg-green-500",
            },
            {
              label: "Out of Stock",
              value: overviewData.products.outOfStock,
              color: "bg-red-500",
            },
            {
              label: "Trending Products",
              value: overviewData.products.trending,
              color: "bg-blue-500",
            },
          ]}
        />

        <QuickStatsCard
          title="Order Status"
          icon={ShoppingCart}
          stats={[
            {
              label: "Pending",
              value: overviewData.orders.pending,
              color: "bg-yellow-500",
            },
            {
              label: "Processing",
              value: overviewData.orders.processing,
              color: "bg-blue-500",
            },
            {
              label: "Shipped",
              value: overviewData.orders.shipped,
              color: "bg-purple-500",
            },
            {
              label: "Delivered",
              value: overviewData.orders.delivered,
              color: "bg-green-500",
            },
          ]}
        />

        <QuickStatsCard
          title="Content Status"
          icon={FileText}
          stats={[
            {
              label: "Published Blogs",
              value: overviewData.blogs.published,
              color: "bg-green-500",
            },
            {
              label: "Draft Blogs",
              value: overviewData.blogs.draft,
              color: "bg-yellow-500",
            },
            {
              label: "Total Views",
              value: overviewData.blogs.views,
              color: "bg-blue-500",
            },
          ]}
        />
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <Badge variant="secondary">+1</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Product added to inventory
                  </p>
                  <p className="text-xs text-muted-foreground">
                    15 minutes ago
                  </p>
                </div>
                <Badge variant="secondary">+5</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Blog post published</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User registration</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
                <Badge variant="secondary">+12</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sales Target</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Customer Satisfaction
                  </span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Inventory Turnover
                  </span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Order Fulfillment</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
