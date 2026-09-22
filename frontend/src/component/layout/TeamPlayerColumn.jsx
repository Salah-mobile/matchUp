function TeamPlayerColumn({ type, player, team, rank }) {
    if (type === "team") {
        return (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-500/40">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 font-bold text-emerald-400">
                        #{rank}
                    </div>

                    <div className="flex-1">
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
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 font-bold text-emerald-400">
                        #{rank}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">
                            {player.user?.name} {player.user?.lastname}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {player.position} • Level {player.level} • Trust {player.trustworthy}%
                        </p>
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
            </div>
        );
    }
    return null;
}
export default TeamPlayerColumn;