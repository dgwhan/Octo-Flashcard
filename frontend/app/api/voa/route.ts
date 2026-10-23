import { NextRequest, NextResponse } from "next/server";
import { VOA_LESSONS } from "@/src/features/voa/voa.data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const level = searchParams.get("level") || "all";
  const category = searchParams.get("category") || "all";

  let results = VOA_LESSONS;

  if (level !== "all") {
    results = results.filter((l) => l.level === level);
  }

  if (category !== "all") {
    results = results.filter((l) => l.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q) ||
        l.paragraphs.some((p) => p.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    source: "archive.org-american-stories",
    total: results.length,
    lessons: results,
  });
}
