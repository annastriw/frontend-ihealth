"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, FileImage, Paperclip, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  discussionMessageSchema,
  DiscussionMessageType,
} from "@/validators/discussion/discussion-message-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewDiscussionMesagge } from "@/http/discussions/create-discussion-message";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useGetAllMedicalPersonalUsers } from "@/http/users/get-medical-personal-users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface MessageDiscussionProps {
  id: string;
}

export default function MessageDiscussion({ id }: MessageDiscussionProps) {
  const { data: session, status } = useSession();
  const { data } = useGetAllMedicalPersonalUsers(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const form = useForm<DiscussionMessageType>({
    resolver: zodResolver(discussionMessageSchema),
    defaultValues: {
      discussion_id: id,
      image: undefined,
      comment: "",
      is_private: false,
      medical_id: null,
    },
    mode: "onChange",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: addHTHandler, isPending } = useAddNewDiscussionMesagge({
    onError: () => toast.error("Gagal mengirim pesan!"),
    onSuccess: () => {
      toast.success("Berhasil mengirim pesan!");
      queryClient.invalidateQueries({ queryKey: ["discussion-detail"] });
      form.reset();
      setFileName(null);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("image", file);
    }
  };

  const handleClickPaperclip = () => fileInputRef.current?.click();

  const onSubmit = (body: DiscussionMessageType) => {
    const payload = {
      ...body,
      medical_id: body.is_private ? body.medical_id : null,
    };
    addHTHandler(payload);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:gap-6 md:p-6"
        >
          {/* File preview */}
          {fileName && (
            <div className="flex items-center justify-between gap-2 w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FileImage className="h-5 w-5 text-primary" />
                {fileName}
              </div>
              <button
                type="button"
                onClick={() => {
                  setFileName(null);
                  form.setValue("image", undefined);
                }}
              >
                <X className="h-4 w-4 text-green-600 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Text input */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Tulis pesan atau pertanyaanmu di sini..."
                    className="w-full resize-none border-0 p-0 text-base focus-visible:ring-0"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Options + Send */}
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between w-full">
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <FormField
                control={form.control}
                name="is_private"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    </FormControl>
                    <span className="text-sm text-muted-foreground">
                      Private (hanya untuk Dokter / Tenaga Medis)
                    </span>
                  </FormItem>
                )}
              />

              {form.watch("is_private") && (
                <FormField
                  control={form.control}
                  name="medical_id"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-64">
                      <FormLabel className="text-sm font-medium">
                        Pilih Dokter / Tenaga Medis
                      </FormLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={(value) => field.onChange(value || null)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Medical Personal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.data.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* File + Send */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClickPaperclip}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Paperclip className="h-6 w-6 text-gray-500 hover:text-primary" />
              </button>
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full p-2"
                size="icon"
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </Form>
    </motion.div>
  );
}
