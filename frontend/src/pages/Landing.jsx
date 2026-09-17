import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md text-sm font-black">
            MU
          </span>
          <span>MatchUp</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link to="/login" className="hover:text-slate-100 transition-colors">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Amateur Football, Organized
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Find your team. <br />
            <span className="text-emerald-400">Play your match.</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            MatchUp helps amateur football players create teams, organize
            matches, connect with players and keep track of their progress.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-center transition-all shadow-lg shadow-emerald-500/20"
            >
              Create an account &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
              UPCOMING MATCH
            </span>
            <span className="text-slate-400 text-xs font-bold bg-slate-900/60 px-3 py-1 rounded-md border border-slate-700">
              5v5
            </span>
          </div>

          <div className="flex justify-between items-center my-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-600/30">
                ATL
              </div>
              <strong className="text-slate-200 text-sm sm:text-base">Atlas FC</strong>
            </div>

            <div className="text-xl font-black text-slate-500 tracking-wider">
              VS
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-600/30">
                RAJ
              </div>
              <strong className="text-slate-200 text-sm sm:text-base">Raja Friends</strong>
            </div>
          </div>

          <div className="flex justify-around items-center border-t border-slate-700/80 pt-6 mt-6 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">LOC:</span>
              <span>City Stadium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">TIME:</span>
              <span>18:00</span>
            </div>
          </div>
        </div>

      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            WHAT YOU CAN DO
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Everything you need to <span className="text-emerald-400">play together.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1">
            <span className="inline-block bg-slate-900 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded mb-4 border border-slate-700">
              SQUAD
            </span>
            <h3 className="text-lg font-bold mb-2">Create your team</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create your own team, invite players and organize your squad for
              every match.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1">
            <span className="inline-block bg-slate-900 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded mb-4 border border-slate-700">
              MATCH
            </span>
            <h3 className="text-lg font-bold mb-2">Organize matches</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find opponents, choose a suitable place and schedule matches with
              your friends.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1">
            <span className="inline-block bg-slate-900 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded mb-4 border border-slate-700">
              INVITE
            </span>
            <h3 className="text-lg font-bold mb-2">Invitations</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Send and receive team invitations and manage your participation
              easily.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 hover:border-emerald-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1">
            <span className="inline-block bg-slate-900 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded mb-4 border border-slate-700">
              RANK
            </span>
            <h3 className="text-lg font-bold mb-2">Points & Badges</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Play matches, collect points, unlock badges and build your
              football profile.
            </p>
          </div>

        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            From player to <span className="text-emerald-400">match day.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-800/30 border border-slate-800 p-8 rounded-2xl relative">
            <div className="text-emerald-400 text-3xl font-black mb-4">01</div>
            <h3 className="text-xl font-bold mb-2">Create your account</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Register on MatchUp and create your football player profile.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-800 p-8 rounded-2xl relative">
            <div className="text-emerald-400 text-3xl font-black mb-4">02</div>
            <h3 className="text-xl font-bold mb-2">Join a team</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create your own team or receive an invitation to join an existing
              one.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-800 p-8 rounded-2xl relative">
            <div className="text-emerald-400 text-3xl font-black mb-4">03</div>
            <h3 className="text-xl font-bold mb-2">Play & progress</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Play matches, win points, earn badges and build your reputation.
            </p>
          </div>

        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/70 p-10 sm:p-14 rounded-3xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to play?</h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
            Create your MatchUp account and start organizing your next football
            match.
          </p>
          <div>
            <Link
              to="/register"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Join MatchUp &rarr;
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-12 text-center text-slate-500 text-sm space-y-3">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-200">
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-xs font-black">
            MU
          </span>
          <span>MatchUp</span>
        </div>
        <p>Amateur football. Better organized.</p>
        <p className="text-xs text-slate-600">&copy; 2026 MatchUp. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Landing;