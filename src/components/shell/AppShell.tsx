"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full bg-black">

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`min-h-screen bg-gray-300 border-r p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
        aria-label="Main navigation"
      >
        {/* Header + toggle */}
        <div className="flex items-center justify-between mb-6">
          {isSidebarOpen && (
            <img
              src="/images/smart_logo.png"
              alt="SMART logo"
              className="w-40 h-10"
            />
          )}

          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar"
            className="p-2 text-sm border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
            <Link
                href="/"
                aria-label="Dashboard"
                className={`flex items-center gap-2 transition ${
                pathname === "/"
                    ? "text-black font-semibold border-l-4 border-black pl-2"
                    : "text-gray-600"
                } hover:text-black`}
            >
                <img
                src="/images/dashboard.png"
                alt="Dashboard"
                className="w-5 h-5 object-cover rounded"
                />
                {isSidebarOpen && "Dashboard"}
            </Link>

          <Link
            href="/learninghub"
            aria-label="Learning Hub"
            className={`flex items-center gap-2 transition ${
              pathname === "/learninghub"
                ? "text-black font-semibold border-l-4 border-black pl-2"
                : "text-gray-600"
            } hover:text-black`}
          >
            <img
                src="/images/learning_hub.png"
                alt="Learning Hub"
                className="w-5 h-5 object-cover rounded"
                />
                 {isSidebarOpen && "Learning Hub"}
          </Link>

          <Link
            href="/progress"
            aria-label="Progress"
            className={`flex items-center gap-2 transition ${
              pathname === "/progress"
                ? "text-black font-semibold border-l-4 border-black pl-2"
                : "text-gray-600"
            } hover:text-black`}
          >
            <img
                src="/images/progress_dash.png"
                alt="Progress"
                className="w-5 h-5 object-cover rounded"
                />
                 {isSidebarOpen && "Progress"}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}