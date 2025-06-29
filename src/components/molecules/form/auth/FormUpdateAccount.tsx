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
import { useUpdateAccount } from "@/http/auth/update-account";
import {
  updateAccountSchema,
  UpdateAccountType,
} from "@/validators/auth/update-account-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormUpdateAccountProps {
  session: Session;
}

export default function FormUpdateAccount({ session }: FormUpdateAccountProps) {
  const router = useRouter();

  const form = useForm<UpdateAccountType>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: session.user.name || "",
      email: session.user.email || "",
      username: session.user.username || "",
      phone_number: session.user.phone_number || "",
    },
    mode: "onChange",
  });

  const { mutate: updateAccountHandler, isPending } = useUpdateAccount({
    onError: () => {
      toast.error("Gagal mengupdate akun!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate akun!");
      router.refresh();
    },
  });

  const onSubmit = (body: UpdateAccountType) => {
    updateAccountHandler({ ...body });
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Masukkan nama" {...field} />
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
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Masukkan nama" {...field} />
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
                <FormLabel>
                  Username <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
                <FormLabel>
                  Nomor Telepon <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan nomor telepon"
                    {...field}
                  />
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
