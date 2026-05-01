import type { ReactNode } from "react";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

export const metadata = {
  title: "SMART App",
  description: "Learn. Test. Unlock. Improve.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white p-2 rounded"
        >
          Skip to content
        </a>

        

        

        <div className="flex min-h-screen">
          <AppShell>
            {children}
          </AppShell>
        </div>

      </body>
    </html>
  );
}