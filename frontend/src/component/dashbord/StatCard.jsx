import { useEffect, useState } from "react";
import api from "../../services/api.js";

function StatCard() {
    const [player, setPlayer] = useState(null);
    const [matches, setMatches] = useState([]);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedPlayer = JSON.parse(
                localStorage.getItem("player") || "null"
            );

            if (!storedPlayer?.id) {
                setLoading(false);
                return;
            }

            const playerResponse = await api.get(
                `/players/${storedPlayer.id}`
            );

            const playerData =
                playerResponse.data.data ||
                playerResponse.data.player ||
                playerResponse.data;

            setPlayer(playerData);

            const matchesResponse = await api.get(
                "/matchs/my-matches"
            );

            setMatches(
                matchesResponse.data.data || []
            );

            const membersResponse = await api.get(
                "/team-membres"
            );

            const members =
                membersResponse.data.data ||
                membersResponse.data ||
                [];

            const myMembership = members.find(
                member =>
                    Number(member.player_id) ===
                    Number(storedPlayer.id)
            );

            if (myMembership?.team_id) {

                const teamResponse = await api.get(
                    `/teams/${myMembership.team_id}`
                );

                const teamData =
                    teamResponse.data.data ||
                    teamResponse.data.team ||
                    teamResponse.data;

                setTeam(teamData);
            }

        } catch (error) {
            console.log(
                error.response?.data || error
            );
        } finally {
            setLoading(false);
        }
    };

    const matchesPlayed = matches.filter(
        match => match.status === "finished"
    ).length;

    if (loading) {
        return (
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Total Points
                    </p>

                    <h3 className="mt-4 text-3xl font-bold text-white">
                        ...
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Matches Played
                    </p>

                    <h3 className="mt-4 text-3xl font-bold text-white">
                        ...
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Trust Worthy
                    </p>

                    <h3 className="mt-4 text-3xl font-bold text-white">
                        ...
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Team
                    </p>

                    <h3 className="mt-4 text-xl font-bold text-white">
                        ...
                    </h3>
                </div>

            </section>
        );
    }

    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-400">
                        Total Points
                    </p>

                </div>

                <h3 className="mt-4 text-3xl font-bold text-white">
                    {player?.points ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                    Keep playing to earn points
                </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-400">
                        Matches Played
                    </p>

                </div>

                <h3 className="mt-4 text-3xl font-bold text-white">
                    {matchesPlayed}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                    {matchesPlayed === 0
                        ? "Start your first match"
                        : "Finished matches"}
                </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-400">
                        Trust Worthy
                    </p>

                </div>

                <h3 className="mt-4 text-3xl font-bold text-white">
                    {player?.trustworthy ?? 0}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                    Trust score
                </p>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-400">
                        Team
                    </p>

                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                    {team?.name || "No Team"}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                    {team
                        ? "Current team"
                        : "Join or create a team"}
                </p>

            </div>

        </section>
    );
}

export default StatCard;