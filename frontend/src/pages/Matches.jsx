import { useEffect, useState } from "react";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            const response = await api.get("/FootballMatch");
            setMatches(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error);
            setMessage("Unable to load matches");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">
            <SideBar />

            <main className="min-w-0 flex-1 p-6">
                <section className="w-full space-y-6">

                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Matches
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Discover and manage football matches
                        </p>
                    </div>

                    {message && (
                        <div className="rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-red-400">
                            {message}
                        </div>
                    )}

                    {loading ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                            <p className="text-slate-400">
                                Loading matches...
                            </p>
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                                <span className="text-2xl">⚽</span>
                            </div>

                            <h2 className="text-xl font-bold text-white">
                                No Matches Yet
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                There are no matches available at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {matches.map((match) => (
                                <div
                                    key={match.id}
                                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                                            Match #{match.id}
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            {match.time}
                                        </span>
                                    </div>

                                    <div className="my-8 flex items-center justify-between gap-4">
                                        <div className="flex-1 text-center">
                                            <p className="font-bold text-white">
                                                {match.team1?.name}
                                            </p>
                                        </div>

                                        <span className="text-sm font-bold text-slate-600">
                                            VS
                                        </span>

                                        <div className="flex-1 text-center">
                                            <p className="font-bold text-white">
                                                {match.team2?.name || "Open"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t border-slate-800 pt-4">
                                        <p className="text-sm text-slate-400">
                                            📅 {match.day}
                                        </p>

                                        <p className="text-sm text-slate-400">
                                            📍 {match.place}
                                        </p>
                                    </div>

                                    <button
                                        className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                                    >
                                        View Match
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </section>
            </main>
        </div>
    );
}

export default Matches;