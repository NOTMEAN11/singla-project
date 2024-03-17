import React from "react";
import SideBar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";

function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default BackofficeLayout;
