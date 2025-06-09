import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { phone, username, password } = await req.json();

    const trimmedPhone = phone?.trim();
    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedPhone || !trimmedUsername || !trimmedPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      return NextResponse.json(
        { message: "Phone number must be valid digits only (10–15 chars)" },
        { status: 400 }
      );
    }

    const usernameRegex = /^[A-Za-z]{3,}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        {
          message:
            "Username must contain only letters and be at least 3 characters long",
        },
        { status: 400 }
      );
    }

    if (trimmedPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ phone: trimmedPhone });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this phone number already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const user = await User.create({
      phone: trimmedPhone,
      username: trimmedUsername,
      password: hashedPassword,
    });

    console.log("New user created:", user._id);

    return NextResponse.json(
      { message: "User created successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
