import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import LoginPage from "@/components/login";

export default async function Login() {
  const session = await getServerSession(authOption);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <LoginPage />
    </div>
  );
}