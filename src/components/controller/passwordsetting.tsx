"use client";
import AppProfile from "@/components/controller/AppAccount";
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
import { KeyRound } from "lucide-react";
import { useState } from "react";

function PasswordSetting() {
  const [formPassword, setFormPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/PasswordSetting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formPassword),
    });

    const data = await res.json();

    setError(data.error);
    setSuccess(data.success);

    setFormPassword({ currentPassword: "", newPassword: "" });
  };

  return (
    <div className="md:mx-30">
      <div className="grid grid-cols-3 gap-10 mt-5 ">
        <AppProfile />
        <div className="col-span-2">
          <Card className="pb-2 ">
            <CardHeader>
              <CardTitle className="ps-2 pb-2 font-bold flex">
                <KeyRound className="me-2" />
                Password Setting
              </CardTitle>
              <CardDescription>
                This Setting For Change Password
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="mt-3">
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <Label className="mb-2">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      value={formPassword.currentPassword}
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          currentPassword: e.target.value,
                        })
                      }
                    ></Input>
                  </div>
                  <div className="">
                    <Label className="mb-2">New Password</Label>
                    <Input
                      id="NewPassword"
                      type="password"
                      placeholder="New Password"
                      value={formPassword.newPassword}
                      onChange={(e) =>
                        setFormPassword({
                          ...formPassword,
                          newPassword: e.target.value,
                        })
                      }
                    ></Input>
                  </div>
                </div>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 ">{success}</p>}
                <Button className="mt-4">Save</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PasswordSetting;