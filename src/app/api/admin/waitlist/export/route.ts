import { isValidAdminPassword, getWaitlistEntries, waitlistEntriesToCsv } from "@/lib/waitlistAdmin";

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
  const csv = waitlistEntriesToCsv(entries);
  const fileName = `dwtg_waitlist_${new Date().toISOString().split("T")[0]}.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv;charset=utf-8;",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}