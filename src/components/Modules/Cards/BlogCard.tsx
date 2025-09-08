"use client";

import { BlogsProps, IBlog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogCard: React.FC<BlogsProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadingTime = (content?: string) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getAuthorInitials = (name?: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-xl">
      {/* Blog Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Date Badge */}
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/95 transition-colors"
        >
          <CalendarIcon className="h-3 w-3 mr-1" />
          {formatDate(blog.createdAt)}
        </Badge>

        {/* Reading Time Badge */}
        <Badge
          variant="outline"
          className="absolute top-3 right-3 bg-white/90 text-foreground backdrop-blur-sm border-white/50"
        >
          <ClockIcon className="h-3 w-3 mr-1" />
          {getReadingTime(blog.description)}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
              <Link
                href={`/blog/${blog._id}`}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              >
                {blog.title}
              </Link>
            </CardTitle>

            {blog.category && (
              <Badge variant="outline" className="mt-2 text-xs">
                {blog.category}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed line-clamp-3 mb-4">
          {blog.subTitle}
        </CardDescription>

        {/* Author Info & CTA */}
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={blog.createdBy?.image}
                alt={blog.createdBy?.name || "Author"}
              />
              <AvatarFallback className="text-xs bg-muted">
                {getAuthorInitials(blog.createdBy?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {blog.createdBy?.name || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>

          {/* Read More Button */}
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 p-2"
            asChild
          >
            <Link href={`/blog/${blog._id}`}>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{blog.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 rounded-lg transition-colors duration-300 pointer-events-none" />
    </Card>
  );
};

export default BlogCard;
