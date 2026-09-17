function TopBar({name}){
return <>
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Overview
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Manage your football activities
                                </p>

                            </div>


                            <div className="flex items-center gap-4">

                                <button className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 hover:bg-slate-800">
                                    

                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400"></span>
                                </button>


                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-slate-950">
                                    {name.charAt(0)}
                                </div>

                            </div>

                        </header>
</>
}
export default TopBar;