import { useEffect, useState } from "react";
import api from "../services/api";
import SideBar from "../component/layout/Sidebar";
import TeamPlacyerColumn from "../component/layout/TeamPlayerColumn";

function ClassmentPage(){
    const [Teams,SetTeams]=useState([])
    const [Players,SetPlayers]=useState([])
    const [Load,setLoad]=useState(null)
    const [CurrentPlayer,SetCurrentPlayer]=useState()
    const [PlayerTeam,SetPlayerTeam]=useState()
    const LoadClassment = async () => {
        try {
            const reponse=await api.get("teams")
            const CurrentPlayer=JSON.parse(localStorage.getItem("player"))
            SetCurrentPlayer(CurrentPlayer)
            let teams=reponse.data.data
            let orderTeam=teams.sort((a,b)=>b.classment-a.classment)
            SetPlayerTeam(orderTeam.find((it)=>it.id==CurrentPlayer.team_id))
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
    }else{
        return <>
            <SideBar/>
            <h1>Classsment</h1>
            <p>Here you will find if you are strounf enoughf </p>
             <div>
                <h1>You classment</h1>
                <p>{CurrentPlayer.name}</p>
                <p>{CurrentPlayer.lastname}</p>
                <p>{CurrentPlayer.points}</p>
                <p>{CurrentPlayer.level}</p>
                <p>{CurrentPlayer.grade}</p>
                <p>{CurrentPlayer.trustworthy}</p>
                <p>{CurrentPlayer.position}</p>
            </div>   
            {
            PlayerTeam ?  <div>
                <h1>your Team classment</h1>
                <p>{PlayerTeam.name}</p>
                <p>{PlayerTeam.description}</p>
                <p>{PlayerTeam.classment}</p>
            </div> :
             <p>you dont have any time</p>
            }
            {Teams.map((team)=>{
                <TeamPlacyerColumn type='team' team={team} player='' />
            })}
            
           

        </>
    }
}

export default ClassmentPage;
