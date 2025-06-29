"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddNewModule } from "@/http/modulels/create-modules";
import {
  moduleSchema,
  ModuleType,
} from "@/validators/modules/module-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateModule() {
  const router = useRouter();

  const form = useForm<ModuleType>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
    },
    mode: "onChange",
  });

  const { mutate: addNewQuestionTalkHandler, isPending } = useAddNewModule({
    onError: () => {
      toast.error("Gagal membuat materi baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil membuat materi baru!");
      router.push("/dashboard/admin/modules");
    },
  });

  const onSubmit = (body: ModuleType) => {
    addNewQuestionTalkHandler({ ...body });
  };
  return (
    <div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Materi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama materi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tipe Materi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe materi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipe Materi</SelectLabel>
                            <SelectItem value="DM">Diabetes Melitus</SelectItem>
                            <SelectItem value="HT">Hipertensi</SelectItem>
                            <SelectItem value="KM">Kesehatan Mental</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan deskripsi materi"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
