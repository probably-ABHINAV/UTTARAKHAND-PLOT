import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (email === "admin@gmail.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        token: "admin-token-123",
        admin: { email },
      })
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
