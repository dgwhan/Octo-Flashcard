import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get("word")?.trim();

    if (!word) {
      return NextResponse.json(
        { message: "Vui lòng cung cấp từ khóa cần tra cứu." },
        { status: 400 }
      );
    }

    const targetUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`;

    const res = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { message: `Không tìm thấy định nghĩa cho từ "${word}".` },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: `Dịch vụ từ điển phản hồi mã lỗi ${res.status}.` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Lỗi kết nối máy chủ";
    return NextResponse.json(
      { message: "Không thể kết nối tới máy chủ từ điển.", error: errorMessage },
      { status: 500 }
    );
  }
}
