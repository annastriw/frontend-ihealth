"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, PropsWithChildren } from "react";

export default function AdminAuthGuard({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
