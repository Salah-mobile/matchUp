import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import SideBar from "../component/layout/Sidebar.jsx";

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

                <div className="mx-auto max-w-7xl">

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-white">
                            Football Matches
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Find a match and join your team.
                        </p>

                    </div>

                    {message && (
                        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-400">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                            {error}
                        </div>
                    )}

                    {matches.length === 0 ? (

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

                            <h2 className="text-xl font-semibold text-white">
                                No matches available
                            </h2>

                            <p className="mt-2 text-slate-400">
                                There are no matches available for you.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {matches.map((match) => {

                                const players = match.players || [];

                                const team1Players = players.filter(
                                    player =>
                                        Number(player.team_id) ===
                                        Number(match.team1?.id)
                                );

                                const team2Players = players.filter(
                                    player =>
                                        Number(player.team_id) ===
                                        Number(match.team2?.id)
                                );

                                const myCurrentTeamId =
                                    Number(match.my_current_team_id);

                                const isMyTeam1 =
                                    myCurrentTeamId ===
                                    Number(match.team1?.id);

                                const isMyTeam2 =
                                    myCurrentTeamId ===
                                    Number(match.team2?.id);

                                const isMyTeam =
                                    isMyTeam1 || isMyTeam2;

                                const isCaptain =
                                    match.is_captain === true;

                                const canJoinWithTeam =
                                    isCaptain &&
                                    !isMyTeam &&
                                    match.status === "open" &&
                                    !match.team2;

                                const myTeamPlayers =
                                    isMyTeam1
                                        ? team1Players.length
                                        : team2Players.length;

                                const canJoinPlayer =
                                    isMyTeam &&
                                    match.status === "open" &&
                                    !match.is_joined &&
                                    myTeamPlayers < 5;

                                return (

                                    <div
                                        key={match.id}
                                        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                                    >

                                        <div className="p-5">

                                            <div className="mb-5 flex items-center justify-between">

                                                <span className="text-sm text-slate-400">
                                                    Match #{match.id}
                                                </span>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                                            <div className="mb-5 space-y-2">

                                                <div className="flex justify-between gap-4">

                                                    <span className="text-slate-400">
                                                        Date
                                                    </span>

                                                    <span className="text-white">
                                                        {match.day}
                                                    </span>

                                                </div>

                                                <div className="flex justify-between gap-4">

                                                    <span className="text-slate-400">
                                                        Time
                                                    </span>

                                                    <span className="text-white">
                                                        {match.time}
                                                    </span>

                                                </div>

                                                <div className="flex justify-between gap-4">

                                                    <span className="text-slate-400">
                                                        Place
                                                    </span>

                                                    <span className="text-right text-white">
                                                        {match.place?.name || "-"}
                                                    </span>

                                                </div>

                                                <div className="flex justify-between gap-4">

                                                    <span className="text-slate-400">
                                                        City
                                                    </span>

                                                    <span className="text-white">
                                                        {match.place?.city || "-"}
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="border-t border-slate-800 pt-5">

                                                <div className="flex items-center justify-between">

                                                    <div className="flex-1 text-center">

                                                        <p className="font-semibold text-white">
                                                            {match.team1?.name || "-"}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-400">
                                                            {team1Players.length}/5 players
                                                        </p>

                                                    </div>

                                                    <div className="px-4 font-bold text-slate-600">
                                                        VS
                                                    </div>

                                                    <div className="flex-1 text-center">

                                                        <p className="font-semibold text-white">
                                                            {match.team2?.name || "Waiting"}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-400">

                                                            {match.team2
                                                                ? `${team2Players.length}/5 players`
                                                                : "No team"
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="mt-5 space-y-3">

                                                {isMyTeam && (
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/matches/${match.id}`
                                                            )
                                                        }
                                                        className="w-full rounded-lg bg-slate-700 py-3 font-semibold text-white transition hover:bg-slate-600"
                                                    >
                                                        View Match
                                                    </button>
                                                )}

                                                {canJoinWithTeam && (
                                                    <button
                                                        onClick={() =>
                                                            joinMatch(match.id)
                                                        }
                                                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
                                                    >
                                                        Join With My Team
                                                    </button>
                                                )}

                                                {canJoinPlayer && (
                                                    <button
                                                        onClick={() =>
                                                            joinPlayer(match.id)
                                                        }
                                                        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500"
                                                    >
                                                        Join Match
                                                    </button>
                                                )}

                                                {match.is_joined && (
                                                    <div className="rounded-lg bg-emerald-500/10 py-3 text-center text-sm font-semibold text-emerald-400">
                                                        You joined this match
                                                    </div>
                                                )}

                                                {match.status === "full" && (
                                                    <div className="rounded-lg bg-blue-500/10 py-3 text-center text-sm font-semibold text-blue-400">
                                                        Match is full
                                                    </div>
                                                )}

                                                {match.status === "finished" && (
                                                    <div className="rounded-lg bg-purple-500/10 py-3 text-center text-sm font-semibold text-purple-400">
                                                        Match finished
                                                    </div>
                                                )}

                                                {match.status === "cancelled" && (
                                                    <div className="rounded-lg bg-red-500/10 py-3 text-center text-sm font-semibold text-red-400">
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

            </main>

        </div>
    );
}

export default Matches;

