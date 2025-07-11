"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";

interface user {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

const UsersPage = () => {
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
  return (
    <div className="md:mx-30">
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="ms-8">
          <Card className="">
            <CardHeader>Users management</CardHeader>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="mb-10">
            <CardHeader>Users management</CardHeader>
            <table className="w-full text-sm text-left">
              <thead className="text-md text-gray-700 dark:text-white uppercase ">
                <tr>
                  <th className="px-6 py-3">Id</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">created_at</th>
                </tr>
              </thead>
              <tbody>
                {users.map((row) => (
                  <tr className="border-b " key={row.id}>
                    <th className="px-6 py-3">{row.id}</th>
                    <td className="px-6 py-3">{row.email}</td>
                    <td className="px-6 py-3">{row.role}</td>
                    <td className="px-6 py-3">{row.created_at}</td>
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
