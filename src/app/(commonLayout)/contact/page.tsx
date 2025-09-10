// app/contact/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-64 bg-purple-600 flex items-center justify-center text-white">
        <h1 className="text-4xl font-extrabold">Contact Us</h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-xl mx-auto shadow-lg rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center mb-4">
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
