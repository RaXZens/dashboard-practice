"use client";
import {
  ChartContainer,

  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Bar, BarChart,  Cell, XAxis, YAxis } from "recharts";

const chartConfig = {
  total_salaries: {
    label: "Total-Salaries : ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface totalsalariesByDepartment {
  department: string;
  total_salaries: number;
}

interface totalsalaries {
  salaries: string;
}

const AppBarChart = () => {
  const [ totalsalariesByDepartment, setTotalsalaries] = useState<totalsalariesByDepartment[]>([]);
  const [ TotalSalaries, setTotalSalaries] = useState<totalsalaries[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/salaries", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error status : ${response.status}`);
      }
      const data = await response.json();
      const totalsalariesByDepartment = data.TotalProducts.map((item: any) => ({
        department: item.department,
        total_salaries: item.total_salary,
      }));
      setTotalSalaries(data.salaries)
      setTotalsalaries(totalsalariesByDepartment);
    };
    fetchProduct();
  }, []);

  return (
    <div className="">
      <h1 className="text-lg font-md mb-6">Total Salaries</h1>
      <p className="text-sm font-light text-center mb-2">Total Salaries : {TotalSalaries[0]?.salaries}</p>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={totalsalariesByDepartment}
          layout="horizontal"
          margin={{
            left: 20,
            right: 30,
            bottom: 70
          }}
        >
          <XAxis type="category" dataKey="department" interval={0} textAnchor="end" angle={-45}/>

          <YAxis
            padding={{bottom:2}}
            dataKey="total_salaries"
            type="number"
            tickLine={false}
            tickMargin={5}
            axisLine={true}
            domain={[0, 400000]}
            
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total_salaries" radius={4}>
            {totalsalariesByDepartment.map((row, index) => (
              <Cell
                key={`cell-${row.department}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
