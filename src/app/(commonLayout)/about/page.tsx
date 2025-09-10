// app/about/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 bg-indigo-600 flex items-center justify-center text-white">
        <h1 className="text-4xl font-extrabold">About Us</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <CardContent className="space-y-6 p-8">
            <p className="text-gray-700 leading-relaxed">
              We are a passionate team dedicated to providing the best online
              shopping experience. Our mission is to offer high-quality products
              at affordable prices...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Our Story:</strong> Founded in 2020, we started with a
              vision to revolutionize the e-commerce industry by focusing on
              customer satisfaction and product quality...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Our Values:</strong> Integrity, Innovation, and
              Customer-Centricity are at the core of our operations...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
