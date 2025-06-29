"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddNewPersonalInformation } from "@/http/personal-information/create-personal-information";
import { cn } from "@/lib/utils";
import {
  personalInformationSchema,
  PersonalInformationType,
} from "@/validators/personal-information/personal-information-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { differenceInYears, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreatePersonalInformation() {
  const form = useForm<PersonalInformationType>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      name: "",
      place_of_birth: "",
      date_of_birth: "",
      age: "",
      gender: undefined,
      work: "",
      last_education: "",
      origin_disease: "",
      is_married: false,
      patient_type: undefined,
      disease_duration: "",
      history_therapy: "nothing",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addNewQuestionTalkHandler, isPending } =
    useAddNewPersonalInformation({
      onError: () => {
        toast.error("Gagal mengisi informasi pribadi!");
      },
      onSuccess: () => {
        toast.success("Berhasil mengisi informasi pribadi!");
        queryClient.invalidateQueries({
          queryKey: ["check-personal-information"],
        });
      },
    });

  useEffect(() => {
    const dateOfBirth = form.watch("date_of_birth");

    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const age = differenceInYears(new Date(), dob);
      form.setValue("age", String(age));
    }
  }, [form.watch("date_of_birth")]);

  const onSubmit = (body: PersonalInformationType) => {
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
                      Nama Lengkap <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tempat Lahir <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan tempat lahir"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pilih tanggal lahir</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : "",
                              )
                            }
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Umur <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan umur"
                        {...field}
                        value={field.value ?? ""}
                        readOnly
                      />
                    </FormControl>
                    <FormDescription>
                      * Umur otomatis terisi ketika mengisi tanggal lahir
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_married"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Apakah anda sudah berkeluarga?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        defaultValue={
                          field.value !== undefined ? String(field.value) : ""
                        }
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Ya</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Tidak</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Jenis Kelamin</SelectLabel>
                            <SelectItem value="male">Laki - Laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
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
                name="work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pekerjaan <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pekerjaan"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pendidikan Terakhir{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pendidikan terakhir"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin_disease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Riwayat pelayanan kesehatan sebelumnya{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan riwayat pelayanan kesehatan sebelumnya"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patient_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                        Anda saat ini sedang terdiagnosis penyakit apa?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Jenis Diagnosis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Diagnosis</SelectLabel>
                            <SelectItem value="DM">
                              Diabetes Melitus
                            </SelectItem>
                            <SelectItem value="HT">
                              Hipertensi
                            </SelectItem>
                                                        <SelectItem value="ALL">
                              Diabetes Melitus dan Hipertensi
                            </SelectItem>
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
                name="disease_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sejak kapan terdiagnosis Diabetes Melitus atau Hipertensi?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan dalam tahun"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      * Contoh: 2 Tahun
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="history_therapy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Apakah anda sudah berobat ke dokter?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis terapi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel></SelectLabel>
                            <SelectItem value="already">
                              Sudah
                            </SelectItem>
                            <SelectItem value="nothing">
                              Belum Pernah
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
