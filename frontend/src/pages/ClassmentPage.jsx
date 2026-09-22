import { useEffect, useState } from "react";
import api from "../services/api";
import SideBar from "../component/layout/Sidebar";
import TeamPlayerColumn from "../component/layout/TeamPlayerColumn";

function ClassmentPage(){
    const [Teams,SetTeams]=useState([])
    const [Players,SetPlayers]=useState([])
    const [Load,setLoad]=useState(null)
    const [CurrentPlayer,SetCurrentPlayer]=useState()
    const [Team,SetTeam]=useState()
    const LoadClassment = async () => {
        try {
            const reponse=await api.get("teams")
            const CurrentPlayer=JSON.parse(localStorage.getItem("player"))
            SetCurrentPlayer(CurrentPlayer)
            let teams=reponse.data.data
            let orderTeam=teams.sort((a,b)=>a.classment-b.classment)
            SetTeam(orderTeam.find((it)=>it.id==CurrentPlayer.team_id))
            const reponse2=await api.get("players")
            let players=reponse2.data.data.sort((a,b)=>b.points-a.points);
            SetTeams(orderTeam)
            SetPlayers(players)
            setLoad(true)
            console.log(orderTeam.find((it)=>it.id==CurrentPlayer.team_id));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        LoadClassment()
    },[])
    if(!Load){
        return  <div className="flex min-h-screen bg-slate-950">
                <SideBar />
                <main className="flex flex-1 items-center justify-center">
                    <p className="text-slate-400">
                        Loading matches...
                    </p>
                </main>
            </div>
    }else {
            return (
                <div className="flex min-h-screen bg-slate-950 text-white">
                    <SideBar />
                    <main className="flex-1 p-6 lg:p-10">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                                    MatchUp Rankings
                                </p>
                                <h1 className="mt-2 text-3xl font-bold">
                                    Classement
                                </h1>
                                <p className="mt-2 text-slate-400">
                                    Here you can see your ranking and compare yourself
                                    with other players and teams.
                                </p>
                            </div>
                            <div className="mb-10 grid gap-6 lg:grid-cols-2">
                                <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-6">
                                    <div className="mb-5">
                                        <p className="text-sm font-medium text-emerald-400">
                                            Team Performance
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold">
                                            Your Team Classement
                                        </h2>
                                    </div>
                                    {Team ? (
                                        <TeamPlayerColumn
                                            type="team"
                                            player=""
                                            team={Team}
                                            rank={Team.classment}
                                        />
                                    ) : (
                                        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950">
                                            <div className="text-center">
                                                <p className="font-semibold text-slate-300">
                                                    You don't have a team
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Join or create a team to get ranked.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-6">
                                    <div className="mb-5">
                                        <p className="text-sm font-medium text-emerald-400">
                                            Your Performance
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold">
                                            Your Classement
                                        </h2>
                                    </div>
                                    <TeamPlayerColumn
                                        type="player"
                                        player={CurrentPlayer}
                                        team=""
                                        rank={Players.findIndex((player)=>{
                                            return player.id==CurrentPlayer.id
                                        })+1}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-8 xl:grid-cols-2">
                                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                                    <div className="flex items-center justify-between border-b border-slate-800 p-6">
                                        <div>
                                            <p className="text-sm font-medium text-emerald-400">
                                                Teams
                                            </p>
                                            <h2 className="mt-1 text-xl font-bold">
                                                Team Ranking
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Best teams based on their points
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                            {Teams.length} Teams
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-5">
                                        {Teams.map((team, index) => {
                                            return (
                                                <TeamPlayerColumn
                                                    key={team.id}
                                                    type="team"
                                                    team={team}
                                                    rank={index + 1}
                                                />
                                            );
                                            })}
                                    </div>
                                </section>
                                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                                    <div className="flex items-center justify-between border-b border-slate-800 p-6">
                                        <div>
                                            <p className="text-sm font-medium text-emerald-400">
                                                Players
                                            </p>
                                            <h2 className="mt-1 text-xl font-bold">
                                                Player Ranking
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Best players based on their points
                                            </p>
                                        </div>
                                        <div className="rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                                            {Players.length} Players
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-5">
                                        {Players.map((player, index) => {
                                            return (
                                                <TeamPlayerColumn
                                                    key={player.id}
                                                    type="player"
                                                    player={player}
                                                    rank={index + 1}
                                                />
                                            );
                                        })}

                                    </div>

                                </section>

                            </div>

                        </div>

                    </main>

                </div>
            );
        }
}

export default ClassmentPage;
