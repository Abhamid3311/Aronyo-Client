// app/privacy-policy/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 bg-green-600 flex items-center justify-center text-white">
        <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <CardContent className="space-y-6 p-8">
            <p className="text-gray-700 leading-relaxed">
              We value your privacy. This policy outlines how we collect, use,
              and protect your personal information...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Information Collection:</strong> We collect personal
              information when you register on our site, place an order, or
              subscribe to our newsletter...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Data Usage:</strong> Your information is used to process
              transactions, improve customer service, and send periodic
              emails...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Data Protection:</strong> We implement a variety of
              security measures to maintain the safety of your personal
              information...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
