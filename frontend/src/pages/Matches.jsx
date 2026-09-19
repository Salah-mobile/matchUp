import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function Matches() {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [isCaptain, setIsCaptain] = useState(false);
    const [hasEnoughMembers, setHasEnoughMembers] = useState(false);

    useEffect(() => {
        loadMatches();
        checkCaptain();
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

    const checkCaptain = async () => {
        try {
            const userResponse = await api.get("/players");
            const membersResponse = await api.get("/team-membres");

            const players = userResponse.data.data;
            const members = membersResponse.data.data;

            const user = JSON.parse(localStorage.getItem("user"));

            const currentPlayer = players.find(
                (player) =>
                    Number(player.user_id) === Number(user?.id)
            );
            if (!currentPlayer) {
                return;
            }

            const myMembership = members.find(
                (member) =>
                    Number(member.player_id) ===
                    Number(currentPlayer.id)
            );

            if (!myMembership) {
                return;
            }

            const captain = myMembership.grade === "captain";

            setIsCaptain(captain);

            const myTeamMembers = members.filter(
                (member) =>
                    Number(member.team_id) ===
                    Number(myMembership.team_id)
            );

            setHasEnoughMembers(myTeamMembers.length >= 7);

        } catch (error) {
            console.log(error.response?.data || error);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">
            <SideBar />

            <main className="min-w-0 flex-1 p-6">
                <section className="w-full space-y-6">

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Matches
                            </h1>

                            <p className="mt-2 text-slate-400">
                                Discover and manage football matches
                            </p>
                        </div>

                        {isCaptain && hasEnoughMembers && (
                            <button
                                onClick={() => navigate("/create-match")}
                                className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                            >
                                + Create Match
                            </button>
                        )}

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
                                <span className="text-2xl">
                                    ⚽
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-white">
                                No Matches Yet
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                There are no matches available at the moment.
                            </p>

                            {isCaptain && !hasEnoughMembers && (
                                <p className="mt-4 text-sm text-yellow-400">
                                    Your team needs at least 7 members to create a match.
                                </p>
                            )}

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
                                            📍 {match.place?.name}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            🏙️ {match.place?.city}
                                        </p>

                                        <p className="text-sm text-emerald-400">
                                            💰 {match.place?.price} DH
                                        </p>

                                    </div>

                                    <div className="mt-4">
                                        <span
                                            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                                                match.status === "open"
                                                    ? "bg-yellow-500/10 text-yellow-400"
                                                    : match.status === "full"
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : match.status === "finished"
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            {match.status}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(`/matchs/${match.id}`)
                                        }
                                        className="mt-5 w-full rounded-xl bg-slate-800 px-4 py-3 font-bold text-white transition hover:bg-slate-700"
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