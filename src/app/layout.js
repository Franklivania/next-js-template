import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Next.js Starter Template",
  description:
    "A modern Next.js starter template with shadcn/ui, Tailwind CSS, and essential components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full max-w-[120em] mx-auto h-full overflow-x-hidden ${poppins.variable} antialiased`}
      >
        <Link
          href="https://github.com/Franklivania/nextjs-starter-template"
          target="_blank"
          className="fixed top-4 right-4"
        >
          <Button variant="outline" size="sm" radius="sm">
            <Icon icon="mdi:github" className="w-6 h-6" />
            Star on GitHub
          </Button>
        </Link>
        <Toaster richColors closeButton position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
