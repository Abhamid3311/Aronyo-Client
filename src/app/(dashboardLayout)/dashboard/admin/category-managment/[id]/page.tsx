"use client";

import ProductDetailsSkeleton from "@/components/Modules/skeletons/ProductDetailsSkeleton";
import { useSingleCategory } from "@/hooks/useProducts";
import Image from "next/image";
import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  UserIcon,
  HashIcon,
  LinkIcon,
  FileTextIcon,
  MailIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: category, isLoading, error } = useSingleCategory(id);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Category Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The category you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground">Category Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Category Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                General category details and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HashIcon className="h-4 w-4" />
                    Category ID
                  </div>
                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {category._id}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LinkIcon className="h-4 w-4" />
                    URL Slug
                  </div>
                  <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    /{category.slug}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  Description
                </div>
                <p className="text-sm leading-relaxed p-3 bg-muted/50 rounded-lg">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={category.isActive ? "default" : "destructive"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Creator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Creator Information
              </CardTitle>
              <CardDescription>
                Details about who created this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">
                      {typeof category.createdBy === "object"
                        ? category.createdBy?.name
                        : category.createdBy}
                    </h4>
                  </div>
                  {typeof category.createdBy === "object" && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MailIcon className="h-4 w-4" />
                      {category.createdBy.email}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Metadata
              </CardTitle>
              <CardDescription>
                Timestamps and additional information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created on:</span>
                <span className="font-medium">
                  {formatDate(category.createdAt!)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
