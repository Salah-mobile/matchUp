function StatCard(){
    return  <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-400">
                                        Total Points
                                    </p>
                                </div>

                                <h3 className="mt-4 text-3xl font-bold">
                                    0
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
                                <h3 className="mt-4 text-3xl font-bold">
                                    0
                                </h3>
                                <p className="mt-2 text-xs text-slate-500">
                                    Start your first match
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-400">
                                        Trust Worthy
                                    </p>
                                </div>
                                <h3 className="mt-4 text-3xl font-bold">
                                    0
                                </h3>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-400">
                                        Team
                                    </p>
                                </div>
                                <h3 className="mt-4 text-xl font-bold">
                                    No Team
                                </h3>
                                <p className="mt-2 text-xs text-slate-500">
                                    Join or create a team
                                </p>
                            </div>
        </section>
}
export default StatCard;