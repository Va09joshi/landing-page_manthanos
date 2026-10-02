import { NextResponse } from "next/server";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const MAX_BODY_BYTES = 100 * 1024;

export async function POST(request) {
  if (!apiBaseUrl) {
    return NextResponse.json({ message: "The API is not configured for this deployment." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "The application payload is too large." }, { status: 413 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "The application payload must be valid JSON." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ message: "The application payload is invalid." }, { status: 400 });
  }

  let response;
  try {
    response = await fetch(`${apiBaseUrl}/public/workspace-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return NextResponse.json({ message: "The application service is unavailable." }, { status: 502 });
  }

  const responseText = await response.text();
  let body = {};
  try {
    body = responseText ? JSON.parse(responseText) : {};
  } catch {
    body = { message: response.ok ? "Application submitted." : "The application service returned an invalid response." };
  }

  if (!response.ok) {
    return NextResponse.json(
      { message: body.message || body.error || "The application could not be submitted." },
      { status: response.status }
    );
  }

  return NextResponse.json(body, { status: response.status });
}
