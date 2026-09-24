function InvitaionCase({ type, player, team , send_at , accept , reject}) {
  if (type == "teamInvitation") {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg shadow-black/10">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Invitation
            </span>
            <h1 className="text-lg font-bold">
              send By {player.user.name} {player.user.lastname}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              invitation to joind your team
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs text-slate-400">Trustworthy</p>
            <p className="mt-1 font-bold">{player.trustworthy}</p>
          </div>
          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs text-slate-400">Level</p>
            <p className="mt-1 font-bold">{player.level}</p>
          </div>
          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs text-slate-400">Points</p>
            <p className="mt-1 font-bold">{player.points}</p>
          </div>
        </div>
        
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Send at: {send_at}</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              onClick={()=>reject()}
            >
              Reject
            </button>
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            onClick={()=>accept()}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type == "join_request") {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg shadow-black/10">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="mb-2 inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
              Join request
            </span>
            <h1 className="text-lg font-bold">send By {team.name}</h1>
            <p className="mt-1 text-sm text-slate-400">
              invitation to joind our team
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-slate-800/60 p-4 text-sm">
          <p className="text-slate-300">
            <span className="text-slate-500">Description: </span>
            {team.description}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Classment: </span>
            {team.classment}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Send at: {send_at}</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              onClick={()=>reject()}
            >
              Reject
            </button>
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            onClick={()=>accept()}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitaionCase;