import { useState } from "react"; 
import { useForm } from "react-hook-form"; 
import StatCard from "../component/dashbord/StatCard"; 
import SideBar from "../component/layout/Sidebar"; 
import api from "../services/api"; 
 
function MyProfile() { 
    const [activePanel, setActivePanel] = useState(null); 
    const user = JSON.parse(localStorage.getItem("user")); 
    const player = JSON.parse(localStorage.getItem("player")); 
    const initial = user?.name?.charAt(0).toUpperCase() || "M"; 
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ 
        defaultValues: { 
            name: user?.name || "", 
            lastname: user?.lastname || "", 
            email: user?.email || "", 
            position: player?.position || "" 
        } 
    }); 
 
    const onSubmit = async (data) => { 
        try { 
            const response = await api.put(`/users/${user.id}`, data); 
            console.log(response.data); 
            localStorage.setItem( 
                "user", 
                JSON.stringify(response.data.user) 
            ); 
            setActivePanel(null); 
        } catch (error) { 
            console.log(error.response?.data); 
        } 
    }; 

    return ( 
        <div className="flex min-h-screen bg-slate-950 text-slate-100"> 
            <SideBar user={user} /> 
            <main className="flex-1 w-full p-4 sm:p-8 space-y-6 overflow-y-auto">
                <section className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm"> 
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800/80"> 
                        <div className="flex items-center gap-4"> 
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 font-extrabold text-2xl text-slate-950 shadow-lg shadow-emerald-500/10"> 
                                {initial} 
                            </div> 
                            <div className="min-w-0 flex-1"> 
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-100 truncate"> 
                                    {user?.name} {user?.lastname} 
                                </h1> 
                                <p className="mt-1 text-sm text-slate-400 truncate"> 
                                    {user?.email} 
                                </p> 
                            </div> 
                        </div> 

                        <div className="flex items-center gap-3 shrink-0"> 
                            <button 
                                onClick={() => setActivePanel("profile")} 
                                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${ 
                                    activePanel === "profile" 
                                        ? "bg-slate-800 text-emerald-400 border border-emerald-500/40" 
                                        : "bg-emerald-500 text-slate-950 hover:bg-emerald-400" 
                                }`} 
                            > 
                                Edit Profile 
                            </button> 
                        </div> 
                    </div> 
 
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
                        <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80"> 
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500"> 
                                First Name 
                            </p> 
                            <p className="text-base font-semibold text-slate-200"> 
                                {user?.name || "N/A"} 
                            </p> 
                        </div> 

                        <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80"> 
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500"> 
                                Last Name 
                            </p> 
                            <p className="text-base font-semibold text-slate-200"> 
                                {user?.lastname || "N/A"} 
                            </p> 
                        </div> 

                        <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 sm:col-span-2 lg:col-span-1"> 
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500"> 
                                Email Address 
                            </p> 
                            <p className="text-base font-semibold text-slate-200 truncate"> 
                                {user?.email || "N/A"} 
                            </p> 
                        </div> 
                    </div> 
                </section> 
                {activePanel === "profile" && ( 
                    <section className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 shadow-xl transition-all"> 
                        <div className="mb-6"> 
                            <h2 className="text-xl font-bold text-slate-100"> 
                                Update Profile 
                            </h2> 
                            <p className="mt-1 text-sm text-slate-400"> 
                                Update your personal information 
                            </p> 
                        </div> 

                        <form onSubmit={handleSubmit(onSubmit)}> 
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
                                <div> 
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"> 
                                        First Name 
                                    </label> 
                                    <input 
                                        type="text" 
                                        {...register("name", { 
                                            required: "First name is required" 
                                        })} 
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-emerald-500 transition" 
                                    /> 
                                    {errors.name && ( 
                                        <p className="mt-1.5 text-xs font-medium text-red-400"> 
                                            {errors.name.message} 
                                        </p> 
                                    )} 
                                </div> 

                                <div> 
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"> 
                                        Last Name 
                                    </label> 
                                    <input 
                                        type="text" 
                                        {...register("lastname", { 
                                            required: "Last name is required" 
                                        })} 
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-emerald-500 transition" 
                                    /> 
                                    {errors.lastname && ( 
                                        <p className="mt-1.5 text-xs font-medium text-red-400"> 
                                            {errors.lastname.message} 
                                        </p> 
                                    )} 
                                </div> 

                                <div className="sm:col-span-2"> 
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"> 
                                        Email Address 
                                    </label> 
                                    <input 
                                        type="email" 
                                        {...register("email", { 
                                            required: "Email is required", 
                                            pattern: { 
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                                                message: "Invalid email address" 
                                            } 
                                        })} 
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-emerald-500 transition" 
                                    /> 
                                    {errors.email && ( 
                                        <p className="mt-1.5 text-xs font-medium text-red-400"> 
                                            {errors.email.message} 
                                        </p> 
                                    )} 
                                </div> 

                                <div className="sm:col-span-2">  
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"> 
                                        Position 
                                    </label> 
                                    <select  
                                        {...register("position", { required: "Position is required" })} 
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-emerald-500 transition" 
                                    > 
                                        <option value="Goalkeeper">Goalkeeper</option> 
                                        <option value="Defender">Defender</option>  
                                        <option value="Midfielder">Midfielder</option>  
                                        <option value="Forward">Forward</option> 
                                        <option value="Unknown">Unknown</option>  
                                    </select>  
                                    {errors.position && (  
                                        <p className="mt-1.5 text-xs font-medium text-red-400"> 
                                            {errors.position.message} 
                                        </p> 
                                    )}  
                                </div> 
                            </div> 

                            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end gap-3"> 
                                <button 
                                    type="button" 
                                    onClick={() => setActivePanel(null)} 
                                    className="rounded-xl bg-slate-800 px-5 py-2.5 font-semibold text-slate-300 hover:bg-slate-700 transition active:scale-[0.98]" 
                                > 
                                    Cancel 
                                </button> 

                                <button 
                                    type="submit" 
                                    className="rounded-xl bg-emerald-500 px-5 py-2.5 font-bold text-slate-950 hover:bg-emerald-400 transition active:scale-[0.98]" 
                                > 
                                    Save Changes 
                                </button> 
                            </div> 
                        </form> 
                    </section> 
                )} 
                <section className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 shadow-xl"> 
                    <div className="mb-6"> 
                        <h2 className="text-xl font-bold text-slate-100"> 
                            Player Performance 
                        </h2> 
                        <p className="mt-1 text-sm text-slate-400"> 
                            Your statistics and overall match progress 
                        </p> 
                    </div> 

                    <StatCard points="" MatchesPlayed="" trustworthy="" team="" /> 
                </section> 
            </main>
        </div> 
    ); 
} 

export default MyProfile;