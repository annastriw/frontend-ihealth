import ClientPage from "./ClientPage";

export default function Page({ params }: any) {
  return <ClientPage id={params.id} />;
}
