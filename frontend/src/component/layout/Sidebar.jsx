import { Link } from "react-router-dom";

function SideBar({user}){
    return <>
          <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900 md:flex">
                    <div className="border-b border-slate-800 px-6 py-6">
                        <h1 className="text-2xl font-bold">
                            <span className="text-emerald-400">Match</span>Up
                        </h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Football Management
                        </p>
                    </div>
                    <nav className="flex-1 px-4 py-6">
                        <Link
                            to="/Dashbord"
                            className="mb-2 flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
                        >
                            Overview
                        </Link>
                        <Link
                            to="/profile"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            My Profile
                        </Link>
                        <Link
                            to="/myteam"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            My Team
                        </Link>
                        <Link
                            to="/matches"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            Find a Match
                        </Link>
                        <Link
                            to="/my-matches"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            My Matches
                        </Link>
                        <Link
                            to="/invitations"
                            className="mb-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            <div className="flex items-center gap-3">
                                Invitations
                            </div>
                        </Link>
                        <Link
                            to="/classment"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            Classment
                        </Link>
                        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Progress
                        </p>
                        <Link
                            to="/achievements"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            Achievements
                        </Link>
                        <Link
                            to="/settings"
                            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                            Settings
                        </Link>
                    </nav>
                    <div className="border-t border-slate-800 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-slate-950">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {user?.name} {user?.lastname}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
    </>
}
export default SideBar;