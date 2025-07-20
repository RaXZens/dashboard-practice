import { connection } from "../../lib/db";
import { NextResponse } from "next/server";

interface EmployeeData {
  name: string;
  department: string;
  position: string;
  salary: number;
}

export async function POST(req: Request) {
  try {
    if (!connection) {
      console.error("Error: connection failed");
      return NextResponse.json(
        { error: "Database connection not initialized" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, department, position, salary } = body;

    if (!name || !department || !position || !salary || salary === 0) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    if (department === "Null" || position === "Null") {
      return NextResponse.json(
        { error: "Please select a valid department and position." },
        { status: 400 }
      );
    }
    if (salary < 5000) {
      return NextResponse.json(
        { error: "Salary Must not be less than 5000" },
        { status: 400 }
      );
    }

    const [existingUsers] = await connection.query(
      "SELECT * FROM users WHERE name = ? AND department = ? AND position = ?",
      [name, department, position]
    );

    if ((existingUsers as EmployeeData[]).length > 0) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }


    await connection.query(
      "INSERT INTO users (name, department, position) VALUES (?, ?, ?)",
      [name, department, position]
    );
    await connection.query('INSERT INTO salaries (user_id, salary) VALUES (LAST_INSERT_ID(), ?)', [salary]);

    return NextResponse.json(
      { success: "Employee added successfully." },
      { status: 200 });
  } catch (error) {
    console.error("Error in AddEmployees API", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
