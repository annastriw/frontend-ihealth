"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        {mounted && <Toaster />}
      </SessionProvider>
    </>
  );
}
