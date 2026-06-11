import { supabase } from "./supabase";

/**
 * Get the current session (works in client components).
 * Returns null if the user is not logged in.
 */
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

/**
 * Get the currently logged-in user.
 * Returns null if not authenticated.
 */
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}

/**
 * Sign in with email and password.
 * Also validates the admin secret code before attempting Supabase login.
 */
export async function signInAdmin(
  email: string,
  password: string,
  secretCode: string
): Promise<{ success: boolean; error?: string }> {
  // Validate secret code first
  const expectedCode = process.env.NEXT_PUBLIC_ADMIN_SECRET_CODE;
  if (secretCode !== expectedCode) {
    return { success: false, error: "Invalid secret code." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  await supabase.auth.signOut();
}
