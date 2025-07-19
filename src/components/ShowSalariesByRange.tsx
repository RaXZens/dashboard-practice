"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleMinus } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

const salaryRanges = [
  { label: "10,000 - 20,000", value: "10000-20000" },
  { label: "20,000 - 30,000", value: "20000-30000" },
  { label: "30,000 - 50,000", value: "30000-50000" },
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>("10000-20000");

  useEffect(() => {
    fetchUsers(selectedSalaryRange);
  }, [selectedSalaryRange]);

  const fetchUsers = async (range: string) => {
    try {
      const response = await fetch(`/api/user?range=${range}`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const res = await fetch(`/api/user/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="grid grid-cols-6 gap-5">
      <div className="col-span-6">
        <Card>
          <div className="flex justify-between p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Sort by Salaries</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Salary Ranges</DropdownMenuLabel>
                {salaryRanges.map((range) => (
                  <DropdownMenuItem key={range.value} onClick={() => setSelectedSalaryRange(range.value)}>
                    {range.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-6 py-3">Id</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-3">{row.id}</td>
                  <td className="px-6 py-3">{row.name}</td>
                  <td className="px-6 py-3">{row.department}</td>
                  <td className="px-6 py-3">{row.position}</td>
                  <td className="px-6 py-3">{row.salary}</td>
                  <td className="px-6 py-3">
                    <button
                      className="text-red-400"
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
  );
};

export default UsersPage;
