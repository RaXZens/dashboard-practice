"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useTheme } from "next-themes";
import NavbarPublic from "@/components/ui/navbar";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const [Error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const Form = e.target as HTMLFormElement;
    const Email = Form.email as HTMLInputElement;
    const Password = Form.password as HTMLInputElement;
    setError("");
    setLoading(true);
    if (!Email.value || !Password.value) {
      setLoading(false);
      setError("Please fill out all fields");
      return; // หยุดทำการ submit
    }

    if (Email.checkValidity() && Password.checkValidity()) {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (res?.ok) {
        router.push("/dashboard");
        setLoading(true);
      } else {
        setError("Failed to Login Please check your email and password");
        setLoading(false);
      }
    } else {
      setError("Invalid email or password format.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <NavbarPublic />
        <div className="flex justify-center">
          <Card className="w-full max-w-sm mt-10">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link">
                  <Link href={"/register"}>Sign Up</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      placeholder="Email"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="/" className="text-sm text-gray-500">
                        Forgot password?
                      </a>
                    </div>
                    <div className="">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </div>
                    {Error && <p className="text-red-500 mb-2">{Error}</p>}
                  </div>

                  <div className="">
                    <CardFooter className="flex-col gap-2 p-0">
                      <Button type="submit" className="w-full ">
                        {loading && (
                          <div className="animate-spin rounded-full h-5 w-5 border-4 border-white border-t-transparent dark:border-black dark:border-t-transparent" />
                        )}
                        Login
                      </Button>

                      <Button variant="outline" className="w-full">
                        Login with Google
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
