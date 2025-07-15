// src/components/molecules/form/personal-information/FormUpdatePersonalInformation.tsx
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
import { useGetPersonalInformationUser } from "@/http/personal-information/get-personal-information";
import { useUpdatePersonalInformation } from "@/http/personal-information/update-personal-information";
import { cn } from "@/lib/utils";
import {
  personalInformationSchema,
  PersonalInformationType,
} from "@/validators/personal-information/personal-information-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormUpdatePersonalInformation() {
  const { data: session, status } = useSession();
  const { data } = useGetPersonalInformationUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  const form = useForm<PersonalInformationType>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      name: data?.data.name ?? "",
      place_of_birth: data?.data.place_of_birth ?? "",
      date_of_birth: data?.data.date_of_birth
        ? format(new Date(data.data.date_of_birth), "yyyy-MM-dd")
        : "",
      age: data?.data.age ?? "",
      gender:
        data?.data.gender === "0" || data?.data.gender === "1"
          ? data.data.gender
          : "1",
      work: data?.data.work ?? "",
      last_education: data?.data.last_education ?? "",
      origin_disease: data?.data.origin_disease ?? "",
      is_married:
        data?.data.is_married !== undefined
          ? Boolean(Number(data.data.is_married))
          : false,
      // patient_type:
      //   data?.data.patient_type === "DM" || data?.data.patient_type === "HT" || data?.data.patient_type === "KM"
      //     ? data.data.patient_type
      //     : "HT",
      disease_duration: data?.data.disease_duration ?? "",
      history_therapy: data?.data.history_therapy ?? "",
      smoking_history: data?.data.smoking_history ?? undefined,
      bmi: data?.data.bmi ?? "",
      heart_disease_history: data?.data.heart_disease_history ?? undefined,
    },
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: editPersonalInformationHandler, isPending } =
    useUpdatePersonalInformation({
      onError: () => {
        toast.error("Gagal mengedit informasi pribadi!");
      },
      onSuccess: () => {
        toast.success("Berhasil mengedit informasi pribadi!");
        router.refresh();
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
    editPersonalInformationHandler({ ...body });
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan tempat lahir"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
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
                            fromYear={1925}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
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
                    <FormLabel>Jenis Kelamin</FormLabel>
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
                            <SelectItem value="0">Laki - Laki</SelectItem>
                            <SelectItem value="1">Perempuan</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pekerjaan</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pekerjaan"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pendidikan Terakhir</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan pendidikan terakhir"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="origin_disease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Riwayat tempat pelayanan kesehatan sebelumnya
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan tempat pelayanan kesehatan sebelumnya"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/*ACEL*/}
              <FormField
                control={form.control}
                name="smoking_history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Riwayat Merokok <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih riwayat merokok" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Riwayat Merokok</SelectLabel>
                            <SelectItem value="perokok aktif">
                              Perokok Aktif
                            </SelectItem>
                            <SelectItem value="mantan perokok">
                              Mantan Perokok
                            </SelectItem>
                            <SelectItem value="tidak pernah merokok">
                              Tidak Pernah Merokok
                            </SelectItem>
                            <SelectItem value="tidak ada informasi">
                              Tidak Ada Informasi
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
                name="bmi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Indeks BMI (Body Mass Index){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Masukkan BMI (contoh: 22.3)"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      * Masukkan nilai BMI dalam format desimal (contoh: 22.3,
                      20.8, 18.5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heart_disease_history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Riwayat Penyakit Jantung{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih riwayat penyakit jantung" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Riwayat Penyakit Jantung</SelectLabel>
                            <SelectItem value="1">Ya</SelectItem>
                            <SelectItem value="0">Tidak</SelectItem>
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
                      Sejak kapan terdiagnosis Diabetes Melitus atau Hipertensi?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan dalam tahun"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="history_therapy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apakah anda sudah berobat ke dokter?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jawaban" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="already">Sudah</SelectItem>
                            <SelectItem value="nothing">
                              Belum Pernah
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
        </CardContent>
      </Card>
    </div>
  );
}
