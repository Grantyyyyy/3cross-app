import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://3cross-apps.example.com"),
  title: {
    default: "3Cross App Catalog",
    template: "%s · 3Cross App Catalog",
  },
  description:
    "A browsable directory of the web applications built for client 3Cross — for internal reference, client handoff, and portfolio use.",
  keywords: ["3Cross", "app catalog", "web apps", "directory", "portfolio"],
  openGraph: {
    title: "3Cross App Catalog",
    description:
      "A browsable directory of the web applications built for client 3Cross.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
