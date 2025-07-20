import { connection } from "../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface User {
  email: string;
}

export async function POST(req: Request) {
  try {
    if (!connection) {
      console.error("Errror :connection failed");
      return NextResponse.json({ error: "Database connection not initialized" }, { status: 500 });
    }

    const body = await req.json();
    const { email, password, name, confirmPassword } = body;

    if (!email || !password || !name || !confirmPassword) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const [users] = await connection.query(
      "SELECT * FROM usersid WHERE email = ?",
      [email]
    );
    if ((users as User[]).length > 0) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }
    if (confirmPassword != password) {
      return NextResponse.json(
        { error: "Incorrect confirm password." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      "INSERT INTO usersid (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return NextResponse.json({ success: "Create Account Success." });
  } catch {
    return NextResponse.json(
      { error: "internal Server Error." },
      { status: 500 }
    );
  }
}
