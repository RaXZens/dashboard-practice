import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { KeyRound, UserRoundPen } from "lucide-react";
import Link from "next/link";

function AppProfile() {
  return (
    <div className="">
      <h1 className="font-bold text-3xl ms-8">Account Setting</h1>

        <div className="mt-4">
          <Card className="gap-0 pb-0">
            <CardHeader className="p-0 ">
              <CardTitle className="ps-4 pb-2 font-bold">Personal</CardTitle>
              <hr></hr>
            </CardHeader>

            <Link href={"/dashboard/Account/profile"}>
              {" "}
              <div className="flex mx-1 mt-2 ps-6 p-2 font-semibold hover:bg-gray-100 rounded-xl dark:hover:bg-neutral-500 cursor-default">
                <UserRoundPen className="me-2" /> Profile
              </div>
            </Link>
            <Link href={"/dashboard/Account/password"}>
              {" "}
              <div className="flex mx-1 mb-2 ps-6 p-2 font-semibold hover:bg-gray-100 rounded-xl dark:hover:bg-neutral-500 cursor-default">
                <KeyRound className="me-2" />
                Password
              </div>
            </Link>
          </Card>
        </div>
        
      </div>

  );
}

export default AppProfile;
