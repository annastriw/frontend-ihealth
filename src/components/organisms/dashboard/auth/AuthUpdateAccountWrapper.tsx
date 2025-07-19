import CardChangePassword from "@/components/molecules/card/CardChangePassword";
import CardUpdateAccount from "@/components/molecules/card/CardUpdateAccount";
import FormUpdatePersonalInformation from "@/components/molecules/form/personal-information/FormUpdatePersonalInformation";
import FormUpdateLocation from "@/components/molecules/form/location/FormUpdateLocation";
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
          isUser ? "grid-cols-4" : "grid-cols-2", // 🔄 ubah grid-cols
        )}
      >
        <TabsTrigger value="information">Akun</TabsTrigger>
        <TabsTrigger value="change-password">Password</TabsTrigger>
        {isUser && (
          <>
            <TabsTrigger value="personal-information">
              Data Pribadi
            </TabsTrigger>
            <TabsTrigger value="location">Alamat</TabsTrigger>
          </>
        )}
      </TabsList>

      <TabsContent value="information">
        <CardUpdateAccount session={session!} />
      </TabsContent>
      <TabsContent value="change-password">
        <CardChangePassword />
      </TabsContent>
      {isUser && (
        <>
          <TabsContent value="personal-information">
            <FormUpdatePersonalInformation />
          </TabsContent>
          <TabsContent value="location">
            <FormUpdateLocation /> {/* 💡 Komponen untuk form alamat */}
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
