import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#f8fafc_100%)] text-slate-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
