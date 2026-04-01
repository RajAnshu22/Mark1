import { NextResponse } from "next/server";
import { getOriginalUrl } from "@/lib/store";

export function GET(_: Request, context: { params: { code: string } }) {
  const code = context.params.code;
  const url = getOriginalUrl(code);

  if (!url) {
    return NextResponse.json({ error: "Short link not found." }, { status: 404 });
  }

  return NextResponse.redirect(url, { status: 307 });
}
