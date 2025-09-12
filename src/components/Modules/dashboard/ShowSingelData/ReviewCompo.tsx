/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

interface ReviewFormValues {
  comment: string;
  rating: number;
}

export default function ReviewSection({
  orderId,
  isDelivered,
  isReviewed,
}: ReviewSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const { mutate: addReview, isPending: isAdding } = useCreateReview();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: { comment: "", rating: 0 },
  });

  const rating = watch("rating");

  const onSubmit = (data: ReviewFormValues) => {
    if (data.rating === 0) {
      errorAlert("Please select a rating before saving.");
      return;
    }

    const payload = { orderId, comment: data.comment, rating: data.rating };

    addReview(payload, {
      onSuccess: () => {
        successAlert("Review submitted successfully!");
        setSubmitted(true);
        reset();
      },
      onError: (err: any) => {
        console.log(err);
        errorAlert(err?.message || "Failed to submit review.");
      },
    });
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Rating */}
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        (rating || 0) >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              )}
            />

            {/* Review Textarea */}
            <Controller
              name="comment"
              control={control}
              rules={{ required: "Please write a review before submitting." }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Write your review here..."
                  className="min-h-[100px]"
                />
              )}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isAdding}>
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
          </form>
        )}
      </CardContent>
    </Card>
  );
}
