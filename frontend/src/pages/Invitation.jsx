import { useEffect, useState } from "react";
import SideBar from "../component/layout/Sidebar";
import api from "../services/api";
import InvitaionCase from "../component/layout/invitationCase";

function Invitation() {
  const [CurrentPlayer] = useState(
    JSON.parse(localStorage.getItem("player"))
  );
  const [Load, SetLoad] = useState(false);
  const [InvitationCurrentTeam, SetInvitationCurrentTeam] = useState([]);
  const [InvitationCurrentPlayer, SetInvitationCurrentPlayer] = useState([]);

  const LoadData = async () => {
    try {
      const response = await api.get("/invitations");
      SetInvitationCurrentTeam(
        response.data.data.filter(
          (it) => it.team_id == CurrentPlayer.team_id
        )
      );
      SetInvitationCurrentPlayer(
        response.data.data.filter(
          (it) => it.player_id == CurrentPlayer.id
        )
      );
      SetLoad(true)
    } catch (error) {
      console.log(error);
    }
  };
  const accept = async (id) => {
       try {
         const response =await api.post(`/invitations/${id}/accept`)
         console.log(response.data);
         LoadData()
       } catch (error) {
        console.log(error);
       }
  }
  const reject = async (id)=>{
    try {
        const response = await api.post(`/invitations/${id}/reject`)
        console.log(response.data)
        LoadData()
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    LoadData();
  }, []);
  if(!Load){
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

  }else{
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
                        (it) => it.status == "pending"
                        ).length
                    }{" "}
                    pending
                    </span>
                </div>
                <div className="space-y-4">
                    {InvitationCurrentTeam.map((it) => {
                    if (it.status == "pending") {
                        return (
                        <InvitaionCase
                            key={it.id}
                            type={"teamInvitation"}
                            player={it.player}
                            send_at={it.send_at}
                            accept={()=>accept(it.id)}
                            reject={()=>reject(it.id)}
                        />
                        );
                    }
                    })}
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
                            accept={accept(it.id)}
                            reject={reject(it.id)}
                        />
                        );
                    }
                    })}
                </div>
                </section>
            ) : (
                ""
            )}
            </div>
        </main>
        </div>
    );
  }
}
export default Invitation;