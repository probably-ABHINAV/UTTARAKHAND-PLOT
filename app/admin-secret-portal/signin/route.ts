import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // 🔐 Dummy admin (replace with DB later)
  if (
    email === "admin@propertyinuttarakhand.com" &&
    password === "admin123"
  ) {
    return NextResponse.json({
      token: "admin-secret-token",
      admin: {
        email,
        role: "ADMIN",
      },
    })
  }

  return NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 }
  )
}
