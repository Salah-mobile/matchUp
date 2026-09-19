import { useEffect, useState } from "react";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function MyMatchs() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const loadMyMatches = async () => {
        try {
            setLoading(true);

            const response = await api.get("/matchs/my-matches");

            setMatches(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error);
            setMessage(
                error.response?.data?.message ||
                "Unable to load your matches"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMyMatches();
    }, []);

    const getResult = (match) => {
        const player = JSON.parse(localStorage.getItem("player"));

        if (match.status !== "finished") {
            return "upcoming";
        }

        const myTeamId =
            match.team1?.id === player?.team_id
                ? match.team1.id
                : match.team2?.id === player?.team_id
                    ? match.team2.id
                    : null;

        if (!myTeamId || !match.winner) {
            return "draw";
        }

        if (Number(match.winner.id) === Number(myTeamId)) {
            return "win";
        }

        return "loss";
    };

    const wins = matches.filter(match => getResult(match) === "win").length;
    const losses = matches.filter(match => getResult(match) === "loss").length;
    const draws = matches.filter(match => getResult(match) === "draw").length;
    const total = matches.filter(
        match => match.status === "finished"
    ).length;

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <SideBar />

                <main className="flex flex-1 items-center justify-center">
                    <p className="text-slate-400">
                        Loading matches...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <SideBar />

            <main className="min-w-0 flex-1 p-6">
                <section className="w-full space-y-6">

                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            My Matches
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Track your team's matches and results
                        </p>
                    </div>

                    {message && (
                        <div className="rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-red-400">
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">
                                Matches Played
                            </p>

                            <p className="mt-3 text-3xl font-bold text-white">
                                {total}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">
                                Wins
                            </p>

                            <p className="mt-3 text-3xl font-bold text-emerald-400">
                                {wins}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">
                                Losses
                            </p>

                            <p className="mt-3 text-3xl font-bold text-red-400">
                                {losses}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <p className="text-sm text-slate-400">
                                Draws
                            </p>

                            <p className="mt-3 text-3xl font-bold text-yellow-400">
                                {draws}
                            </p>
                        </div>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white">
                                Match History
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your team's previous and upcoming matches
                            </p>
                        </div>

                        {matches.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                                    <span className="text-2xl">
                                        ⚽
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white">
                                    No matches yet
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Your team has not played any matches yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {matches.map(match => {
                                    const result = getResult(match);

                                    return (
                                        <div
                                            key={match.id}
                                            className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                                        >
                                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                                                            Match #{match.id}
                                                        </span>

                                                        <span className="text-sm text-slate-500">
                                                            {match.day}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 flex items-center gap-4">
                                                        <span className="font-bold text-white">
                                                            {match.team1?.name}
                                                        </span>

                                                        <span className="text-xs font-bold text-slate-600">
                                                            VS
                                                        </span>

                                                        <span className="font-bold text-white">
                                                            {match.team2?.name || "Waiting for opponent"}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                                                        <span>
                                                            🕐 {match.time}
                                                        </span>

                                                        <span>
                                                            📍 {match.place}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">

                                                    {result === "win" && (
                                                        <span className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
                                                            WIN
                                                        </span>
                                                    )}

                                                    {result === "loss" && (
                                                        <span className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400">
                                                            LOSS
                                                        </span>
                                                    )}

                                                    {result === "draw" && (
                                                        <span className="rounded-lg bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400">
                                                            DRAW
                                                        </span>
                                                    )}

                                                    {result === "upcoming" && (
                                                        <span className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
                                                            {match.status === "full"
                                                                ? "UPCOMING"
                                                                : "OPEN"}
                                                        </span>
                                                    )}

                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>

                </section>
            </main>
        </div>
    );
}

export default MyMatchs;
