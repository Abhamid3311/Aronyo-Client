"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateReviewStatus } from "@/hooks/useOrders";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { successAlert, errorAlert } from "@/lib/alert";
import { IReview } from "@/lib/types";
import {
  Star,
  User,
  MessageSquare,
  Calendar,
  Package,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ReviewViewDialogProps {
  review: IReview;
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch: () => void;
}

export default function ReviewViewDialog({
  review,
  open,
  setOpen,
  refetch,
}: ReviewViewDialogProps) {
  const updateStatusMutation = useUpdateReviewStatus();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (review) setIsActive(review.isActive);
  }, [review]);

  const handleToggle = () => {
    if (!review) return;
    updateStatusMutation.mutate(
      { reviewId: review._id, isActive: !isActive },
      {
        onSuccess: () => {
          successAlert("Status updated!");
          setIsActive(!isActive);
          refetch();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) =>
          errorAlert(err?.message || "Failed to update status"),
      }
    );
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          ({rating}/5)
        </span>
      </div>
    );
  };

  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-green-500">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Customer Review
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Manage and view detailed review information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3">
          {/* Customer Info Card */}
          <Card className="border border-gray-100">
            <CardContent className="">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-gray-700 font-semibold">
                    {review.userId?.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {review.userId?.name || "Unknown User"}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {review.userId?.email || "No email provided"}
                    </p>

                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Package className="w-4 h-4" />
                      Order ID: {review.orderId || "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(
                        review.createdAt || Date.now()
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Content */}
          <Card className="border border-gray-100">
            <CardContent className="pt-3">
              <div className="space-y-4">
                {/* Rating Section */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Customer Rating
                  </h4>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-100">
                    {renderStarRating(review.rating)}
                  </div>
                </div>

                {/* Comment Section */}
                {review.comment && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      Customer Feedback
                    </h4>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-gray-700 italic leading-relaxed">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  </div>
                )}

                {!review.comment && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-gray-500 text-sm italic text-center">
                      No written feedback provided
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card className="border border-gray-100">
            <CardContent className="pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      isActive ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Review Visibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isActive
                        ? "This review is visible to customers"
                        : "This review is hidden from customers"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={`${
                      isActive
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Hidden
                      </>
                    )}
                  </Badge>
                  <Switch
                    checked={isActive}
                    onCheckedChange={handleToggle}
                    disabled={updateStatusMutation.isPending}
                  />
                </div>
              </div>

              {updateStatusMutation.isPending && (
                <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Updating status...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-2" />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="min-w-20"
          >
            Close
          </Button>

          <Button
            onClick={handleToggle}
            disabled={updateStatusMutation.isPending}
            className={`min-w-28 ${
              isActive
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {updateStatusMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                {isActive ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Review
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Review
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
