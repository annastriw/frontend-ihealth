import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormChangePassword from "../form/auth/FormChangePassword";

export default function CardChangePassword() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
          <CardDescription>
            Ganti password yang lama disini untuk keamanan akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormChangePassword />
        </CardContent>
      </Card>
    </div>
  );
}
