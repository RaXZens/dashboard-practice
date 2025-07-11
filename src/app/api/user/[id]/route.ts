import { NextResponse } from "next/server";
import { connection } from "../../../lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!connection) {
    console.error("Error: connection failed");
    return NextResponse.json(
      { message: "Database connection not initialized" },
      { status: 500 }
    );
  }

  try {
    const userId = await params.id;
    await connection.query("DELETE FROM activities WHERE user_id = ?", [
      userId,
    ]);
    await connection.query("DELETE FROM users WHERE id = ?", [userId]);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
