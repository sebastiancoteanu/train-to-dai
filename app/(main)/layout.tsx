import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-svh">
      <Navbar />
      {children}
    </section>
  );
}
