import { getWaitlistEntries, isValidAdminPassword } from "@/lib/waitlistAdmin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";

  try {
    if (!password || !isValidAdminPassword(password)) {
      return Response.json({ error: "Incorrect password." }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Server misconfigured." }, { status: 500 });
  }

  const entries = await getWaitlistEntries();
  const payload = entries.map((entry) => ({
    id: entry.id,
    email: entry.email,
    timestamp: entry.timestamp ? entry.timestamp.toISOString() : null,
  }));

  return Response.json({ entries: payload });
}