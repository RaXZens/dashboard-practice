"use client";
import { TrendingUp, User } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";
import { debug } from "console";

const colors = ["var(--chart-1)", "var(--chart-2)"];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type totalusers = {
  total_users: number;
};
type SplitUsers = {
  total_users: number;
  position: string;
};

const AddPieChart = () => {
  const [totalusers, setTotalusers] = useState<totalusers[]>([]);
  const [splitUsers, setSplitUsers] = useState<SplitUsers[]>([]);

  useEffect(() => {
    // ดึงข้อมูลจาก API
    const fetchUsers = async () => {
      const response = await fetch("/api/user", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setTotalusers(data.totalUsers); // เก็บข้อมูลใน state
      setSplitUsers(data.Splitusers);
    };
    
    fetchUsers();
  }, []);

  return (
    <div className="">
      <h1 className="text-lg font-md mb-6">Employee Overview</h1>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={splitUsers}
            dataKey="total_users"
            nameKey="position"
            cx="50%"
            cy="50%"
            innerRadius={60}
            strokeWidth={5}
          >
            {splitUsers.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalusers[0]?.total_users}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Employees
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center ">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Employees
          <User className="h-4 w-4 text-green-500" />
        </div>
      </div>
      <div className="mt-2 text-center leading-none text-muted-foreground gap-2">
          {splitUsers.map((users) => (
            <p className="py-1" key={users.position}>
              {users.position} : {users.total_users}
            </p>
          ))}
        </div>
    </div>
  );
};

export default AddPieChart;
