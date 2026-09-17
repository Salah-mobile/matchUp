import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =  async (data) => {
    try {
        const reponse=await api.post("/login",data)
        localStorage.setItem("token",reponse.data.token)
        localStorage.setItem("user",JSON.stringify(reponse.data.user))
        console.log(reponse.data);
    } catch (error) {
        console.log(error);
    }
     
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12 font-sans">
      
      <div className="flex items-center gap-2 font-bold text-2xl tracking-wide mb-8">
        <span className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-lg text-base font-black">
          MU
        </span>
        <span>MatchUp</span>
      </div>

      <div className="w-full max-w-md bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400">
            Enter your credentials to access your MatchUp account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className={`w-full bg-slate-900 border ${
                errors.email ? "border-red-500" : "border-slate-700"
              } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full bg-slate-900 border ${
                errors.password ? "border-red-500" : "border-slate-700"
              } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
              {...register("password", {
                required: "Please enter your password",
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.99] mt-2"
          >
            Login
          </button>

        </form>
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 font-semibold hover:underline"
          >
            Create one here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;