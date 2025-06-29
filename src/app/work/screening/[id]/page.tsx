import WorkScreeningWrapper from "@/components/organisms/work/WorkScreeningWrapper";

interface WorkScreeningProps {
  params: Promise<{ id: string }>;
}

export default async function WorkScreeningPage({
  params,
}: WorkScreeningProps) {
  const { id } = await params;
  return (
    <div>
      <WorkScreeningWrapper id={id} />
    </div>
  );
}
