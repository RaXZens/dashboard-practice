import { NextResponse } from "next/server";
import { connection } from "../../lib/db";

export async function GET() {
  if (!connection) {
    console.error("Errror :connection failed");
    return NextResponse.json(
      {
        massage: "database connection not initialized",
      },
      { status: 500 }
    );
  }

  try {
    const result = await connection.query(
      "SELECT id,email,role,created_at FROM users ORDER BY id ASC"
    );
    const SplituserResult = await connection.query(
      "SELECT role, COUNT(*) AS total_users FROM users GROUP BY role;"
    );
    const CountUsersResult = await connection.query(
      "SELECT COUNT(*) AS total_users FROM users"
    );
    const totalUsers = CountUsersResult[0];
    const Splitusers = SplituserResult[0];

    const users = result[0]
      // ถ้าไม่ใช้รูปแบบ [rows, fields] ให้ fallback ไปใช้ result.rows (สำหรับ pg ปกติ)
    // *** เพิ่มการตรวจสอบอีกครั้งหลังจากกำหนด users แล้ว ***
    if (!users || !Array.isArray(users)) {
      console.error(
        "Error: ข้อมูลผู้ใช้ (users) ที่ได้มาไม่ใช่ Array หลังจากปรับแล้ว"
      );
      return NextResponse.json(
        { message: "Invalid data format from database" },
        { status: 500 }
      );
    }

    // หากมีคอลัมน์อื่น ๆ ที่อาจเป็น Date หรือ BigInt ให้จัดการตรงนี้ด้วย
    // เช่น: createdAt: user.created_at ? new Date(user.created_at).toISOString() : null,
    return NextResponse.json({ users, totalUsers, Splitusers });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
