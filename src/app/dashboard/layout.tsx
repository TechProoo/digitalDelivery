import React from "react";
import Sidebar from "../../components/dashboard/sidebar";
import BottomNav from "../../components/dashboard/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      {children} <BottomNav />
    </Sidebar>
  );
}
