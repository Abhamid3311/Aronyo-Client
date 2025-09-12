/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Save, Star } from "lucide-react";
import { errorAlert, successAlert } from "@/lib/alert";
import { useCreateReview } from "@/hooks/useOrders";

interface ReviewSectionProps {
  orderId: string;
  isDelivered: boolean;
  isReviewed?: boolean;
}

export default function ReviewSection({
  orderId,
  isDelivered,
  isReviewed,
}: ReviewSectionProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { mutate: addReview, isPending: isAdding } = useCreateReview();

  // --- useCallback for handleSave ---
  const handleSave = useCallback(() => {
    if (!review.trim()) {
      errorAlert("Please write a review before saving.");
      return;
    }
    if (rating === 0) {
      errorAlert("Please select a rating before saving.");
      return;
    }

    const payload = { orderId, comment: review, rating };

    addReview(payload, {
      onSuccess: () => {
        successAlert("Review submitted successfully!");
        setSubmitted(true);
      },
      onError: (err: any) => {
        errorAlert(err?.message || "Failed to submit review.");
      },
    });
  }, [review, rating, orderId, addReview]);

  if (!isDelivered) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle />
          Product Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isReviewed || submitted ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-md">
            🎉 Thanks for your review & rating!
          </div>
        ) : (
          <div className="space-y-4">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Review Input */}
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="min-h-[100px]"
            />

            {/* Save Button */}
            <Button onClick={handleSave} disabled={isAdding}>
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
