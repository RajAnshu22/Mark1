import { NextRequest, NextResponse } from "next/server";
import { createShortCode } from "@/lib/store";

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const rawUrl = payload?.url;

  if (typeof rawUrl !== "string" || !isValidHttpUrl(rawUrl)) {
    return NextResponse.json({ error: "Please provide a valid http(s) URL." }, { status: 400 });
  }

  const code = createShortCode(rawUrl);
  const origin = new URL(request.url).origin;

  return NextResponse.json({
    code,
    shortUrl: `${origin}/r/${code}`
  });
}
