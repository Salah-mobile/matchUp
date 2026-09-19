import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function MyTeam() {
    const player = JSON.parse(localStorage.getItem("player"));

    const [myTeam, setMyTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        try {
            setLoading(true);

            const teamsResponse = await api.get("/teams");
            const membersResponse = await api.get("/team-membres");

            const allTeams = teamsResponse.data.data;
            const allMembers = membersResponse.data.data;

            setTeams(allTeams);

            const myMembership = allMembers.find(
                member => Number(member.player_id) === Number(player.id)
            );

            if (!myMembership) {
                setMyTeam(null);
                setMembers([]);
                return;
            }

            const team = allTeams.find(
                team => Number(team.id) === Number(myMembership.team_id)
            );

            const myMembers = allMembers.filter(
                member => Number(member.team_id) === Number(myMembership.team_id)
            );

            setMyTeam(team);
            setMembers(myMembers);

        } catch (error) {
            console.log(error.response?.data || error);
            setMessage("Unable to load team information");
        } finally {
            setLoading(false);
        }
    };

    const requestToJoin = async teamId => {
        try {
            await api.post("/team-membres", {
                team_id: teamId,
                grade: "member"
            });

            setMessage("You joined the team successfully");

            await loadData();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to join team"
            );
        }
    };

    const createTeam = async data => {
        try {
            await api.post("/teams", {
                name: data.name,
                description: data.description,
                logo: data.logo
            });

            setMessage("Team created successfully");

            reset();
            setShowCreate(false);

            await loadData();
        } catch (error) {
            console.log(error.response?.data || error);

            setMessage(
                error.response?.data?.message ||
                "Unable to create team"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-950">
                <SideBar />

                <main className="flex flex-1 items-center justify-center">
                    <p className="text-slate-400">
                        Loading...
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

                    {message && (
                        <div className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-slate-300">
                            {message}
                        </div>
                    )}

                    {myTeam ? (
                        <>
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-5">
                                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-800">
                                            {myTeam.logo ? (
                                                <img
                                                    src={myTeam.logo}
                                                    alt={myTeam.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-2xl font-bold text-emerald-400">
                                                    {myTeam.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h1 className="text-2xl font-bold text-white">
                                                {myTeam.name}
                                            </h1>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {myTeam.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-slate-800 px-5 py-3 text-center">
                                        <p className="text-xs uppercase text-slate-400">
                                            Ranking
                                        </p>

                                        <p className="text-xl font-bold text-emerald-400">
                                            {myTeam.classment}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            Team Members
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Players in your team
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                                        {members.length} Members
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {members.map(member => (
                                        <div
                                            key={
                                                member.id ||
                                                `${member.team_id}-${member.player_id}`
                                            }
                                            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
                                        >
                                            <div>
                                                <p className="font-semibold text-slate-200">
                                                    {member.player?.name}{" "}
                                                    {member.player?.lastname}
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    Joined: {member.joined_at}
                                                </p>
                                            </div>

                                            <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-slate-300">
                                                {member.grade}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                                    <span className="text-2xl">
                                        ⚽
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold text-white">
                                    You don't have a team yet
                                </h1>

                                <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
                                    Join an existing team or create your own team to start playing matches.
                                </p>

                                <button
                                    onClick={() =>
                                        setShowCreate(!showCreate)
                                    }
                                    className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                                >
                                    {showCreate
                                        ? "Close"
                                        : "Create Team"}
                                </button>
                            </div>

                            {showCreate && (
                                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                                    <h2 className="mb-6 text-xl font-bold text-white">
                                        Create Your Team
                                    </h2>

                                    <form
                                        onSubmit={handleSubmit(createTeam)}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Team Name
                                            </label>

                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required:
                                                        "Team name is required"
                                                })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                                            />

                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Description
                                            </label>

                                            <textarea
                                                rows="4"
                                                {...register(
                                                    "description",
                                                    {
                                                        required:
                                                            "Description is required"
                                                    }
                                                )}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                                            />

                                            {errors.description && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {
                                                        errors
                                                            .description
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Logo
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Logo URL"
                                                {...register("logo", {
                                                    required:
                                                        "Logo is required"
                                                })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                                            />

                                            {errors.logo && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {errors.logo.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                                        >
                                            Create Team
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-white">
                                        Available Teams
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Choose a team you want to join
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {teams.length > 0 ? (
                                        teams.map(team => (
                                            <div
                                                key={team.id}
                                                className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                                            >
                                                <h3 className="text-lg font-bold text-white">
                                                    {team.name}
                                                </h3>

                                                <p className="mt-2 text-sm text-slate-400">
                                                    {team.description}
                                                </p>

                                                <p className="mt-3 text-sm text-slate-400">
                                                    Ranking:{" "}
                                                    <span className="text-emerald-400">
                                                        {team.classment}
                                                    </span>
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        requestToJoin(
                                                            team.id
                                                        )
                                                    }
                                                    className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
                                                >
                                                    Request to Join
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full">
                                            <p className="text-center text-slate-500">
                                                No teams available yet.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MyTeam;
