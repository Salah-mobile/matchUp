import SideBar from "./Sidebar";
import TopBar from "./TopBar";

function DashboardLayout({ children, user }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex">
      <SideBar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar name={user?.name} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;