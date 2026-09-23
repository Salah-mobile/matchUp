import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

const card = "rounded-2xl border border-slate-800 bg-slate-900 p-6";
const input = "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none";
const greenButton = "rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400";

function MyTeam() {
  const [myTeam, setMyTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [pendingTeamIds, setPendingTeamIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingTeamId, setSendingTeamId] = useState(null);
  const [message, setMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const getPlayer = () => JSON.parse(localStorage.getItem("player"));

  const updateLocalPlayer = async () => {
    const oldPlayer = getPlayer();
    if (!oldPlayer) return;

    const response = await api.get("/players");
    const newPlayer = response.data.data.find(
      (item) => Number(item.id) === Number(oldPlayer.id)
    );

    if (newPlayer) {
      localStorage.setItem("player", JSON.stringify(newPlayer));
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const player = getPlayer();

      if (!player) {
        setMessage("Player information not found");
        return;
      }

      const [teamsResponse, membersResponse, invitationsResponse] =
        await Promise.all([
          api.get("/teams"),
          api.get("/team-membres"),
          api.get("/invitations")
        ]);

      const allTeams = teamsResponse.data.data;
      const allMembers = membersResponse.data.data;
      const allInvitations = invitationsResponse.data.data;

      setTeams(allTeams);

      setPendingTeamIds(
        allInvitations
          .filter((invitation) => {
            const invitationPlayerId =
              typeof invitation.player_id === "object"
                ? invitation.player_id?.id
                : invitation.player_id;

            return (
              invitation.type === "join_request" &&
              invitation.status === "pending" &&
              Number(invitationPlayerId) === Number(player.id)
            );
          })
          .map((invitation) => Number(invitation.team_id))
      );

      const membership = allMembers.find(
        (member) => Number(member.player_id) === Number(player.id)
      );

      if (!membership) {
        setMyTeam(null);
        setMembers([]);
        return;
      }

      setMyTeam(
        allTeams.find(
          (team) => Number(team.id) === Number(membership.team_id)
        ) || null
      );

      setMembers(
        allMembers.filter(
          (member) =>
            Number(member.team_id) === Number(membership.team_id)
        )
      );
    } catch (error) {
      console.log(error.response?.data || error);
      setMessage("Unable to load team information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const requestToJoin = async (teamId) => {
    const player = getPlayer();
    if (!player) return setMessage("Player information not found");

    try {
      setSendingTeamId(teamId);

      await api.post("/invitations", {
        team_id: teamId,
        player_id: player.id,
        type: "join_request"
      });

      setPendingTeamIds((current) => [
        ...current,
        Number(teamId)
      ]);
      setMessage("Join request sent successfully");
    } catch (error) {
      console.log(error.response?.data || error);
      setMessage(
        error.response?.data?.message || "Unable to send join request"
      );
    } finally {
      setSendingTeamId(null);
    }
  };

  const createTeam = async (data) => {
    try {
      await api.post("/teams", data);
      await updateLocalPlayer();
      await loadData();

      reset();
      setShowCreate(false);
      setMessage("Team created successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to create team"
      );
    }
  };

  const quitTeam = async () => {
    try {
      await api.delete("/quitTeam", {
        data: { team_id: myTeam.id }
      });

      await updateLocalPlayer();
      await loadData();
      setMessage("You quit the team successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to quit team"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <SideBar />

      <main className="min-w-0 flex-1 p-6">
        {loading ? (
          <p className="mt-20 text-center text-slate-400">Loading...</p>
        ) : (
          <div className="space-y-6">
            {message && (
              <p className={`${card} text-slate-300`}>{message}</p>
            )}

            {myTeam ? (
              <>
                <section className={card}>
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 text-2xl font-bold text-emerald-400">
                        {myTeam.logo ? (
                          <img
                            src={myTeam.logo}
                            alt={myTeam.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          myTeam.name?.charAt(0).toUpperCase()
                        )}
                      </div>

                      <div>
                        <h1 className="text-2xl font-bold">
                          {myTeam.name}
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                          {myTeam.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 px-5 py-3 text-center">
                        <p className="text-xs text-slate-400">Ranking</p>
                        <p className="text-xl font-bold text-emerald-400">
                          {myTeam.classment}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={quitTeam}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        Quit Team
                      </button>
                    </div>
                  </div>
                </section>

                <section className={card}>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Team Members</h2>
                    <span className="text-sm text-emerald-400">
                      {members.length} Members
                    </span>
                  </div>

                  <div className="space-y-3">
                    {members.map((member) => (
                      <div
                        key={
                          member.id ||
                          `${member.team_id}-${member.player_id}`
                        }
                        className="flex items-center justify-between rounded-xl bg-slate-950 p-4"
                      >
                        <div>
                          <p className="font-semibold">
                            {member.player?.name}{" "}
                            {member.player?.lastname}
                          </p>
                          <p className="text-sm text-slate-500">
                            Joined: {member.joined_at}
                          </p>
                        </div>
                        <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm">
                          {member.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className={`${card} text-center`}>
                  <div className="mb-4 text-3xl">⚽</div>
                  <h1 className="text-2xl font-bold">
                    You don't have a team yet
                  </h1>
                  <p className="mt-2 text-sm text-slate-400">
                    Join an existing team or create your own team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCreate((value) => !value)}
                    className={`mt-6 ${greenButton}`}
                  >
                    {showCreate ? "Close" : "Create Team"}
                  </button>
                </section>

                {showCreate && (
                  <section className={card}>
                    <h2 className="mb-5 text-xl font-bold">
                      Create Your Team
                    </h2>

                    <form
                      onSubmit={handleSubmit(createTeam)}
                      className="space-y-4"
                    >
                      {[
                        { name: "name", label: "Team Name" },
                        { name: "description", label: "Description" },
                        { name: "logo", label: "Logo URL" }
                      ].map(({ name, label }) => (
                        <div key={name}>
                          <label className="mb-2 block text-sm text-slate-300">
                            {label}
                          </label>
                          <input
                            {...register(name, {
                              required: `${label} is required`
                            })}
                            className={input}
                          />
                          {errors[name] && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors[name].message}
                            </p>
                          )}
                        </div>
                      ))}

                      <button type="submit" className={greenButton}>
                        Create Team
                      </button>
                    </form>
                  </section>
                )}

                <section className={card}>
                  <h2 className="text-xl font-bold">Available Teams</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose a team you want to join
                  </p>

                  <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team) => {
                      const pending = pendingTeamIds.includes(
                        Number(team.id)
                      );
                      const sending =
                        Number(sendingTeamId) === Number(team.id);

                      return (
                        <div
                          key={team.id}
                          className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                        >
                          <h3 className="text-lg font-bold">
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
                            type="button"
                            disabled={pending || sending}
                            onClick={() => requestToJoin(team.id)}
                            className={`mt-5 w-full rounded-xl px-4 py-3 font-bold ${
                              pending || sending
                                ? "cursor-not-allowed bg-slate-700 text-slate-400"
                                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                            }`}
                          >
                            {pending
                              ? "Request Pending ✓"
                              : sending
                                ? "Sending..."
                                : "Request to Join"}
                          </button>
                        </div>
                      );
                    })}

                    {teams.length === 0 && (
                      <p className="text-slate-500">
                        No teams available yet.
                      </p>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default MyTeam;