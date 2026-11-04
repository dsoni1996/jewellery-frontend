import type { Metadata } from "next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { SITE } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.fullName} — Trendy Imitation Jewellery`,
  description: SITE.description,
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
