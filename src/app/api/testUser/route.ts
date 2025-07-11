
import { connection } from "../../lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";

export async function GET() {
    if (!connection) {
      console.error("Errror :connection failed");
      return NextResponse.json(
        {
          error: "database connection not initialized",
        },
        { status: 500 }
      );
    }
  try {
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: User not logged in" }, { status: 401 });
    }
    
    const result = await connection.query("SELECT email,name FROM usersid WHERE id = ?;",[session.user.id]);
    const data = result[0]
    return NextResponse.json(data);
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 400 });
  }
}
