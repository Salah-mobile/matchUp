import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Register() {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   try {
       const reponse = await api.post("/register",data);
        localStorage.setItem("token",reponse.data.token)
        localStorage.setItem("user",JSON.stringify(reponse.data.user))
        navigate('/Dashbord')
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
            Create an Account
          </h1>
          <p className="text-sm text-slate-400">
            Welcome to MatchUp! Join today and start organizing your football matches.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className={`w-full bg-slate-900 border ${
                  errors.name ? "border-red-500" : "border-slate-700"
                } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                {...register("name", {
                  required: "First name is required",
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className={`w-full bg-slate-900 border ${
                  errors.lastname ? "border-red-500" : "border-slate-700"
                } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                {...register("lastname", {
                  required: "Last name is required",
                })}
              />
              {errors.lastname && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {errors.lastname.message}
                </p>
              )}
            </div>

          </div>
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
                required: "Email is required",
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
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full bg-slate-900 border ${
                errors.password ? "border-red-500" : "border-slate-700"
              } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
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
            Register
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-emerald-400 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;