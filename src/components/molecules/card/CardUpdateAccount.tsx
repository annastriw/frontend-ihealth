import { Session } from "next-auth";
import FormUpdateAccount from "../form/auth/FormUpdateAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardUpdateAccountProps {
  session: Session;
}

export default function CardUpdateAccount({ session }: CardUpdateAccountProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
          <CardDescription>
            Perbarui informasi akun Anda seperti nama, email, atau data lainnya
            di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormUpdateAccount session={session!} />
        </CardContent>
      </Card>
    </div>
  );
}
