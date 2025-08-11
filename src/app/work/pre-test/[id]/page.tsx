import WorkPreTestWrapper from "@/components/organisms/work/WorkPreTestWrapper";

interface WorkPreTestPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkPreTestPage({
  params,
}: WorkPreTestPageProps) {
  const { id } = await params;
  return (
    <section>
      <WorkPreTestWrapper id={id} />
    </section>
  );
}
