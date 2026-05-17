import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  await adminDb.collection("waitlist").add({
    email,
    timestamp: new Date(),
  });

  return Response.json({ ok: true }, { status: 201 });
}