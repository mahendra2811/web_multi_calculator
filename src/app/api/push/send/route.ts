import { NextRequest, NextResponse } from "next/server";
import { sendPushToAll, type PushPayload } from "@/lib/push";

export async function POST(req: NextRequest) {
  // Protect with secret header
  const auth = req.headers.get("x-cron-secret");
  if (auth !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await req.json()) as PushPayload;
    if (!payload.title || !payload.body) {
      return NextResponse.json({ error: "title and body required" }, { status: 400 });
    }

    const result = await sendPushToAll({
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-96.png",
      ...payload,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
