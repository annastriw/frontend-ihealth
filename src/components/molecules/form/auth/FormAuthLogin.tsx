"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginType, loginSchema } from "@/validators/auth/login-validator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function FormAuthLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const onSubmit = async (body: LoginType) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      ...body,
      redirect: false,
    });
    setIsLoading(false);

    if (!res || res.error) {
      toast.error("Login Gagal", {
        description: res?.error ?? "Terjadi kesalahan, silakan coba lagi.",
      });
      return;
    }

    toast.success("Login Berhasil", {
      description: "Anda akan diarahkan menuju halaman dashboard",
    });

    router.push(callbackUrl);
  };

  return (
    <Card className="w-full border-0 shadow-none dark:bg-transparent">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-black">
          Masuk
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Selamat datang! Masukkan email dan password Anda.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Input Login */}
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username / Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Password dengan toggle visibility */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tombol Masuk dengan animasi scale */}
            <motion.button
              type="submit"
              className="bg-primary w-full rounded-md px-4 py-2 text-sm font-medium text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Masuk"}
            </motion.button>
          </form>
        </Form>

        {/* Link Daftar Sekarang dengan animasi scale */}
        <div className="mt-6 text-center text-sm">
          Belum punya akun?{" "}
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/register"
              className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </motion.span>
        </div>
      </CardContent>
    </Card>
  );
}
