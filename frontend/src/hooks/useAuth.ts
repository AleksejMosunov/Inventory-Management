"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = ["/login", "/register"];

export const useAuth = (): void => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const safePathname = pathname || "";

    if (!token && !PUBLIC_ROUTES.includes(safePathname)) {
      router.replace("/login");
    }

    if (token && PUBLIC_ROUTES.includes(safePathname)) {
      router.replace("/orders");
    }
  }, [pathname, router]);
};
