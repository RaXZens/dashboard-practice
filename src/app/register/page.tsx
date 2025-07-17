import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import RegisterPage from "@/components/register";

export default async function Login() {
  const session = await getServerSession(authOption);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <RegisterPage />
    </div>
  );
}