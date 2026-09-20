import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

function UpcomingMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            const response = await api.get("/matchs/my-matches");

            const data = response.data.data || [];

            const upcoming = data
                .filter(match => match.status === "open" || match.status === "full")
                .sort((a, b) => {
                    const dateA = new Date(`${a.day}T${a.time}`);
                    const dateB = new Date(`${b.day}T${b.time}`);

                    return dateA - dateB;
                })
                .slice(0, 3);

            setMatches(upcoming);
        } catch (error) {
            console.log(
                error.response?.data || error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-bold text-white">
                        Upcoming Matches
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Your next football matches
                    </p>
                </div>

                <Link
                    to="/my-matches"
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                    View all
                </Link>

            </div>

            {loading ? (

                <div className="py-10 text-center">
                    <p className="text-sm text-slate-500">
                        Loading matches...
                    </p>
                </div>

            ) : matches.length === 0 ? (

                <div className="py-10 text-center">

                    <h3 className="mt-4 font-semibold text-white">
                        No upcoming matches
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Your upcoming matches will appear here.
                    </p>

                    <Link
                        to="/matches"
                        className="mt-5 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                        Find a Match
                    </Link>

                </div>

            ) : (

                <div className="mt-6 space-y-4">

                    {matches.map(match => {

                        const team1Players = (match.players || []).filter(
                            player =>
                                Number(player.team_id) ===
                                Number(match.team1?.id)
                        );

                        const team2Players = (match.players || []).filter(
                            player =>
                                Number(player.team_id) ===
                                Number(match.team2?.id)
                        );

                        return (
                            <div
                                key={match.id}
                                className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                            >

                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            {match.day} · {match.time}
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {match.place?.name || "Unknown place"}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {match.place?.city || ""}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center gap-4">

                                        <div className="text-center">
                                            <p className="font-semibold text-white">
                                                {match.team1?.name || "-"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {team1Players.length}/5
                                            </p>
                                        </div>

                                        <span className="font-bold text-slate-600">
                                            VS
                                        </span>

                                        <div className="text-center">
                                            <p className="font-semibold text-white">
                                                {match.team2?.name || "Waiting"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {match.team2
                                                    ? `${team2Players.length}/5`
                                                    : "Waiting"
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(`/matches/${match.id}`)
                                        }
                                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                                    >
                                        View Match
                                    </button>

                                </div>

                            </div>
                        );
                    })}

                </div>

            )}

        </section>
    );
}

export default UpcomingMatches;

