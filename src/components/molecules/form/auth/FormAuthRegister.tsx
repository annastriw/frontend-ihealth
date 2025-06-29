"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
import { useRouter } from "next/navigation";
import {
  registerSchema,
  RegisterType,
} from "@/validators/auth/register-validator";
import { useRegister } from "@/http/auth/register";
import { toast } from "sonner";
import { useState } from "react";
import DialogAgreementRegister from "@/components/atoms/dialog/DialogAgreementRegister";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormAuthRegister() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      disease_type: "",
    },
    mode: "onChange",
  });
  const [isDialogAgreementOpen, setIsDialogAgreementOpen] = useState(false);
  const [formData, setFormData] = useState<RegisterType | null>(null);

  const router = useRouter();

  const errorMessages: Record<string, string> = {
    email: "Email sudah digunakan.",
    username: "Username sudah digunakan.",
    phone_number: "Nomor telepon sudah digunakan.",
  };

  const [showPassword, setShowPassword] = useState({
    main: false,
    confirm: false,
  });

  const togglePassword = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { mutate: registerRequestHandler, isPending } = useRegister({
    onError: (error) => {
      const errors = error.response?.data?.errors;
      if (errors && typeof errors === "object") {
        Object.entries(errors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            const translatedMessage = errorMessages[key] || value[0];
            form.setError(key as keyof RegisterType, {
              type: "manual",
              message: translatedMessage,
            });
          }
        });
      } else {
        toast.error("Pendaftaran Gagal", {
          description: "Terjadi kesalahan, silakan periksa kembali data Anda.",
        });
      }
    },
    onSuccess: async () => {
      const res = await signIn("credentials", {
        login: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });

      if (!res || res.error) {
        toast.error("Login Failed", {
          description: "An error occurred, please try again.",
        });
        return;
      }

      toast.success("Berhasil Mendaftar", {
        description: "Anda akan otomatis masuk ke halaman dashboard",
      });
      return router.push("/dashboard");
    },
  });

  const onSubmit = (body: RegisterType) => {
    setFormData(body);
    setIsDialogAgreementOpen(true);
  };

  const handleConfirmAgreement = () => {
    if (formData) {
      registerRequestHandler(formData);
      setIsDialogAgreementOpen(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full border-0 shadow-transparent">
        <div className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Daftar
            </CardTitle>
            <CardDescription>
              Selamat datang! Silahkan daftar menggunakan akun anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan nama"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan nomor telepon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
  control={form.control}
  name="disease_type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Jenis Penyakit</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih jenis penyakit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DM">Diabetes Melitus</SelectItem>
            <SelectItem value="HT">Hipertensi</SelectItem>
            <SelectItem value="ALL">Diabetes Melitus dan Hipertensi</SelectItem>
          </SelectContent>
        </Select>
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
                            type={showPassword.main ? "text" : "password"}
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
                            onClick={() => togglePassword("main")}
                            tabIndex={-1}
                          >
                            {showPassword.main ? (
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

                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword.confirm ? "text" : "password"}
                            id="password_confirmation"
                            placeholder="Masukkan konfirmasi password"
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
                <div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Daftar"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <div className="text-center text-sm">
                Sudah punya akun? {""}
                <Link
                  href="/login"
                  className="text-primary underline underline-offset-4"
                >
                  Masuk Sekarang
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      <DialogAgreementRegister
        open={isDialogAgreementOpen}
        onConfirm={handleConfirmAgreement}
        setOpen={setIsDialogAgreementOpen}
      />
    </div>
  );
}
