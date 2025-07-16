// src/components/molecules/card/CardPersonalInformationUserId.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonalInformation } from "@/types/personal-information/personal-information";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CardPersonalInformationUserIdProps {
  data?: PersonalInformation;
  isLoading: boolean;
  diseaseType?: string; // tambahkan props baru
}

const getGenderLabel = (gender?: "0" | "1") => {
  if (gender === "0") return "Laki-laki";
  if (gender === "1") return "Perempuan";
  return "-";
};

const getHeartDiseaseLabel = (value?: "0" | "1") => {
  if (value === "1") return "Ada Riwayat";
  if (value === "0") return "Tidak Ada";
  return "-";
};

const getDiseaseTypeLabel = (type?: string) => {
  switch (type) {
    case "HT":
      return "Hipertensi";
    case "DM":
      return "Diabetes Melitus";
    case "ALL":
      return "Hipertensi & Diabetes Melitus";
    default:
      return "-";
  }
};

export default function CardPersonalInformationUserId({
  data,
  isLoading,
  diseaseType,
}: CardPersonalInformationUserIdProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Pribadi</CardTitle>
        <CardDescription>Menampilkan data informasi pribadi dari pasien.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:space-y-6">
          {/* Nama Lengkap */}
          <Field label="Nama Lengkap" value={data?.name} loading={isLoading} />

          {/* Diagnosa Medis */}
          <Field
            label="Diagnosa Medis"
            value={getDiseaseTypeLabel(diseaseType)}
            loading={isLoading}
          />

          {/* Tempat Lahir */}
          <Field label="Tempat Lahir" value={data?.place_of_birth} loading={isLoading} />

          {/* Tanggal Lahir */}
          <Field
            label="Tanggal Lahir"
            value={
              data?.date_of_birth
                ? format(new Date(data.date_of_birth), "dd MMMM yyyy", { locale: id })
                : "-"
            }
            loading={isLoading}
          />

          {/* Umur */}
          <Field
            label="Umur"
            value={data?.age ? `${data.age} Tahun` : "-"}
            loading={isLoading}
          />

          {/* Sudah Berkeluarga */}
          <Field
            label="Apakah sudah berkeluarga?"
            value={data?.is_married ? "Sudah Menikah" : "Belum Menikah"}
            loading={isLoading}
          />

          {/* Jenis Kelamin */}
          <Field
            label="Jenis Kelamin"
            value={getGenderLabel(data?.gender)}
            loading={isLoading}
          />

          {/* Pekerjaan */}
          <Field label="Pekerjaan" value={data?.work} loading={isLoading} />

          {/* Pendidikan Terakhir */}
          <Field label="Pendidikan Terakhir" value={data?.last_education} loading={isLoading} />

          {/* Riwayat Tempat Pelayanan Kesehatan */}
          <Field
            label="Riwayat tempat pelayanan kesehatan sebelumnya"
            value={data?.origin_disease}
            loading={isLoading}
          />

          {/* Riwayat Merokok */}
          <Field
            label="Riwayat Merokok"
            value={data?.smoking_history}
            loading={isLoading}
          />

          {/* Berat Badan */}
          <Field label="Berat Badan (kg)" value={data?.weight} loading={isLoading} />

          {/* Tinggi Badan */}
          <Field label="Tinggi Badan (cm)" value={data?.height} loading={isLoading} />

          {/* BMI */}
          <Field label="Indeks BMI" value={data?.bmi} loading={isLoading} />

          {/* Riwayat Penyakit Jantung */}
          <Field
            label="Riwayat Penyakit Jantung"
            value={getHeartDiseaseLabel(data?.heart_disease_history)}
            loading={isLoading}
          />

          {/* Lama Terdiagnosis */}
          <Field
            label="Berapa Lama Terdiagnosis Diabetes Melitus dan Hipertensi"
            value={data?.disease_duration}
            loading={isLoading}
          />

          {/* Sudah Pernah Berobat */}
          <Field
            label="Apakah sudah pernah berobat ke dokter?"
            value={
              isLoading
                ? undefined
                : data?.history_therapy?.toLowerCase() === "nothing"
                ? "Belum Pernah"
                : data?.history_therapy
                ? "Sudah"
                : "-"
            }
            loading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  loading,
}: {
  label: string;
  value?: string | number | null;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-muted-foreground">{label}</div>
      <div>{loading ? <Skeleton className="w-32" /> : value || "-"}</div>
    </div>
  );
}
