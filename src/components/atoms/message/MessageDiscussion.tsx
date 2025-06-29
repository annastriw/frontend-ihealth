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

interface MessageDiscussionProps {
  id: string;
}

export default function MessageDiscussion({ id }: MessageDiscussionProps) {
  const { data: session, status } = useSession();
  const { data } = useGetAllMedicalPersonalUsers(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("image", file);
    }
  };

  const handleClickPaperclip = () => {
    fileInputRef.current?.click();
  };
  const queryClient = useQueryClient();

  const { mutate: addHDHandler, isPending } = useAddNewDiscussionMesagge({
    onError: () => {
      toast.error("Gagal mengirim pesan!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengirim pesan!");
      queryClient.invalidateQueries({
        queryKey: ["discussion-detail"],
      });
      form.reset();
      setFileName(null);
    },
  });

  const onSubmit = (body: DiscussionMessageType) => {
    const payload = {
      ...body,
      medical_id: body.is_private ? body.medical_id : null,
    };

    addHDHandler(payload);
  };

  return (
    <div className="mb-6 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-xl border p-4"
        >
          {fileName && (
            <div className="bg-primary/10 flex items-center justify-between gap-x-2 rounded-md border p-2 text-sm text-gray-600">
              <div className="flex items-center gap-x-2">
                <FileImage className="h-5 w-5" />
                {fileName}
              </div>
              <button
                type="button"
                onClick={() => {
                  setFileName(null);
                  form.setValue("image", undefined);
                }}
              >
                <X className="text-muted-foreground h-4 w-4 cursor-pointer" />
              </button>
            </div>
          )}

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Textarea
                    placeholder="Tulis pesan untuk disuksi disini..."
                    className="resize-none border-0 p-0 shadow-none"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-y-4">
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
                    <div className="text-muted-foreground text-sm">
                      Private (hanya ke Dokter / Tenaga Medis)
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("is_private") && (
                <FormField
                  control={form.control}
                  name="medical_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih dokter / tenaga medis</FormLabel>
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

            <div className="flex w-full items-center justify-end gap-x-2">
              <button type="button" onClick={handleClickPaperclip}>
                <Paperclip className="text-muted-foreground h-6 w-6 cursor-pointer" />
              </button>

              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full"
                size={"icon"}
              >
                <ArrowUp className="h-8 w-8" />
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
    </div>
  );
}
