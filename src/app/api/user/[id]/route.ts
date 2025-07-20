import { NextResponse } from "next/server";
import { connection } from "../../../lib/db";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  if (!connection) {
    console.error("Error: connection failed");
    return NextResponse.json(
      { message: "Database connection not initialized" },
      { status: 500 }
    );
  }

  try {
    const params = await context.params;
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID provided" },
        { status: 400 }
      );

    }
    await connection.query("DELETE FROM users WHERE id = ?", [id]);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
