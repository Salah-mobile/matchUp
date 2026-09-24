import { useEffect, useState } from "react";
import SideBar from "../component/layout/Sidebar";
import api from "../services/api";
import InvitaionCase from "../component/layout/invitationCase";

function Invitation() {
  const [CurrentPlayer,SetCurrentPlayer] = useState(
    JSON.parse(localStorage.getItem("player"))
  );
  const [Load, SetLoad] = useState(false);
  const [InvitationCurrentTeam, SetInvitationCurrentTeam] = useState([]);
  const [InvitationCurrentPlayer, SetInvitationCurrentPlayer] = useState([]);
  const [PlayerWithNoTeam, SetPlayerWithNoTeam] = useState([]);
  const LoadData = async () => {
    try {
      const response = await api.get("/invitations");
      const invitations = response.data.data;
      const playerC=await api.get(`players/${CurrentPlayer.id}`)
      localStorage.setItem("player",JSON.stringify(playerC.data.data))
      SetCurrentPlayer(JSON.parse(localStorage.getItem("player")))
      SetInvitationCurrentTeam(
        invitations.filter(
          (it) => it.team_id == CurrentPlayer.team_id
        )
      );

      SetInvitationCurrentPlayer(
        invitations.filter(
          (it) => it.player_id == CurrentPlayer.id
        )
      );

      const playersResponse = await api.get("/players");

      SetPlayerWithNoTeam(
        playersResponse.data.data.filter(
          (it) => it.team_id == null
        )
      );

      SetLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  const invitationTeam = async (player_id) => {
    try {
      const response = await api.post("/invitations", {
        team_id: CurrentPlayer.team_id,
        player_id: player_id,
        type: "team_invitation",
      });

      console.log(response.data);
      LoadData();
    } catch (error) {
      console.log(error.response?.data?.error || error);
    }
  };

  const accept = async (id) => {
    try {
      const response = await api.post(`/invitations/${id}/accept`);
      console.log(response.data);
      LoadData();
    } catch (error) {
      console.log(error);
      console.log("Status:", error.response?.status);
      console.log("Laravel response:", error.response?.data);
    }
  };

  const reject = async (id) => {
    try {
      const response = await api.post(`/invitations/${id}/reject`);
      console.log(response.data);
      LoadData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  if (!Load) {
    return (
      <div className="flex min-h-screen bg-slate-950">
        <SideBar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-slate-400">Loading matches...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <SideBar />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 border-b border-slate-800 pb-6">
            <p className="text-sm font-semibold text-emerald-400">
              MATCHUP / INVITATIONS
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Invitations
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Gérez les invitations et les demandes pour rejoindre une équipe.
            </p>
          </div>

          {CurrentPlayer.team_id != null &&
          CurrentPlayer.grade == "captain" ? (
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Welcome Mr {CurrentPlayer.user.name}{" "}
                    {CurrentPlayer.user.lastname}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    You will find here all the invitations to join your team.
                  </p>
                </div>

                <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                  {
                    InvitationCurrentTeam.filter(
                      (it) =>
                        it.status == "pending" &&
                        it.type == "join_request"
                    ).length
                  }{" "}
                  pending
                </span>
              </div>

              <div className="space-y-4">
                {InvitationCurrentTeam.map((it) => {
                  if (
                    it.status == "pending" &&
                    it.type == "join_request"
                  ) {
                    return (
                      <InvitaionCase
                        key={it.id}
                        type={"teamInvitation"}
                        player={it.player}
                        send_at={it.send_at}
                        accept={() => accept(it.id)}
                        reject={() => reject(it.id)}
                      />
                    );
                  }

                  return null;
                })}
              </div>

              <div className="mt-10">
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-white">
                    Players without a team
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Invite available players to join your team.
                  </p>
                </div>

                {PlayerWithNoTeam.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                    No players available right now.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {PlayerWithNoTeam.map((it) => {
                      const isPending = InvitationCurrentTeam.some(
                        (ict) =>
                          ict.player_id == it.id &&
                          ict.type == "team_invitation" &&
                          (ict.status == "pending" ||
                            ict.status == "accepted")
                      );

                      return (
                        <div
                          key={it.id}
                          className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5"
                        >
                          <div>
                            <div className="mb-5 flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-400">
                                {it.user?.name?.charAt(0)?.toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate font-semibold text-white">
                                  {it.user?.name} {it.user?.lastname}
                                </h3>
                                <p className="text-sm text-slate-400">
                                  Available player
                                </p>
                              </div>
                            </div>

                            <div className="mb-5 grid grid-cols-3 gap-2 text-center">
                              <div className="rounded-xl bg-slate-800/70 p-3">
                                <p className="text-xs text-slate-400">
                                  Position
                                </p>
                                <p className="mt-1 text-sm font-medium text-white">
                                  {it.position}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-800/70 p-3">
                                <p className="text-xs text-slate-400">
                                  Trust
                                </p>
                                <p className="mt-1 text-sm font-medium text-white">
                                  {it.trustworthy}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-800/70 p-3">
                                <p className="text-xs text-slate-400">
                                  Level
                                </p>
                                <p className="mt-1 text-sm font-medium text-white">
                                  {it.level}
                                </p>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => invitationTeam(it.id)}
                            disabled={isPending}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                              isPending
                                ? "cursor-not-allowed border border-slate-700 bg-slate-800 text-slate-400"
                                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                            }`}
                          >
                            {isPending
                              ? "Invitation pending"
                              : "Send invitation"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          ) : null}

          {CurrentPlayer.team_id == null ? (
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Invitations reçues
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Here you will find all your invitations sent by teams.
                  </p>
                </div>

                <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                  {
                    InvitationCurrentPlayer.filter(
                      (it) => it.status == "pending"
                    ).length
                  }{" "}
                  pending
                </span>
              </div>

              <div className="space-y-4">
                {InvitationCurrentPlayer.map((it) => {
                  if (it.status == "pending") {
                    return (
                      <InvitaionCase
                        key={it.id}
                        type={"join_request"}
                        team={it.team}
                        send_at={it.send_at}
                        accept={() => accept(it.id)}
                        reject={() => reject(it.id)}
                      />
                    );
                  }

                  return null;
                })}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Invitation;