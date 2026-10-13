"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { endSession, isConfigured, startSession } from "@/lib/vertbook/auth";
import { deleteEnquiry, setEnquiryStatus } from "@/lib/vertbook/enquiries";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/vertbook/types";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isConfigured()) {
    return { error: "Vertbook is not set up yet. Add BACKEND_URL and BACKEND_API_KEY to the environment." };
  }
  try {
    await startSession(String(formData.get("password") ?? ""));
  } catch (error) {
    if (error instanceof ApiError && error.status !== 0) return { error: error.message };
    console.error("[vertbook] login failed", error);
    return { error: "Vertbook can't reach the server right now. Please try again in a minute." };
  }
  redirect("/vertbook");
}

export async function logout() {
  await endSession();
  redirect("/vertbook/login");
}

export async function updateStatus(formData: FormData) {
  const status = String(formData.get("status"));
  if (!enquiryStatuses.includes(status as EnquiryStatus)) return;
  await setEnquiryStatus(String(formData.get("id")), status as EnquiryStatus);
  revalidatePath("/vertbook");
}

export async function removeEnquiry(formData: FormData) {
  await deleteEnquiry(String(formData.get("id")));
  revalidatePath("/vertbook");
}
