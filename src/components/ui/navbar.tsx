'use client'

import { useTheme } from "next-themes";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function NavbarPublic() {
    const { theme, setTheme } = useTheme();

    const ToggleTheme = ()=>{
        if(theme==='dark'){
            setTheme("light");
        }else{
            setTheme("dark");
        }
    };

  return (
    <nav className="p-4 flex justify-between">
      <div>MyApp</div>
      <div className="space-x-4">
            <Switch onClick={ToggleTheme}></Switch>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}
