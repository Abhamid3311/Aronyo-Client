"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useUpdatePassword } from "@/hooks/useUsers";
import { successAlert, errorAlert } from "@/lib/alert";

interface UpdatePasswordProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdatePassword({ open, onClose }: UpdatePasswordProps) {
  const updatePassword = useUpdatePassword();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      errorAlert("New password and confirm password need to be same!");
      return;
    }

    updatePassword.mutate(
      {
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          successAlert("Password updated successfully!");
          setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          onClose();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          errorAlert(err?.message || "Failed to update password");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your old password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Toggle Password Visibility */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPassword(!showPassword)}
            className="w-full flex items-center gap-2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updatePassword.isPending}>
            {updatePassword.isPending ? "Updating..." : "Update Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
