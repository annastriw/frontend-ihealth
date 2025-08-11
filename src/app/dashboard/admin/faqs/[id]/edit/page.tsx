import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import DashboardAdminEditFAQWrapper from "@/components/organisms/dashboard/admin/faq/DashboardEditFAQWrapper";

interface FAQEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAdminEditFAQPage({
  params,
}: FAQEditPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitleBold head="Edit FAQ" />
      <DashboardAdminEditFAQWrapper id={id} />
    </section>
  );
}
