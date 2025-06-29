"use client";
import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: PropsWithChildren) => {
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

  return <div className="min-h-full w-full">{children}</div>;
};

export default AdminLayout;
