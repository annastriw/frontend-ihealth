// src/app/work/screening-scoring/[id]/page.tsx
import WorkScreeningScoringWrapper from "@/components/organisms/work/WorkScreeningScoringWrapper";

interface WorkScreeningScoringPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkScreeningScoringPage({
  params,
}: WorkScreeningScoringPageProps) {
  const { id } = await params;

  return (
    <div>
      <WorkScreeningScoringWrapper id={id} />
    </div>
  );
}
