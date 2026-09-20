import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function MatchDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [result, setResult] = useState("");

    const loadMatch = async () => {
        try {
            setLoading(true);

            const response = await api.get(`/matchs/${id}`);

            setMatch(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to load match"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMatch();
    }, [id]);

    const finishMatch = async () => {
        setError("");
        setMessage("");

        if (!result) {
            setError("Please select the result.");
            return;
        }

        try {
            const response = await api.post(
                `/matchs/${id}/finish`,
                {
                    result
                }
            );

            setMessage(
                response.data.message ||
                "Match finished successfully"
            );

            setMatch(response.data.match);
            setResult("");
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to finish match"
            );
        }
    };

    const team1Players =
        match?.players?.filter(
            player =>
                Number(player.team_id) ===
                Number(match.team1?.id)
        ) || [];

    const team2Players =
        match?.players?.filter(
            player =>
                Number(player.team_id) ===
                Number(match.team2?.id)
        ) || [];

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <SideBar />

                <main className="flex flex-1 items-center justify-center">
                    <p className="text-slate-400">
                        Loading match...
                    </p>
                </main>
            </div>
        );
    }

    if (!match) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <SideBar />

                <main className="flex flex-1 items-center justify-center">
                    <p className="text-red-400">
                        Match not found
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-950">

            <SideBar />

            <main className="min-w-0 flex-1 p-6">

                <div className="mx-auto max-w-6xl space-y-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Match #{match.id}
                            </h1>

                            <p className="mt-2 text-slate-400">
                                Match details and players
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/matches")}
                            className="rounded-lg bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                        >
                            Back to Matches
                        </button>

                    </div>

                    {message && (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-400">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

                            <div>
                                <p className="text-sm text-slate-400">
                                    Status
                                </p>

                                <p className="mt-2 font-bold text-white">
                                    {match.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Date
                                </p>

                                <p className="mt-2 font-bold text-white">
                                    {match.day}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Time
                                </p>

                                <p className="mt-2 font-bold text-white">
                                    {match.time}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400">
                                    Place
                                </p>

                                <p className="mt-2 font-bold text-white">
                                    {match.place?.name || "-"}
                                </p>
                            </div>

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div className="rounded-xl bg-slate-800 p-4">
                                <p className="text-sm text-slate-400">
                                    Address
                                </p>

                                <p className="mt-2 text-white">
                                    {match.place?.adress || "-"}
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-800 p-4">
                                <p className="text-sm text-slate-400">
                                    Price
                                </p>

                                <p className="mt-2 font-semibold text-emerald-400">
                                    {match.place?.price || 0} DH
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                            <div className="flex items-center justify-between">

                                <h2 className="text-xl font-bold text-white">
                                    {match.team1?.name || "Team 1"}
                                </h2>

                                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                    {team1Players.length}/5
                                </span>

                            </div>

                            <div className="mt-5 space-y-3">

                                {team1Players.length === 0 ? (
                                    <p className="text-slate-500">
                                        No players joined yet
                                    </p>
                                ) : (
                                    team1Players.map(player => (
                                        <div
                                            key={player.id}
                                            className="rounded-lg bg-slate-800 px-4 py-3"
                                        >
                                            <p className="font-semibold text-white">
                                                {player.player?.name || "-"}{" "}
                                                {player.player?.lastname || ""}
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                            <div className="flex items-center justify-between">

                                <h2 className="text-xl font-bold text-white">
                                    {match.team2?.name || "Waiting for opponent"}
                                </h2>

                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                                    {team2Players.length}/5
                                </span>

                            </div>

                            <div className="mt-5 space-y-3">

                                {team2Players.length === 0 ? (
                                    <p className="text-slate-500">
                                        No players joined yet
                                    </p>
                                ) : (
                                    team2Players.map(player => (
                                        <div
                                            key={player.id}
                                            className="rounded-lg bg-slate-800 px-4 py-3"
                                        >
                                            <p className="font-semibold text-white">
                                                {player.player?.name || "-"}{" "}
                                                {player.player?.lastname || ""}
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>

                    </div>

                    {match.winner && (
                        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">

                            <p className="text-sm text-emerald-400">
                                Winner
                            </p>

                            <p className="mt-2 text-2xl font-bold text-white">
                                {match.winner.name}
                            </p>

                        </div>
                    )}

                    {match.status === "finished" && !match.winner && (
                        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">

                            <p className="text-xl font-bold text-yellow-400">
                                Draw
                            </p>

                        </div>
                    )}

                    {match.can_finish && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                            <h2 className="text-xl font-bold text-white">
                                Finish Match
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Choose the result of the match.
                            </p>

                            <div className="mt-5 space-y-3">

                                <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-slate-800 p-4">

                                    <input
                                        type="radio"
                                        name="result"
                                        value="win"
                                        checked={result === "win"}
                                        onChange={event =>
                                            setResult(event.target.value)
                                        }
                                    />

                                    <span className="text-white">
                                        My team won
                                    </span>

                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-slate-800 p-4">

                                    <input
                                        type="radio"
                                        name="result"
                                        value="loss"
                                        checked={result === "loss"}
                                        onChange={event =>
                                            setResult(event.target.value)
                                        }
                                    />

                                    <span className="text-white">
                                        My team lost
                                    </span>

                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-slate-800 p-4">

                                    <input
                                        type="radio"
                                        name="result"
                                        value="draw"
                                        checked={result === "draw"}
                                        onChange={event =>
                                            setResult(event.target.value)
                                        }
                                    />

                                    <span className="text-white">
                                        Draw
                                    </span>

                                </label>

                            </div>

                            <button
                                onClick={finishMatch}
                                className="mt-5 w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500"
                            >
                                Confirm Result
                            </button>

                        </div>
                    )}

                </div>

            </main>

        </div>
    );
}

export default MatchDetails;