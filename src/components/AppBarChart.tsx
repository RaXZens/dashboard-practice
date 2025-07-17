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
  total_salaries: {
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

interface Product {
  department: string;
  total_salaries: number;
}

const AppBarChart = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error status : ${response.status}`);
      }
      const data = await response.json();
      const productsArray = data.TotalProducts.map((item: any) => ({
        department: item.department,
        total_salaries: item.total_salary
      }));

      // คำนวณ grand total

      setProducts(productsArray);
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
          <XAxis type="number" dataKey="total_salaries" domain={[0, 200000]}/>

          <YAxis
            dataKey="department"
            type="category"
            tickLine={false}
            tickMargin={5}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 3)}
            
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="total_salaries" radius={4}>
            {products.map((row, index) => (
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
