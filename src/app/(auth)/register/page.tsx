import RegisterWrapperContent from "@/components/organisms/auth/RegisterWrapperContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | iHealth Edu",
  description: "Daftar untuk mengakses fitur-fitur yang tersedia.",
};

export default function AuthRegisterPage() {
  return <RegisterWrapperContent />;
}
