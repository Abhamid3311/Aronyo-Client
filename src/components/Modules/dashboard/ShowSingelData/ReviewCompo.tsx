/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Edit, Save, Package, Cross } from "lucide-react";
import { errorAlert, successAlert } from "@/lib/alert";
import { useCreateReview, useUpdateReview } from "@/hooks/useOrders";

interface ReviewSectionProps {
  orderItems: any[];
  orderId: string;
  isDelivered: boolean;
  isUser: boolean;
  existingReview?: any; // Single existing review for the entire order
}

interface ReviewData {
  orderId: string;
  rating: number;
  comment?: string;
}

export default function ReviewSection({
  orderItems,
  orderId,
  isDelivered,
  isUser,
  existingReview,
}: ReviewSectionProps) {
  const { mutate: addReview, isPending: isAddingReview } = useCreateReview();
  const { mutate: editReview, isPending: isEditingReview } = useUpdateReview();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [savedReview, setSavedReview] = useState<any>(existingReview);

  // Initialize review state
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || "");
      setSavedReview(existingReview);
    } else {
      setRating(5);
      setComment("");
    }
  }, [existingReview]);

  // Don't render if conditions aren't met
  if (!isDelivered || !isUser) {
    return null;
  }

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleSubmitReview = () => {
    if (!rating) {
      errorAlert("Please select a rating");
      return;
    }

    const reviewPayload: ReviewData = {
      orderId,
      rating,
      comment: comment || undefined,
    };

    if (savedReview) {
      // Edit existing review
      editReview(
        {
          reviewId: savedReview._id,
          data: reviewPayload,
        },
        {
          onSuccess: (updatedReview: any) => {
            setSavedReview(updatedReview);
            setIsEditing(false);
            successAlert("Review updated successfully!");
          },
          onError: (error: any) => {
            errorAlert(error?.message || "Failed to update review");
            console.error("Failed to update review:", error);
          },
        }
      );
    } else {
      // Add new review
      addReview(reviewPayload, {
        onSuccess: (newReview: any) => {
          setSavedReview(newReview);
          setIsEditing(false);
          successAlert("Review submitted successfully!");
        },
        onError: (error: any) => {
          errorAlert(error?.message || "Failed to submit review");
          console.error("Failed to add review:", error);
        },
      });
    }
  };

  const handleEditReview = () => {
    setRating(savedReview.rating);
    setComment(savedReview.comment || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setRating(savedReview?.rating || 5);
    setComment(savedReview?.comment || "");
    setIsEditing(false);
  };

  const renderStarRating = (
    currentRating: number,
    interactive: boolean = true
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && handleStarClick(star)}
            className={`${
              star <= currentRating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${
              interactive
                ? "hover:text-yellow-400 hover:scale-110 cursor-pointer transition-all duration-200"
                : ""
            }`}
          >
            <Star className="w-5 h-5" />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          ({currentRating}/5)
        </span>
      </div>
    );
  };

  const hasExistingReview = !!savedReview;
  const showForm = !hasExistingReview || isEditing;

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-green-500">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Order Review</h3>
            <p className="text-sm text-gray-600 font-normal">
              Share your overall experience with this order
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Items Summary */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-gray-800">
              Items in this order ({orderItems.length}{" "}
              {orderItems.length === 1 ? "item" : "items"})
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {orderItems.map((item: any, index: number) => (
              <div key={item._id || index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden bg-white border border-gray-200">
                  <img
                    src={item.product.images?.[0] || "/placeholder-image.png"}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="text-xs text-gray-600 truncate"
                  title={item.product.title}
                >
                  {item.product.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Review Display */}
        {hasExistingReview && !isEditing && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 space-y-3 border border-green-100">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  Your Review
                </p>
                {renderStarRating(savedReview.rating, false)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditReview}
                className="hover:bg-blue-50 border-blue-200"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </div>
            {savedReview.comment && (
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-700 italic">
                  &quot;{savedReview.comment}&quot;
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500">
              Reviewed on{" "}
              {new Date(
                savedReview.createdAt || Date.now()
              ).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="space-y-4 bg-gray-50 rounded-xl p-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-3">
                {hasExistingReview
                  ? "Update your rating"
                  : "Rate your overall experience"}
              </label>
              {renderStarRating(rating, true)}
              <p className="text-xs text-gray-500 mt-2">
                Click on the stars to rate your experience with this order
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Share your experience (Optional)
              </label>
              <Textarea
                placeholder="Tell us about your experience with this order - delivery, product quality, packaging, etc..."
                value={comment}
                onChange={(e) => handleCommentChange(e.target.value)}
                className="min-h-28 resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                maxLength={1000}
              />
              <p className="text-xs text-gray-400 mt-1">
                {comment.length}/1000 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmitReview}
                disabled={isAddingReview || isEditingReview}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="sm"
              >
                {isAddingReview || isEditingReview ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {hasExistingReview ? "Updating..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {hasExistingReview ? "Update Review" : "Submit Review"}
                  </>
                )}
              </Button>

              {hasExistingReview && isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Cross className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Help Text */}
        {!hasExistingReview && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> Your review helps other customers and
              helps us improve our service. You can edit your review anytime
              after submitting.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
