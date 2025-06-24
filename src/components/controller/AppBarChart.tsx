"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const chartConfig = {
  TotalSold: {
    label: "Total-Sold",
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

const AppBarChart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error status : ${response.status}`);
      }
      const data = await response.json();
      const formatted = data.map((p: any) => ({
        products: p.name,
        TotalSold: p.total_sold,
      }));
      setProducts(formatted);
    };
    fetchProduct();
  }, []);

  return (
    <div className="">
      <h1 className="text-lg font-md mb-6">Top 5 Products</h1>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={products}
          layout="vertical"
          margin={{
            left: -20,
          }}

        >
          <XAxis type="number" dataKey="TotalSold" />

          <YAxis
            dataKey="products"
            type="category"
            tickLine={false}
            tickMargin={5}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="TotalSold" radius={4}>
            {products.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
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
