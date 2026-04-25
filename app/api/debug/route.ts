import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  const conn = await connectDB();
  return NextResponse.json({
    database: conn.connection.name,
    host: conn.connection.host,
  });
}
