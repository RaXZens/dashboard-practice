import { NextResponse } from "next/server";
import { connection } from "../../lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";


export async function PUT(req: Request) {
  try {
    if (!connection) {
      console.error("Errror :connection failed");
      return NextResponse.json(
        {
          massage: "database connection not initialized",
        },
        { status: 500 }
      );
    }
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: User not logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { email, name } = body;
    if (!email && !name) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }
    if (email) {
      const [users] = await connection.query(
        "SELECT * FROM usersid WHERE email = ?",
        [email]
      );
      if ((users as any[]).length > 0) {
        return NextResponse.json(
          { error: "User already exists." },
          { status: 400 }
        );
      }

      const query = "UPDATE usersid SET  email = ? WHERE id = ?";
      await connection.query(query, [email, session.user.id]);
    }
    if (name) {
      const query = "UPDATE usersid SET name = ? WHERE id = ?";
      await connection.query(query, [name, session.user.id]);
    }

    return NextResponse.json({ success: "Update Success." });
  } catch (error) {
    console.error("Register Eror", error);
    return NextResponse.json(
      { error: "internal Server Error." },
      { status: 500 }
    );
  }
}
