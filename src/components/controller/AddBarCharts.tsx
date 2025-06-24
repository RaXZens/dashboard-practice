"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";

const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const AddBarCharts = () => {
  return (
    <div className="">
      <h1 className="text-lg font-md mb-6">Visitors Negative</h1>
      <CardDescription>January - June 2024</CardDescription>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          <Bar dataKey="visitors">
            <LabelList position="top" dataKey="month" fillOpacity={1} />
            {chartData.map((item) => (
              <Cell
                key={item.month}
                fill={
                  item.visitors > 0
                    ? "var(--chart-1)"
                    : "var(--chart-2)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AddBarCharts;
