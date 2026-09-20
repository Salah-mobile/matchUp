import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Matches() {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            setLoading(true);

            const response = await api.get("/matchs");

            setMatches(response.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to load matches"
            );
        } finally {
            setLoading(false);
        }
    };

    const joinMatch = async (matchId) => {
        setMessage("");
        setError("");

        try {
            const response = await api.post(
                `/matchs/${matchId}/join`
            );

            setMessage(
                response.data.message ||
                "Your team joined successfully"
            );

            await loadMatches();
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to join match"
            );
        }
    };

    const joinPlayer = async (matchId) => {
        setMessage("");
        setError("");

        try {
            const response = await api.post(
                `/matchs/${matchId}/join-player`
            );

            setMessage(
                response.data.message ||
                "You joined the match successfully"
            );

            await loadMatches();
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to join match"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading matches...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Football Matches
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Find a match and join your team.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/create-match")}
                        className="bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-lg font-semibold transition"
                    >
                        + Create Match
                    </button>

                </div>

                {message && (
                    <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg px-4 py-3">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3">
                        {error}
                    </div>
                )}

                {matches.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
                        <h2 className="text-xl font-semibold">
                            No matches available
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Create the first match.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {matches.map((match) => {

                            const players =
                                match.players || [];

                            const team1Players =
                                players.filter(
                                    player =>
                                        Number(player.team_id) ===
                                        Number(match.team1?.id)
                                );

                            const team2Players =
                                players.filter(
                                    player =>
                                        Number(player.team_id) ===
                                        Number(match.team2?.id)
                                );

                            return (
                                <div
                                    key={match.id}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                                >

                                    <div className="p-5">

                                        <div className="flex justify-between items-center mb-5">

                                            <span className="text-sm text-slate-400">
                                                Match #{match.id}
                                            </span>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    match.status === "open"
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : match.status === "full"
                                                        ? "bg-blue-500/10 text-blue-400"
                                                        : match.status === "finished"
                                                        ? "bg-purple-500/10 text-purple-400"
                                                        : "bg-red-500/10 text-red-400"
                                                }`}
                                            >
                                                {match.status}
                                            </span>

                                        </div>

                                        <div className="space-y-2 mb-5">

                                            <div className="flex justify-between">
                                                <span className="text-slate-400">
                                                    Date
                                                </span>

                                                <span>
                                                    {match.day}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-400">
                                                    Time
                                                </span>

                                                <span>
                                                    {match.time}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-400">
                                                    Place
                                                </span>

                                                <span>
                                                    {match.place?.name || "-"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-slate-400">
                                                    City
                                                </span>

                                                <span>
                                                    {match.place?.city || "-"}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="border-t border-slate-800 pt-5">

                                            <div className="flex items-center justify-between">

                                                <div className="text-center flex-1">

                                                    <p className="font-semibold">
                                                        {match.team1?.name || "-"}
                                                    </p>

                                                    <p className="text-sm text-slate-400 mt-1">
                                                        {team1Players.length}/5 players
                                                    </p>

                                                </div>

                                                <div className="px-4 text-slate-500 font-bold">
                                                    VS
                                                </div>

                                                <div className="text-center flex-1">

                                                    <p className="font-semibold">
                                                        {match.team2?.name || "Waiting"}
                                                    </p>

                                                    <p className="text-sm text-slate-400 mt-1">
                                                        {match.team2
                                                            ? `${team2Players.length}/5 players`
                                                            : "No team"}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-5">

                                            {match.status === "open" &&
                                                !match.team2 && (
                                                    <button
                                                        onClick={() =>
                                                            joinMatch(match.id)
                                                        }
                                                        className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-3 font-semibold transition"
                                                    >
                                                        Join With My Team
                                                    </button>
                                                )}

                                            {match.status === "open" &&
                                                match.team2 && (
                                                    <button
                                                        onClick={() =>
                                                            joinPlayer(match.id)
                                                        }
                                                        className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-lg py-3 font-semibold transition"
                                                    >
                                                        Join Match
                                                    </button>
                                                )}

                                            {match.status === "full" && (
                                                <div className="text-center bg-blue-500/10 text-blue-400 rounded-lg py-3">
                                                    Match is full
                                                </div>
                                            )}

                                            {match.status === "finished" && (
                                                <div className="text-center bg-purple-500/10 text-purple-400 rounded-lg py-3">
                                                    Match finished
                                                </div>
                                            )}

                                            {match.status === "cancelled" && (
                                                <div className="text-center bg-red-500/10 text-red-400 rounded-lg py-3">
                                                    Match cancelled
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Matches;