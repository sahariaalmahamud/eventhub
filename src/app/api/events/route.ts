import { NextResponse } from "next/server";
import { createEvent, listEvents } from "@/lib/events";

export async function GET() {
  const result = await listEvents({ page: 1, perPage: 20 });
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const event = await createEvent(payload);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
