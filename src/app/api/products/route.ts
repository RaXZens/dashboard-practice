import { connection } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await connection.query(
      `SELECT products.name ,Sum(order_items.quantity) AS total_sold FROM order_items 
      JOIN products ON order_items.product_id = products.id GROUP 
      BY order_items.product_id ORDER BY total_sold DESC LIMIT 5`
    );
    const TotalProducts = result[0];

    return NextResponse.json(TotalProducts);
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 400 });
  }
}
