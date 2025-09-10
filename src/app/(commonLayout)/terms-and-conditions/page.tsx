// app/terms-and-conditions/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 bg-blue-600 flex items-center justify-center text-white">
        <h1 className="text-4xl font-extrabold">Terms and Conditions</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <CardContent className="space-y-6 p-8">
            <p className="text-gray-700 leading-relaxed">
              Welcome to our online store. By accessing or using our website,
              you agree to comply with and be bound by the following terms and
              conditions...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Shipping Policy:</strong> We offer worldwide shipping.
              Delivery times vary based on location...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Returns and Refunds:</strong> Returns are accepted within
              30 days of purchase. Please ensure items are in original
              condition...
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Privacy Policy:</strong> We respect your privacy. Your
              personal information is protected and will not be shared with
              third parties without your consent...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
