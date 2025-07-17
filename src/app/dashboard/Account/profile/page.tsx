import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import Profile from "@/components/profile";

export default async function ProfilePage() {
  const session = await getServerSession(authOption);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="">
      <Profile /> 
    </div>
  );
}