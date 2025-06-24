
import AddAreaChart from "@/components/controller/AddAreaChart";
import AddBarCharts from "@/components/controller/AddBarCharts";
import AddPieChart from "@/components/controller/AddPieChart";
import AppBarChart from "@/components/controller/AppBarChart";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";


//import { useRouter } from "next/navigation";

async function dashboard() {
  const session = await getServerSession(authOption);
  //const Router = useRouter();
  if (!session) {
    redirect("/login");
  } 

  
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AddAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-1">
        <AddBarCharts />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AddPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      
    </div>
  );
}

export default dashboard;
