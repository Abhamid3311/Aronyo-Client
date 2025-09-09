import { notFound } from "next/navigation";
import BlogDetails from "@/components/blogs/BlogDetails";
import { getBlogById } from "@/lib/services/Products/publicApi";

interface BlogDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { id } = await params;

  try {
    const blog = await getBlogById(id);

    if (!blog) return notFound();

    return <BlogDetails blog={blog} />;
  } catch (err) {
    console.error("Error loading blog:", err);
    return notFound();
  }
}
