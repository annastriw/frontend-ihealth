"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/http/auth/change-password";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/validators/auth/change-password-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormChangePassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
  });

  const { mutate: changePasswordHandler, isPending } = useChangePassword({
    onError: () => {
      toast.error("Gagal mengganti password baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengganti password baru!");
      router.refresh();
    },
  });

  const onSubmit = (body: ChangePasswordType) => {
    changePasswordHandler({ ...body });
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Current Password */}
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password Lama <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword.current ? "text" : "password"}
                      placeholder="Masukkan password lama"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() => togglePassword("current")}
                      tabIndex={-1}
                    >
                      {showPassword.current ? (
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

          {/* New Password */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password Baru <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword.new ? "text" : "password"}
                      placeholder="Masukkan password baru"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() => togglePassword("new")}
                      tabIndex={-1}
                    >
                      {showPassword.new ? (
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

          {/* Confirm New Password */}
          <FormField
            control={form.control}
            name="new_password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Konfirmasi Password Baru{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword.confirm ? "text" : "password"}
                      placeholder="Masukkan konfirmasi password baru"
                      {...field}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={() => togglePassword("confirm")}
                      tabIndex={-1}
                    >
                      {showPassword.confirm ? (
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

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
