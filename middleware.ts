import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Routes that require authentication
const PROTECTED_ROUTES = ["/admin/dashboard"];
const PROTECTED_API_ROUTES = ["/api/admin"];

// ── DEV BYPASS: set BYPASS_ADMIN_AUTH=true in .env.local to skip auth ──
const DEV_BYPASS = process.env.BYPASS_ADMIN_AUTH === "true";


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedPage = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedApi = PROTECTED_API_ROUTES.some((r) => pathname.startsWith(r));

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // ── DEV: skip auth if bypass is enabled ──────────────────────────────
  if (DEV_BYPASS) {
    return NextResponse.next();
  }

  // Read the Supabase auth cookie
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Create a Supabase client that reads from request cookies
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Redirect to login, preserving the original destination
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/admin/:path*",
  ],
};
