"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface user {
  id: number;
  email: string;
}

const TableHeaderdata = [
  {
    id: "id",
    header: "Email",
  },
];

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
    };
    fetchUsers();
  }, []);
  return (
    <div className="">
      <Card className="w-full h-full">
        <CardHeader>Users management</CardHeader>
        <Table>
          <TableHeader>
            {TableHeaderdata.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead key={headerGroup.id}>{headerGroup.id}{headerGroup.header}</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>{row.id}{row.email}</TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default UsersPage;
