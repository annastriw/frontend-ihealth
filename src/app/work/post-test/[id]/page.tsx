import WorkPostTestWrapper from "@/components/organisms/work/WorkPostTestWrapper";

interface WorkPostTestPageParams {
  params: Promise<{ id: string }>;
}

export default async function WorkPostTestPage({
  params,
}: WorkPostTestPageParams) {
  const { id } = await params;
  return (
    <section>
      <WorkPostTestWrapper id={id} />
    </section>
  );
}
