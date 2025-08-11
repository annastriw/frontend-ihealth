import AlertInformationModulesAdmin from "@/components/atoms/alert/AlertInformationModulesAdmin";
import FormCreateModule from "@/components/molecules/form/modules/FormCreateModule";

export default function DashboardAdminCreateModuleWrapper() {
  return (
    <div className="space-y-4">
      <AlertInformationModulesAdmin />
      <FormCreateModule />
    </div>
  );
}
