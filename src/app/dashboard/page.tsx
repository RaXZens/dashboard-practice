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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-8 gap-5 px-5 ">
      <div className="bg-primary-foreground p-4 rounded-lg md:col-span-1 xl:col-span-1 2xl:col-span-2 ">
        <AddPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg  lg:col-span-2 xl:col-span-2 2xl:col-span-3 row-span-1">
        <AddAreaChart />
      </div>

   

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-2 2xl:col-span-3">
        <AppBarChart />
      </div>
         <div className="bg-primary-foreground p-4 rounded-lg xl:col-span-4">
        <AddBarCharts />
      </div>
    </div>
  );
}

export default dashboard;
