import type { Metadata } from "next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "MANAS Jewellers — Timeless Gold & Diamond Jewellery",
  description: "Exquisite BIS hallmarked gold, diamond and precious stone jewellery crafted by master artisans since 1985.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ minHeight: "60vh" }}>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
