"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "./ui/card";
import { CircleMinus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

const UsersPage = () => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);

  const [users, setUsers] = useState<user[]>([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // ดึงข้อมูลจาก API
    const fetchUsers = async () => {
      const response = await fetch("/api/user", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users); // เก็บข้อมูลใน state
      // เก็บข้อมูลใน state
    };
    fetchUsers();
  }, []);

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
              <div className="flex gap-0 ">
                <div className="p-2 border-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>Sort by Salaries</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="p-2 border-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      Sort By department
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
