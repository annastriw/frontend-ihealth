import AlertPersonalInformation from "@/components/atoms/alert/AlertPersonalInformation";
import DashboardTitleBold from "@/components/atoms/typography/DashboardTitleBold";
import FormCreatePersonalInformation from "@/components/molecules/form/personal-information/FormPersonalInformation";

export default function DashboardPersonalInformationWrapper() {
  return (
    <div>
      <div className="p-6 pt-20">
        <DashboardTitleBold head="Pengisian Informasi Pribadi" />
        <AlertPersonalInformation />
        <FormCreatePersonalInformation />
      </div>
    </div>
  );
}
