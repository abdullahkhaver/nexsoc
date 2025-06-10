import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import {User} from "@/models/user.model";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}, "-password"); 

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to load users" },
      { status: 500 }
    );
  }
}
