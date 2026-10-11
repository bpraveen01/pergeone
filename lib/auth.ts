// ---------------------------------------------------------------------------
// LOGIN CONNECTION POINT
// The login page calls ONLY these three functions. Right now no login service is
// connected, so they answer "opening soon" and nobody can sign in.
// Later (Google sign-in / a database) you replace the inside of these three functions
// and the page itself does not need to change.
// ---------------------------------------------------------------------------
export const AUTH_ENABLED = false;
export type AuthResult = { ok: boolean; error?: string; message?: string };
const SOON = "Client login is opening soon. We'll let you know as soon as your account is ready.";

export async function signInWithPassword(_email: string, _password: string, _remember: boolean, _captchaToken: string): Promise<AuthResult> {
  if (!AUTH_ENABLED) return { ok: false, error: SOON };
  return { ok: false, error: "Login is not connected yet." };
}
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!AUTH_ENABLED) return { ok: false, error: SOON };
  return { ok: false, error: "Google sign-in is not connected yet." };
}
export async function requestPasswordReset(_email: string, _captchaToken: string): Promise<AuthResult> {
  if (!AUTH_ENABLED) return { ok: false, error: SOON };
  return { ok: false, error: "Password reset is not connected yet." };
}