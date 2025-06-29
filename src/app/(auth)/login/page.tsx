import LoginWrapperContent from "@/components/organisms/auth/LoginWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | iHealth Edu",
  description: "Masuk untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthLoginPage() {
  return <LoginWrapperContent />;
}
