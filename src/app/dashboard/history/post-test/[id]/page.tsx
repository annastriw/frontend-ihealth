import dynamic from "next/dynamic";

interface DashboardHistoryPostTestPageProps {
  params: { id: string };
}

// Import ClientPage secara dinamis (agar bisa pakai "use client")
const ClientComponent = dynamic(() => import("./ClientPage"), {
  ssr: false,
});

export default function Page({ params }: DashboardHistoryPostTestPageProps) {
  return <ClientComponent id={params.id} />;
}
