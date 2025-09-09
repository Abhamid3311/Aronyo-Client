"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon?: React.ElementType;
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.url;

        return (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "flex items-center gap-2  px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primaryGreen text-white"
                : "text-gray-700 hover:bg-green-100 hover:text-green-700"
            )}
          >
            {Icon && <Icon className="h-6 w-6 shrink-0" />}{" "}
            <span className="flex-1 truncate">{item.title}</span>{" "}
          </Link>
        );
      })}
    </nav>
  );
}
