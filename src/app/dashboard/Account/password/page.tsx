import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import PasswordSetting from "@/components/passwordsetting";
export default async function PasswordPage() {
  const session = await getServerSession(authOption);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="">
      <PasswordSetting />
    </div>
  );
}