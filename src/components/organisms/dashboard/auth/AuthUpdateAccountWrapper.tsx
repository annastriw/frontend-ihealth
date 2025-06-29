import CardChangePassword from "@/components/molecules/card/CardChangePassword";
import CardUpdateAccount from "@/components/molecules/card/CardUpdateAccount";
import FormUpdatePersonalInformation from "@/components/molecules/form/personal-information/FormUpdatePersonalInformation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import clsx from "clsx";
import { getServerSession } from "next-auth";

export default async function AuthUpdateAccountWrapper() {
  const session = await getServerSession(authOptions);
  const isUser = session?.user.role === "user";
  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList
        className={clsx(
          "mb-2 grid w-fit",
          isUser ? "grid-cols-3" : "grid-cols-2",
        )}
      >
        <TabsTrigger value="information">Informasi Akun</TabsTrigger>
        <TabsTrigger value="change-password">Ganti Password</TabsTrigger>
        {isUser && (
          <TabsTrigger value="personal-information">
            Informasi Pribadi
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="information">
        <CardUpdateAccount session={session!} />
      </TabsContent>
      <TabsContent value="change-password">
        <CardChangePassword />
      </TabsContent>
      {isUser && (
        <TabsContent value="personal-information">
          <FormUpdatePersonalInformation />
        </TabsContent>
      )}
    </Tabs>
  );
}
