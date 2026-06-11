import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { createAdminClient } from "@/lib/supabase";
import { type Booking } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "csv"; // "csv" | "excel"
    const idsParam = searchParams.get("ids"); // comma-separated IDs (optional)

    const adminSupabase = createAdminClient();

    // Build query
    let query = adminSupabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      query = query.in("id", ids);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const bookings: Booking[] = data || [];

    // Transform data for export
    const rows = bookings.map((b) => ({
      ID: b.id,
      Name: b.name,
      Email: b.email,
      Company: b.company,
      Services: b.services.join(", "),
      Message: b.message,
      Status: b.status,
      "Submitted At": new Date(b.created_at).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    const filename = `zth-bookings-${new Date().toISOString().slice(0, 10)}`;

    if (format === "csv") {
      // Generate CSV
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      });
    } else {
      // Generate Excel (.xlsx)
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(rows);

      // Column widths
      worksheet["!cols"] = [
        { wch: 36 }, // ID
        { wch: 22 }, // Name
        { wch: 30 }, // Email
        { wch: 24 }, // Company
        { wch: 35 }, // Services
        { wch: 60 }, // Message
        { wch: 12 }, // Status
        { wch: 22 }, // Date
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
        },
      });
    }
  } catch (error: unknown) {
    console.error("admin/export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
