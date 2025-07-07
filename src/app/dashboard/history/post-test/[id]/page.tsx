import ClientPage from "./ClientPage";

interface DashboardHistoryPostTestPageProps {
  params: { id: string };
}

export default function Page({ params }: DashboardHistoryPostTestPageProps) {
  return <ClientPage id={params.id} />;
}
