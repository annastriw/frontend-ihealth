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
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllQuestionBanks } from "@/http/question-banks/get-all-question-bank";
import { useEditScreening } from "@/http/screening/edit-screening";
import { TesDetail } from "@/types/test/test-detail";
import {
  screeningSchema,
  ScreeningType,
} from "@/validators/screening/screening-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FormEditScreeningProps {
  id: string;
  data: TesDetail;
  isLoading: boolean;
}

export default function FormEditScreening({
  id,
  data,
  isLoading,
}: FormEditScreeningProps) {
  const form = useForm<ScreeningType>({
    resolver: zodResolver(screeningSchema),
    defaultValues: {
      question_set_id: data.question_set_id ?? "",
      name: data.name ?? "",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: addNewQuestionTalkHandler, isPending } = useEditScreening({
    onError: () => {
      toast.error("Gagal mengedit screening!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengedit screening!");
      router.push("/dashboard/admin/screening");
    },
  });

  const onSubmit = (body: ScreeningType) => {
    addNewQuestionTalkHandler({ id, body });
  };

  const { data: session, status } = useSession();
  const { data: questionBank } = useGetAllQuestionBanks(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="question_set_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Soal</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih bank soal yang tersedia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Bank Soal</SelectLabel>
                              {questionBank?.data.map((questionBank) => (
                                <SelectItem
                                  key={questionBank.id}
                                  value={questionBank.id}
                                >
                                  {questionBank.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
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
                    <FormLabel>Nama Screening</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <Input
                          type="text"
                          placeholder="Masukkan nama screening"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
