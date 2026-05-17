import { adminDb } from "@/lib/firebaseAdmin";

export interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: Date | null;
}

export function isValidAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("Server misconfigured.");
  }

  return password === adminPassword;
}

export async function getWaitlistEntries() {
  const snapshot = await adminDb.collection("waitlist").orderBy("timestamp", "desc").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as { email?: string; timestamp?: { toDate?: () => Date } };

    return {
      id: doc.id,
      email: data.email ?? "",
      timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : null,
    } satisfies WaitlistEntry;
  });
}

function escapeCsvValue(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function waitlistEntriesToCsv(entries: WaitlistEntry[]) {
  const header = ["Email", "Signed Up At"];
  const rows = entries.map((entry) => [
    escapeCsvValue(entry.email),
    escapeCsvValue(entry.timestamp ? entry.timestamp.toLocaleString() : "Unknown"),
  ]);

  return [header, ...rows].map((row) => row.join(",")).join("\n");
}