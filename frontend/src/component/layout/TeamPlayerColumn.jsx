function TeamPlacyerColumn({ type, player, team }) {
    if (type === "team") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-500/40">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            {team.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {team.description}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-emerald-400">
                            {team.classment}
                        </p>
                        <p className="text-xs text-slate-500">
                            points
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    else if (type === "player") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-500/40">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-400">
                            {player.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="font-bold text-white">
                                {player.name} {player.lastname}
                            </h2>
                            <p className="text-sm text-slate-400">
                                {player.position}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-emerald-400">
                            {player.points}
                        </p>
                        <p className="text-xs text-slate-500">
                            points
                        </p>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-slate-950 p-3 text-center">
                        <p className="text-xs text-slate-500">
                            Level
                        </p>
                        <p className="mt-1 font-semibold text-white">
                            {player.level}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-3 text-center">
                        <p className="text-xs text-slate-500">
                            Grade
                        </p>
                        <p className="mt-1 font-semibold text-white">
                            {player.grade || "-"}
                        </p>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-3 text-center">
                        <p className="text-xs text-slate-500">
                            Trust
                        </p>
                        <p className="mt-1 font-semibold text-white">
                            {player.trustworthy}%
                        </p>
                    </div>

                </div>

            </div>
        );
    }
    return null;
}
export default TeamPlacyerColumn;