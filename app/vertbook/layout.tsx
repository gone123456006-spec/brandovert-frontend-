import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Vertbook" },
  robots: { index: false, follow: false },
};

export default function VertbookLayout({ children }: LayoutProps<"/vertbook">) {
  return <div className="min-h-dvh bg-surface">{children}</div>;
}
