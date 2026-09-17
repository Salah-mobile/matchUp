import { Link } from "react-router-dom";

function UpcomingMatches(){
return <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-bold">
                        Upcoming Matches
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Your next football matches
                    </p>
                </div>
            
                <Link
                    to="/my-matches"
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                    View all
                </Link>

            </div>


            <div className="mt-8 py-10 text-center">
                <h3 className="mt-4 font-semibold">
                    No upcoming matches
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Your upcoming matches will appear here.
                </p>

            </div>

        </section>
}
export default UpcomingMatches;