"use client";

import { useRouter } from "next/navigation";

interface MarkerPopupContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    kelurahan: string;
    rw: string;
    address: string;
    disease_type: string;
  };
}

export default function MarkerPopupContent({ user }: MarkerPopupContentProps) {
  const router = useRouter();

  const getDiseaseLabel = (type: string) => {
    const upper = type.toUpperCase();
    if (upper === "HT") return "Hipertensi";
    if (upper === "DM") return "Diabetes Melitus";
    if (upper === "ALL") return "Diabetes Melitus dan Hipertensi";
    return "-";
  };

  const handleDetailClick = () => {
    router.push(`/dashboard/admin/users/${user.id}`);
  };

  return (
    <div className="text-sm space-y-1">
      <p><strong>{user.name}</strong></p>
      <p>Email: {user.email}</p>
      <p>Kelurahan: {user.kelurahan}</p>
      <p>RW: {user.rw}</p>
      <p>Alamat: {user.address}</p>
      <p>Penyakit: {getDiseaseLabel(user.disease_type)}</p>
      <button
        onClick={handleDetailClick}
        className="inline-block mt-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
      >
        Lihat Detail
      </button>
    </div>
  );
}
