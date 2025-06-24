import UsersPage from "@/components/controller/Cruid";
import { authOption } from "@/app/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"




function page() {

  const session = getServerSession(authOption)
  if(!session){
    redirect("/login")
  }  
  return (
    <div><UsersPage /></div>
  )
}

export default page