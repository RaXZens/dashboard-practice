import { NextResponse } from "next/server";
import { connection } from "../../../lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const salariesRange = url.searchParams.get("salariesRange");
    let department = url.searchParams.get("department");

    if (!connection) {
      console.error("Error: connection failed");
      return NextResponse.json(
        { message: "Database connection not initialized" },
        { status: 500 }
      );
    }
    let query =
      "SELECT u.id, u.name, u.email, u.department, u.position, s.salary FROM users u JOIN salaries s ON u.id = s.user_id ";
    const params: Array<any> = [];
    if (salariesRange && salariesRange !== "all") {
      if (salariesRange === "60000<") {
        query += "WHERE s.salary >= ? ";
        params.push(60000);
      } else {
        const [minSalary, maxSalary] = salariesRange.split("-").map(Number);
        if (isNaN(minSalary) || isNaN(maxSalary)) {
          return NextResponse.json(
            { message: "Invalid salary range" },
            { status: 400 }
          );
        }
        if (params.length > 0) {
          query += "And s.salary BETWEEN ? AND ? ";
        } else {
          query += "WHERE s.salary BETWEEN ? AND ? ";
        }
        params.push(minSalary, maxSalary);
      }

    }
    if (department && department !== "all") {
      query +=
        params.length > 0 ? "AND u.department = ? " : "WHERE u.department = ? ";
      params.push(department);

      query += "ORDER BY u.id ASC";
    }
    const rows = await connection.query(query, params);
    const users = rows[0];
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
