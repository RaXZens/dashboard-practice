import AddAreaChart from "@/components/AddAreaChart";
import AddPieChart from "@/components/AddPieChart";
import AppBarChart from "@/components/AppBarChart";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";
import { ChartLineDots } from "@/components/Applinechart";
import { ChartRadialText } from "@/components/AppRadialchart";
import { ChartRadialShape } from "@/components/AppRadialchartShape";
import { ChartRadarDots } from "@/components/AppRadarchart";

//import { useRouter } from "next/navigation";

async function dashboard() {
  const session = await getServerSession(authOption);
  //const Router = useRouter();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1  lg:grid-cols-9  gap-5 px-5 ">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-4 xl:col-span-2 2xl:col-span-2">
        <AddPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg  lg:col-span-5 xl:col-span-3 row-span-1">
        <AddAreaChart />
      </div>

      <div className="bg-primary-foreground p-4  rounded-lg lg:col-span-9 xl:col-span-4">
        <AppBarChart />
      </div>
      <div className="lg:col-span-5 xl:col-span-3 2xl:col-span-3 ">
        <ChartLineDots />
      </div>
      <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-2">
        <ChartRadialText />
      </div>
      <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-2">
        <ChartRadialShape />
      </div>
      <div className="lg:col-span-5 xl:col-span-3 2xl:col-span-2">
        <ChartRadarDots />
      </div>
    </div>
  );
}

export default dashboard;
