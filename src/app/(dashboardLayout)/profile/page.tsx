"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/Context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user?.name}!</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>User ID:</strong> {user?._id}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* import React from "react";

const MyProfile = () => {
  return (
    <div>
      <h1>My Profile</h1>
    </div>
  );
};

export default MyProfile; */
