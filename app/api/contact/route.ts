import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }
  console.log("API contact:", data)
  return NextResponse.json({ ok: true }, { status: 200 })
}
