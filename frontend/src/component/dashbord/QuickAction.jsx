import { Link } from "react-router-dom";

function QuickAction(){
    return <section className="mt-8">
        <div className="mb-5">
            <h2 className="text-xl font-bold">
                Quick Actions
            </h2>
            <p className="text-sm text-slate-500">
                Get started with MatchUp
            </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
            <Link
                to="/team"
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
            >
                <h3 className="font-bold">
                    Create a Team
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Build your team and invite players.
                </p>
            </Link>
            <Link
                to="/matches"
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
            >
                <h3 className="font-bold">
                    Find a Match
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Find a match that fits your team.
                </p>
            </Link>
            <Link
                to="/achievements"
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
            >
                <h3 className="font-bold">
                    View Achievements
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Track your badges and progress.
                </p>
            </Link>
        </div>
    </section>
}
export default QuickAction;