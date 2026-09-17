function WelcomeCard(props){
return <>
 <section className="mb-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-slate-900 p-8">

                            <p className="mb-2 text-sm font-medium text-emerald-400">
                                WELCOME BACK
                            </p>

                            <h1 className="text-3xl font-bold lg:text-4xl">
                                Hello,{props.name} 
                            </h1>

                            <p className="mt-3 max-w-xl text-slate-400">
                                Build your team, find matches and improve your
                                football ranking with MatchUp.
                            </p>

   </section>
</>
}
export default WelcomeCard;