import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardGeneral from "@/components/organisms/dashboard/general/DashboardGeneral";

export default function GeneralPage() {
  return (
    <section>
      <DashboardTitle
        head="Penjelasan Umum"
        body="Halaman ini berisi penjelasan singkat dan data umum mengenai tiga topik utama: hipertensi, diabetes melitus, dan kesehatan mental. 
              Anda dapat beralih antar topik melalui tab di bawah untuk mempelajari informasi, faktor risiko, dan saran pencegahan."
      />
      <DashboardGeneral />
    </section>
  );
}
