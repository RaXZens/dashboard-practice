"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Moon, Settings, Sun, User, UserCog } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./sidebar";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <nav className="p-4 flex items-center justify-between">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <Link href="/dashboard">Dashboard</Link>
        {/* THEMEMENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* USERMENU */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback><UserCog /></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/dashboard/Account/profile"}>
              <DropdownMenuItem>
                <User className="h-[1.2rem] w=[1.2rem] mr-2"></User>
                Account
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
