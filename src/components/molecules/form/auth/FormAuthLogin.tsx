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

export default function FormAuthLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
    mode: "onChange",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (body: LoginType) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...body, redirect: false });
    setIsLoading(false);

    if (!res || res.error) {
      toast.error("Login Gagal", {
        description:
          res?.error === "CredentialsSignin"
            ? "Email atau password salah."
            : "An error occurred, please try again.",
      });
      return;
    }

    toast.success("Login Berhasil", {
      description: "Anda akan diarahkan menuju halaman dashboard",
    });

    router.push(callbackUrl);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full border-0 shadow-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Masuk
          </CardTitle>
          <CardDescription>
            Selamat Datang! Masukkan email dan password anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email / Username / Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          id="password"
                          placeholder="Masukkan password"
                          {...field}
                          className="pr-10"
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
              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Masuk"}{" "}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-6 space-y-4 text-center">
            <div className="text-center text-sm">
              Belum punya akun? {""}
              <Link
                href="/register"
                className="text-primary underline underline-offset-4"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
