import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  ArrowLeft,
  UserIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import { IBlog } from "@/lib/types";
import { Metadata } from "next";
import {
  getBlogById,
  getBlogsWithFilters,
} from "@/lib/services/Products/publicApi";

// Generate static paths for SSG
export async function generateStaticParams() {
  try {
    const blogsResponse = await getBlogsWithFilters();
    const blogs = blogsResponse.data || blogsResponse;

    return blogs.map((blog: IBlog) => ({
      id: blog._id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${blog.title} | Aronyo Blog`,
      description: blog.subTitle || blog.description,
      keywords: blog.tags?.join(", "),
      authors: [{ name: blog.createdBy?.name || "Anonymous" }],
      openGraph: {
        title: blog.title,
        description: blog.subTitle || blog.description,
        images: [
          {
            url: blog.image,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.createdBy?.name || "Anonymous"],
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.subTitle || blog.description,
        images: [blog.image],
      },
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

interface BlogDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  try {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
      notFound();
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
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
      <article className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-6 z-10">
            <Button
              variant="secondary"
              size="sm"
              className="backdrop-blur-sm bg-white/90 hover:bg-white"
              asChild
            >
              <Link href="/blogs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.category && (
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    {blog.category}
                  </Badge>
                )}
                {blog.tags?.slice(0, 3).map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-white/90 text-foreground border-white/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>

              {blog.subTitle && (
                <p className="text-lg lg:text-xl text-white/90 mb-6 leading-relaxed">
                  {blog.subTitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Meta */}
          <Card className="my-8 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={blog.createdBy?.image}
                      alt={blog.createdBy?.name || "Author"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getAuthorInitials(blog.createdBy?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {blog.createdBy?.name || "Anonymous"}
                      </p>
                      {blog.createdBy?.isVerified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {getReadingTime(blog.description)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="mb-8 border-0 shadow">
            <CardContent className="p-8 lg:p-10">
              <div className="prose prose-lg max-w-none">
                {blog.description && (
                  <div
                    className="text-base leading-relaxed text-foreground prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                )}
              </div>

              <Separator className="my-8" />

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <TagIcon className="h-4 w-4" />
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Author Bio Card */}
          {blog.createdBy && (
            <Card className="mb-8 border-0 shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  About the Author
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={blog.createdBy.image}
                      alt={blog.createdBy.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getAuthorInitials(blog.createdBy.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {blog.createdBy.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {blog.createdBy.bio ||
                        "An experienced writer passionate about sharing knowledge and insights with the community."}
                    </p>
                    {blog.createdBy.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        asChild
                      >
                        <Link href={`mailto:${blog.createdBy.email}`}>
                          Contact Author
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Posts Section */}
          <Card className="mb-8 border-0 ">
            <CardHeader>
              <CardTitle>Continue Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1 bg-primaryGreen text-white"
                  asChild
                >
                  <Link href="/blogs">View All Blog Posts</Link>
                </Button>
                {blog.category && (
                  <Button variant="outline" className="flex-1" asChild>
                    <Link
                      href={`/blogs?category=${encodeURIComponent(
                        blog.category
                      )}`}
                    >
                      More in {blog.category}
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error loading blog:", error);
    notFound();
  }
}
