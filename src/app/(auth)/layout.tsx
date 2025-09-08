import { GuestGuard } from "@/components/auth/GuestGuard";
import Navbar from "@/components/layouts/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GuestGuard>
        <Navbar />
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
          {children}
        </div>
      </GuestGuard>
      ;
    </div>
  );
}
