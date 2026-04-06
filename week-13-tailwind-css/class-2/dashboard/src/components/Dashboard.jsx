import React, { useState } from "react";
import { SidebarToggle } from "../icons/SidebarToggle";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent />
      </div>
    </>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  if (!sidebarOpen) {
    return (
      <div
        className="fixed top-0 left-0 cursor-pointer hover:bg-slate-200"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <SidebarToggle />
      </div>
    );
  }
  return (
    <div className="bg-pink-200 h-screen duration-500 w-0 md:w-48">
      <div
        className="cursor-pointer hover:bg-slate-200"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        <SidebarToggle />
      </div>
    </div>
  );
}
function MainContent() {
  return (
    <div className="w-full">
      <div className="w-full h-48 hidden md:block bg-black"></div>

      <div className="grid grid-cols-10">
        <div className="h-96 m-3 shadow-md hidden md:block relative -translate-y-24 bg-blue-100 md:col-span-2 col-span-10"></div>
        <div className="h-96 m-3 shadow-md bg-yellow-100 md:col-span-5 col-span-10"></div>
        <div className="h-96 m-3 shadow-md bg-red-100 md:col-span-3 col-span-10"></div>
      </div>
    </div>
  );
}
export default Dashboard;
