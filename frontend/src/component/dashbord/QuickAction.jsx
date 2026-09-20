
import { Link } from "react-router-dom";

function QuickAction() {
    return (
        <section className="mt-8">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-white">
                    Quick Actions
                </h2>

                <p className="text-sm text-slate-500">
                    Get started with MatchUp
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">

                <Link
                    to="/myteam"
                    className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
                >
                    <h3 className="font-bold text-white">
                        My Team
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        View your team and manage your players.
                    </p>
                </Link>

                <Link
                    to="/matches"
                    className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
                >
                    <h3 className="font-bold text-white">
                        Find a Match
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Find an available match and join your team.
                    </p>
                </Link>

                <Link
                    to="/my-matches"
                    className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500/50"
                >
                    <h3 className="font-bold text-white">
                        My Matches
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        View the matches you have joined.
                    </p>
                </Link>

            </div>
        </section>
    );
}

export default QuickAction;
