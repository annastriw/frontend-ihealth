// src/components/molecules/form/personal-information/FormPersonalInformation.tsx
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
      is_married: true,
      // patient_type: undefined,
      disease_duration: "",
      history_therapy: "nothing",
      smoking_history: undefined,
      bmi: "",
      heart_disease_history: undefined,
      weight: "",
      height: "",
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

  const dateOfBirth = form.watch("date_of_birth");
const weight = form.watch("weight");
const height = form.watch("height");

useEffect(() => {
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const age = differenceInYears(new Date(), dob);
    form.setValue("age", String(age));
  }
}, [dateOfBirth]);

useEffect(() => {
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height); // dalam cm

  if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
    const heightInMeters = heightNum / 100;
    const bmi = weightNum / (heightInMeters * heightInMeters);
    form.setValue("bmi", bmi.toFixed(1));
  }
}, [weight, height]);



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
                                !field.value && "text-muted-foreground"
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
                            onSelect={(date) => {
                              const formatted = date ? format(date, "yyyy-MM-dd") : "";
                              field.onChange(formatted);

                              // ⬇️ Tambahkan ini supaya validasi langsung berjalan
                              form.trigger("date_of_birth");
                            }}
                            fromYear={1925}
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
                            <SelectItem value="0">Laki - Laki</SelectItem>
                            <SelectItem value="1">Perempuan</SelectItem>
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
                      Pendidikan Terakhir <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih pendidikan terakhir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Pendidikan</SelectLabel>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="SMP">SMP</SelectItem>
                            <SelectItem value="SMA/SMK">SMA / SMK</SelectItem>
                            <SelectItem value="D1">D1</SelectItem>
                            <SelectItem value="D2">D2</SelectItem>
                            <SelectItem value="D3">D3</SelectItem>
                            <SelectItem value="S1">S1</SelectItem>
                            <SelectItem value="S2">S2</SelectItem>
                            <SelectItem value="S3">S3</SelectItem>
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
                name="origin_disease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Riwayat tempat pelayanan kesehatan sebelumnya{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan riwayat tempat pelayanan kesehatan sebelumnya"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
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
  name="weight"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Berat Badan (kg) <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Masukkan berat badan dalam kilogram"
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
  name="height"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Tinggi Badan (cm) <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Masukkan tinggi badan dalam sentimeter"
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
  name="bmi"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Indeks BMI (Body Mass Index){" "}
        <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="BMI akan dihitung otomatis"
          {...field}
          value={field.value ?? ""}
          readOnly
        />
      </FormControl>
      <FormDescription>
        * BMI dihitung otomatis dari berat dan tinggi badan
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
                      Berapa lama anda telah terdiagnosis Diabetes Melitus atau Hipertensi?{" "}
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
                    <FormDescription>* Contoh: 2 Tahun</FormDescription>
                    <FormMessage />
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
