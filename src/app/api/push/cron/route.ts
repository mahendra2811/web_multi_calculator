import { NextRequest, NextResponse } from "next/server";
import { sendPushToAll } from "@/lib/push";
import { getTipForDate } from "@/lib/daily-tips";

// Called by Vercel Cron daily at 9:00 AM IST (3:30 UTC)
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tip = getTipForDate();
  const result = await sendPushToAll({
    title: tip.title,
    body: tip.body,
    url: tip.url,
    tag: tip.tag,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-96.png",
  });

  return NextResponse.json({ tip: tip.tag, ...result });
}
