"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { successAlert, errorAlert } from "@/lib/alert";
import { useUpdateProfile } from "@/hooks/useUsers";
import { IUser } from "@/lib/types";
import { useAuth } from "@/Context/AuthContext";

// ✅ Validation Schema
const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  status: z.enum(["active", "inactive", "banned"]),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function UpdateProfileForm({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: IUser | null;
}) {
  const { setUser } = useAuth();
  const updateMutation = useUpdateProfile();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      image: "",
      status: "active",
    },
  });

  // Pre-fill when user changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        image: user.image || "",
        status: user.status || "active",
      });
    }
  }, [user, form]);

  const handleSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    if (!user?._id) return;

    updateMutation.mutate(
      { ...data }, // pass fields directly
      {
        onSuccess: () => {
          successAlert("✅ Profile Updated Successfully!");
          setOpen(false);
          setUser((prev) => (prev ? { ...prev, ...data } : prev)); // update context
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          errorAlert(err?.message || "❌ Failed to update profile!");
        },
      }
    );
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primaryGreen text-2xl font-semibold">
            Update Profile
          </DialogTitle>
          <DialogDescription>
            Update your profile details and status.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  {field.value && (
                    <div className="relative w-40 h-40 mt-2 border rounded-lg overflow-hidden">
                      <Image
                        src={field.value}
                        alt={form.getValues("name") || "User Image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Toggle */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-3 border rounded-md">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === "active"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "active" : "inactive")
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            {/* Submit */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Updating...
                  </>
                ) : (
                  <>Update Profile</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
