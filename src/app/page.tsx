import NavbarPublic from "@/components/ui/navbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";

async function Homepage() {
  const session = await getServerSession(authOption);
  if (session) {
    redirect("/dashboard");
  }
  if(!session){
    redirect("/login");
  }
  return (
    <div className="">
      <NavbarPublic />
    </div>
  );
}

export default Homepage;
