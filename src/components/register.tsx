"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavbarPublic from "@/components/ui/navbar";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      setSuccess(data.success);
      setForm({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
    }
    
    setLoading(false);
  };

  return (
    <div className=""><NavbarPublic/>
    <div className="flex justify-center ">
      <Card className="w-full max-w-sm mt-10">
        <CardHeader>
          <CardTitle>Register to create your account</CardTitle>
          <CardDescription>
            Enter your email below to Register to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </div>
              {Error && <p className="text-red-500 mb-2">{Error}</p>}
              {success && <p className="text-green-500 mb-2">{success}</p>}
              <div>
                <CardFooter className="flex flex-col gap-2 px-0">
                  <Button className="w-full" type="submit">
                    {loading && (
                      <div className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
                    )}
                    Register
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <a className=" w-full" href={"/login"}>
                      Cancel
                    </a>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
