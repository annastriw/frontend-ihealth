'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  updateLocationSchema,
  UpdateLocationType,
} from "@/validators/maps/update-location-validator";
import { zodResolver } from "@hookform/resolvers/zod";

// Map component (tanpa SSR)
const MapLeaflet = dynamic(
  () => import("@/components/organisms/dashboard/maps/MapPicker"),
  { ssr: false }
);

// RW TANPA leading zero (biar cocok dengan data backend)
const kelurahanOptions = {
  Pedalangan: Array.from({ length: 11 }, (_, i) => `RW ${i + 1}`),
  Padangsari: Array.from({ length: 17 }, (_, i) => `RW ${i + 1}`),
};

export default function FormUpdateLocation() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const form = useForm<UpdateLocationType>({
    resolver: zodResolver(updateLocationSchema),
    defaultValues: {
      address: "",
      kelurahan: "",
      rw: "",
      latitude: "",
      longitude: "",
    },
  });

  const kelurahan = form.watch("kelurahan");

  useEffect(() => {
    if (status !== "authenticated" || !session?.access_token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/location`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        form.setValue("address", data.address ?? "");
        form.setValue("kelurahan", data.kelurahan ?? "");
        form.setValue("rw", data.rw ?? "");
        form.setValue("latitude", data.latitude ?? "-7.005145");
        form.setValue("longitude", data.longitude ?? "110.438125");
      })
      .catch(() => toast.error("Gagal mengambil data lokasi"))
      .finally(() => setLoading(false));
  }, [status, session]);

  const onSubmit = (values: UpdateLocationType) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menyimpan lokasi");
        return res.json();
      })
      .then(() => toast.success("Lokasi berhasil diperbarui"))
      .catch(() => toast.error("Terjadi kesalahan saat menyimpan lokasi"));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Jl. Kenanga Barat No. 5 RT 02 RW 03"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="kelurahan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelurahan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelurahan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pedalangan">Pedalangan</SelectItem>
                          <SelectItem value="Padangsari">Padangsari</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {kelurahan && (
                <FormField
                  control={form.control}
                  name="rw"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RW</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih RW" />
                          </SelectTrigger>
                          <SelectContent>
                            {kelurahanOptions[kelurahan as keyof typeof kelurahanOptions].map((rw) => (
                              <SelectItem key={rw} value={rw}>
                                {rw}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="h-64">
              {!loading && (
                <MapLeaflet
                  lat={parseFloat(form.getValues("latitude"))}
                  lng={parseFloat(form.getValues("longitude"))}
                  onChange={(lat, lng) => {
                    form.setValue("latitude", lat.toString());
                    form.setValue("longitude", lng.toString());
                  }}
                />
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
