import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormViewPersonalInformationProps {
  id: string;
}

export default function FormViewPersonalInformation({
  id,
}: FormViewPersonalInformationProps) {
  const { data: session, status } = useSession();
  const { data } = useGetPersonalInformationUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  const form = useForm({
    defaultValues: {
      name: "",
      place_of_birth: "",
      date_of_birth: "",
      age: "",
      is_married: false,
      gender: "male",
      work: "",
      last_education: "",
      origin_disease: "",
      // patient_type: "",
      disease_duration: "",
      smoking_history: "",
      bmi: "",
      heart_disease_history: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        place_of_birth: data.data.place_of_birth,
        date_of_birth: data?.data.date_of_birth
          ? format(new Date(data?.data.date_of_birth), "yyyy-MM-dd")
          : "",

        age: data.data.age,
        is_married: data.data.is_married,
        gender: data.data.gender,
        work: data.data.work,
        last_education: data.data.last_education,
        origin_disease: data.data.origin_disease,
        // patient_type: data.data.patient_type,
        disease_duration: data.data.disease_duration,
        smoking_history: data.data.smoking_history,
        bmi: data.data.bmi,
        heart_disease_history: data.data.heart_disease_history,
      });
    }
  }, [data?.data, form]);

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6">
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
                    disabled
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
                    disabled
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
                    <PopoverTrigger asChild disabled>
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
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                        fromYear={1960}
                        toYear={2030}
                        disabled
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
                <FormLabel>Umur</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan umur"
                    {...field}
                    value={field.value}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_married"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apakah anda sudah berkeluarga?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value ?? "")}
                    className="flex flex-col space-y-2"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="1" id="is_married_yes" />
                      </FormControl>
                      <FormLabel
                        htmlFor="is_married_yes"
                        className="font-normal"
                      >
                        Ya
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="0" id="is_married_no" />
                      </FormControl>
                      <FormLabel
                        htmlFor="is_married_no"
                        className="font-normal"
                      >
                        Tidak
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
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
                    disabled
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
                    disabled
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
                    disabled
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
                    placeholder="Masukkan Riwayat tempat pelayanan kesehatan sebelumnya"
                    {...field}
                    value={field.value}
                    disabled
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
                <FormLabel>Riwayat Merokok</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bmi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BMI (Body Mass Index)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Masukkan BMI (contoh: 22.3)"
                    {...field}
                    value={field.value}
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heart_disease_history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Riwayat Penyakit Jantung</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled
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
              </FormItem>
            )}
          />
          {/*SAMPE HEART DISEASE*/}

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
                    disabled
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <div>
              <Link href={`/work/screening/${id}`}>
                <Button type="submit">Selanjutnya</Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
