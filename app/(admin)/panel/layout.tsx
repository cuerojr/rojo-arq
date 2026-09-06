import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen px-4 py-6 sm:px-6">{children}</div>;
}
