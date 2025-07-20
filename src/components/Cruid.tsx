"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CircleMinus, Ghost } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import AddEmployeesButton from "@/components/ui/AddEmployeesButton";

interface user {
  id: number;
  email: string;
  position: string;
  department: string;
  name: string;
  salary: number;
}
const salaryRanges = [
  { label: "Show All", value: "all" },
  { label: "10,000 - 20,000", value: "10000-20000" },
  { label: "20,000 - 30,000", value: "20000-30000" },
  { label: "30,000 - 50,000", value: "30000-50000" },
  { label: "60000 Or More", value: "60000<" },
];
const SelectDepartment = [
  { label: "All Departments", value: "all" },
  { label: "IT & Technology", value: "IT%20%26%20Technology" },
  { label: "Sales", value: "Sales" },
  { label: "Production/Operations", value: "Production/Operations" },
  { label: "Marketing", value: "Marketing" },
];

const UsersPage = () => {
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [users, setUsers] = useState<user[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const fetchUsers = async () => {
    const response = await fetch("/api/user", { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setUsers(data.users); // เก็บข้อมูลใน state
    // เก็บข้อมูลใน state
  };

  const fetchFilteredUsers = async (
    salariesRange: string,
    department: string
  ) => {
    try {
      const res = await fetch(
        `/api/user/filters?salariesRange=${salariesRange}&department=${department}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setUsers(data.users); // เก็บข้อมูลใน state
    } catch (error) {
      console.error("Failed to fetch users by salary range:", error);
    }
  };

  useEffect(() => {
    // ดึงข้อมูลจาก API
    if (selectedSalaryRange === "all" && selectedDepartment === "all") {
      fetchUsers();
    } else fetchFilteredUsers(selectedSalaryRange, selectedDepartment);
  }, [selectedSalaryRange, selectedDepartment]);

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id)); // อัปเดต state หลังจากลบ
        alert("User deleted successfully");
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงผลลัพธ์ที่อัปเดต
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-6 2xl:grid-cols-6 gap-5 ms-1">
        <div className="col-span-6 2xl:col-span-6 "></div>
        <div className="col-span-6 2xl:col-span-6 me-4 ">
          <Card className="mb-10">
            <div className="flex me-5 justify-between">
              <AddEmployeesButton />
              <div className="flex gap-3 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="px-4">Sort By Department</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Department</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {SelectDepartment.map((department) => (
                      <DropdownMenuItem
                      className={`cursor-pointer px-2 ${selectedDepartment === department.value ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                        key={department.value}
                        onClick={() => setSelectedDepartment(department.value)}
                      >
                        {department.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="px-4">Sort By Salary</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Salary Ranges</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {salaryRanges.map((salariesRange) => (
                      <DropdownMenuItem
                        className={`cursor-pointer px-2 ${selectedSalaryRange === salariesRange.value ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                        key={salariesRange.value}
                        onClick={() =>
                          setSelectedSalaryRange(salariesRange.value)
                        }
                      >
                        {salariesRange.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
              </div>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-md text-gray-700 dark:text-white uppercase ">
                <tr>
                  <th className="px-6 py-3">Id</th>
                  <th className="px-6 py-3">name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Position</th>
                  <th className="px-6 py-3">Salaries</th>
                </tr>
              </thead>
              <tbody>
                {users.map((row) => (
                  <tr className="border-b " key={row.id}>
                    <th className="px-6 py-3">{row.id}</th>
                    <td className="px-6 py-3">{row.name}</td>
                    <td className="px-6 py-3">{row.department}</td>
                    <td className="px-6 py-3">{row.position}</td>
                    <td className="px-6 py-3">{row.salary}</td>
                    <td className="px-6 py-3">
                      <button
                        className="btn cursor-pointer rounded-xl text-red-400 "
                        onClick={() => handleDeleteUser(row.id)}
                      >
                        <CircleMinus />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
