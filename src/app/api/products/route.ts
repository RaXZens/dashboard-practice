import { connection } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await connection.query(
      `SELECT u.department, SUM(s.salary) AS total_salary
      FROM users u
      JOIN salaries s ON u.id = s.user_id
      GROUP BY u.department
      ORDER BY total_salary DESC`
    );

    const salariesresult = await connection.query(
      "SELECT SUM(salary) AS salaries FROM salaries"
    );

    const salaries = salariesresult[0];
    const TotalProducts = result[0];
    console.debug(TotalProducts);
    console.debug(salaries);
    return NextResponse.json({ TotalProducts, salaries });
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 400 });
  }
}
