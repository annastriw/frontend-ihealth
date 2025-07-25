// src/components/molecules/form/module-content/FormCreateModuleContent.tsx
"use client";

import QuillEditor from "@/components/atoms/quill/QuillEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useAddNewModuleContent } from "@/http/module-content/create-module-content";
import { useGetAllSubModulesNoCategory } from "@/http/sub-modules/get-all-sub-modules-no-category";
import {
  moduleContentSchema,
  ModuleContentType,
} from "@/validators/module-contents/module-content-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateModuleContent() {
  const router = useRouter();
  const form = useForm<ModuleContentType>({
    resolver: zodResolver(moduleContentSchema),
    defaultValues: {
      sub_module_id: "",
      file_path: undefined,
      name: "",
      content: "",
      video_url: "",
      type: "",
    },
    mode: "onChange",
  });

  const [isNoVideo, setIsNoVideo] = useState(false);
  const { data: session, status } = useSession();
  const { data } = useGetAllSubModulesNoCategory(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { mutate: addHTHandler, isPending } = useAddNewModuleContent({
    onError: () => {
      toast.error("Gagal menambahkan konten materi!");
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan konten materi!");
      router.back();
    },
  });

  const onSubmit = (body: ModuleContentType) => {
    addHTHandler(body);
  };
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="sub_module_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Materi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih materi yang tersedia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Materi</SelectLabel>
                          {data?.data.map((module) => (
                            <SelectItem key={module.id} value={module.id}>
                              {module.name}
                              <span className="uppercase">
                                ({module.module.type})
                              </span>
                            </SelectItem>
                          ))}
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
  name="type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Tipe <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipe</SelectLabel>
              <SelectItem value="ht">Hipertensi</SelectItem>
              <SelectItem value="dm">Diabetes Melitus</SelectItem>
              <SelectItem value="km">Kesehatan Mental</SelectItem>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nama Konten Materi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nama konten materi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    URL Video <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan url video dari youtube"
                      {...field}
                      value={isNoVideo ? "-" : field.value}
                      disabled={isNoVideo}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    * Contoh: https://www.youtube.com/watch?v=y55Wupx2ZDU, yang dimasukkan <code>y55Wupx2ZDU</code>
                  </FormDescription>
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox
                      id="no-video"
                      checked={isNoVideo}
                      onCheckedChange={(checked) => {
                        setIsNoVideo(!!checked);
                        if (checked) {
                          form.setValue("video_url", "-");
                        } else {
                          form.setValue("video_url", "");
                        }
                      }}
                    />
                    <label
                      htmlFor="no-video"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Centang jika konten tanpa menggunakan video Youtube
                    </label>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    File Materi (PDF) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Konten <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <QuillEditor
                      value={field.value}
                      onChange={field.onChange}
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
  );
}
