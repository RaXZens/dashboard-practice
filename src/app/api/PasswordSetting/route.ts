import bcrypt from "bcryptjs";
import { connection } from "../../lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/lib/auth";

export async function POST(req: Request) {
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

    const { currentPassword, newPassword } = body;

    if (!currentPassword && !newPassword) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const [CheckOldpassword] = await connection.query(
      "SELECT password FROM usersid WHERE id = ?",
      [session.user.id]
    );


    const Oldpassword = (CheckOldpassword as any[])[0].password;

    const CheckCompareOldPassword = await bcrypt.compare(
      currentPassword,
      Oldpassword
    );

    if (!CheckCompareOldPassword) {
      return NextResponse.json(
        { error: "Incorrect Current Password" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = "UPDATE usersid SET password = ? WHERE id = ?";
    await connection.query(query, [hashedPassword, session.user.id]);

    return NextResponse.json({ success: "Update Success." });
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
