import Navbar from "@/components/layouts/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50">
        {children}
      </div>
      ;
    </div>
  );
}
