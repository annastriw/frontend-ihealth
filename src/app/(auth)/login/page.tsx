import LoginWrapperContent from "@/components/organisms/auth/LoginWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Dialisis Connect Edu",
  description: "Masuk untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthLoginPage() {
  return <LoginWrapperContent />;
}
