"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/Context/AuthContext";
import {
  Edit,
  Key,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  LogOut,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UpdatePassword from "@/components/Modules/dashboard/AddForms/UpdatePasswordForm";

export default function UserProfilePage() {
  const { user, logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Helper function to get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "banned":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Helper function to get role badge variant
  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "staff":
        return "secondary";
      case "user":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page or open modal
    console.log("Edit profile clicked");
  };

  const handleChangePassword = () => {
    // Navigate to change password page or open modal
    console.log("Change password clicked");
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6 w-full">
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p>No user data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="  p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-base">
                    {user.email}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant={getRoleVariant(user.role!)}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      variant={getStatusVariant(user.status!)}
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Basic Information</h3>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone Number
                      </p>
                      <p className="font-medium">{user.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{user.address || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Account Information</h3>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Member Since
                      </p>
                      <p className="font-medium">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-medium font-mono text-sm">
                        {user._id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium capitalize">{user.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 flex items-center justify-center">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          user.status === "active"
                            ? "bg-green-500"
                            : user.status === "inactive"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{user.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons Card */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleEditProfile}
                className="w-full justify-start"
                variant="outline"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

              <Button
                onClick={() => setIsDialogOpen(true)}
                className="w-full justify-start"
                variant="outline"
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>

              <Link href={"/"}>
                <Button className="w-full justify-start" variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Back To Home
                </Button>
              </Link>

              <Separator />

              <Button
                onClick={logout}
                className="w-full justify-start"
                variant="destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Account Type
                </span>
                <Badge
                  variant={getRoleVariant(user.role!)}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={getStatusVariant(user.status!)}
                  className="capitalize"
                >
                  {user.status}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Profile Complete
                </span>
                <span className="text-sm font-medium">
                  {user.phone && user.address && user.image
                    ? "100%"
                    : (user.phone && user.address) || user.image
                    ? "85%"
                    : user.phone || user.address
                    ? "70%"
                    : "50%"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <UpdatePassword
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
