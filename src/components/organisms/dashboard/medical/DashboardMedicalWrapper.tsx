import { Users } from "lucide-react";
import CardCAPDMaterialCount from "@/components/molecules/card/CardDashboardTitle";

export default function DashboardMedicalWrapper() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <CardCAPDMaterialCount
          title="Forum Komunitas"
          icon={Users}
          link="medical/discussions"
        />
      </div>
    </div>
  );
}
