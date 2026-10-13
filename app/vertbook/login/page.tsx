import { redirect } from "next/navigation";
import { hasSession, isConfigured } from "@/lib/vertbook/auth";
import { VertbookMark } from "../vertbook-mark";
import { LoginForm } from "./login-form";

export default async function VertbookLoginPage() {
  if (await hasSession()) redirect("/vertbook");

  return (
    <div className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-xl shadow-ink/5">
        <VertbookMark />
        <h1 className="mt-6 text-2xl font-bold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">Enquiries from the Brandovert website.</p>
        {isConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-strong">
            Vertbook is not set up yet. Add <code className="font-semibold">BACKEND_URL</code> and{" "}
            <code className="font-semibold">BACKEND_API_KEY</code> to the environment variables and restart the
            server.
          </p>
        )}
      </div>
    </div>
  );
}
