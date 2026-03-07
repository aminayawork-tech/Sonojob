import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SonoJob — Ultrasound Jobs for Sonographers",
  description:
    "Find sonographer jobs nationwide. Search by specialty, credential, facility type, and more. Built exclusively for the ultrasound community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <footer
          className="border-t mt-20 py-10 text-center text-sm"
          style={{ borderColor: "#e2e8f0", color: "#94a3b8", background: "#fff" }}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <span>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "#0ea5e9" }}>Sono</span>
              <span style={{ color: "#f59e0b" }}>Job</span>. Built for the
              ultrasound community.
            </span>
            <div className="flex gap-5">
              <a href="/jobs" className="hover:text-[#0f172a] transition-colors">
                Find Jobs
              </a>
              <a
                href="/employers"
                className="hover:text-[#0f172a] transition-colors"
              >
                For Employers
              </a>
              <a
                href="/about"
                className="hover:text-[#0f172a] transition-colors"
              >
                About
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
