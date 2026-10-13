"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { login, type LoginState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-6 grid gap-3">
      <label htmlFor="password" className="text-sm font-medium text-ink">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        aria-invalid={state.error ? true : undefined}
        aria-describedby={state.error ? "password-error" : undefined}
        className="h-11 rounded-xl border border-border bg-white px-3.5 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 aria-invalid:border-brand"
      />
      {state.error && (
        <p id="password-error" role="alert" className="text-sm text-brand">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand font-semibold text-white transition hover:bg-brand-strong disabled:opacity-70"
      >
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
        Open Vertbook
      </button>
    </form>
  );
}
