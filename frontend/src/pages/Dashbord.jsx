import { Link } from "react-router-dom";
import WelcomeCard from "../component/dashbord/WelcomeCard";
import StatCard from "../component/dashbord/StatCard";
import UpcomingMatches from "../component/dashbord/UpcomingMatches";
import QuickAction from "../component/dashbord/QuickAction";
import DashboardLayout from "../component/layout/Dashbordlayout";

function Dashboard() {
   const user = JSON.parse(localStorage.getItem("user"));
   return <>
   <DashboardLayout user={user}>
    <WelcomeCard name={user.name}/>
    <StatCard/>
    <QuickAction/>
    <UpcomingMatches/>
   </DashboardLayout>
   </>
}

export default Dashboard;