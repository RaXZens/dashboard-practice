"use client";
import AppProfile from "@/components/AppAccount";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, UserCog, UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  name: string;
};

function Profile() {
  const [form, setForm] = useState({ email: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formControls, setFormControls] = useState<"email" | "name" | "">("");
  const [Users, setUser] = useState<User[]>([]);
  const router = useRouter();

  const handleClick = () => {
    setFormControls("");
    setError("");
    setSuccess("");
    window.location.reload(); // This will refresh the page
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setError(data.error);
    setSuccess(data.success);
    setForm({ email: "", name: "" });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/testUser");
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    };
    fetchUserData().catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  return (
    <div className="md:mx-30">
      <div className="grid grid-cols-3 gap-10 mt-5 ">
        <div className="col-span-3 lg:col-span-1">
          <AppProfile />
        </div>
        <div className="col-span-3 lg:col-span-2 ">
          <Card className="pb-2 ">
            <CardHeader>
              <CardTitle className="ps-2 pb-2 font-bold flex">
                <UserRoundPen className="me-2 " />
                Profile Setting
              </CardTitle>
              <CardDescription>
                This setting for management your profile
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="mt-3">
            <CardContent>
              <div
                id="form-controls"
                style={{
                  display: formControls === "" ? "block" : "none",
                }}
              >
                <div className="flex flex-col md:flex-row ">
                  <div className=" p-20  m-5 rounded-full">
                    <UserCog />
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 justify-center mb-5 md:mb-0">
                    <Button>Change Picture</Button>
                    <Button>Delete Picture</Button>
                  </div>
                </div>
              </div>
              <div
                id="form-controls"
                style={{
                  display: formControls === "" ? "block" : "none",
                }}
              >
                <div className="flex flex-col  sm:flex-row ">
                  <div className="">
                    <Label>
                      Email :
                      <a className="text-gray-500 font-light">
                        {Users[0]?.email}
                      </a>
                      <a
                        onClick={() => setFormControls("email")}
                        className="hover:underline text-blue-500 cursor-pointer"
                      >
                        change
                      </a>
                    </Label>
                  </div>
                  <div className="sm:ms-5 ">
                    <Label>
                      Name :
                      <a className="text-gray-500 font-light">
                        {Users[0]?.name}
                      </a>
                      <a
                        onClick={() => setFormControls("name")}
                        className="hover:underline text-blue-500 cursor-pointer"
                      >
                        change
                      </a>
                    </Label>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="hidden"
                style={{
                  display: formControls === "email" ? "block" : "none",
                }}
              >
                <div className="mb-2 flex ">
                  <ChevronLeft />
                  <a
                    onClick={handleClick}
                    className="hover:underline cursor-pointer "
                  >
                    Back
                  </a>
                </div>
                <div className="">
                  <Label className="mb-2">Email</Label>
                  <div className="flex">
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      placeholder="Email"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    ></Input>
                    <Button className="ms-2">Save</Button>
                  </div>
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  {success && <p className="text-green-500 ">{success}</p>}
                </div>
              </form>
              <form
                onSubmit={handleSubmit}
                className="hidden"
                style={{
                  display: formControls === "name" ? "block" : "none",
                }}
              >
                <div className="mb-2 flex ">
                  <ChevronLeft />
                  <a
                    onClick={handleClick}
                    className="hover:underline cursor-pointer "
                  >
                    Back
                  </a>
                </div>
                <div className="">
                  <Label className="mb-2">Name</Label>
                  <div className="flex">
                    <Input
                      id="name"
                      type="text"
                      value={form.name}
                      placeholder="Name"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    ></Input>
                    <Button className="ms-2">Save</Button>
                  </div>
                  {error && <p className="text-red-500 mb-2">{error}</p>}
                  {success && <p className="text-green-500 ">{success}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
