import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function CreateMatch() {
    const navigate = useNavigate();

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async () => {
        try {
            const response = await api.get("/places");

            setPlaces(response.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to load places"
            );
        } finally {
            setLoading(false);
        }
    };

    const createMatch = async (data) => {
        setMessage("");
        setError("");

        try {
            const response = await api.post("/matchs", {
                day: data.day,
                time: data.time,
                place_id: data.place_id
            });

            setMessage(
                response.data.message ||
                "Match created successfully"
            );

            setTimeout(() => {
                navigate("/matches");
            }, 1000);

        } catch (error) {
            console.log(error.response?.data || error);

            if (error.response?.data?.errors) {
                const validationErrors =
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(" ");

                setError(validationErrors);
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to create match"
                );
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading places...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Create Match
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Choose the date, time and football place.
                    </p>
                </div>

                {message && (
                    <div className="mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(createMatch)}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6"
                >

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Match date
                        </label>

                        <input
                            type="date"
                            {...register("day", {
                                required: "Date is required"
                            })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />

                        {errors.day && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.day.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Match time
                        </label>

                        <input
                            type="time"
                            {...register("time", {
                                required: "Time is required"
                            })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                        />

                        {errors.time && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.time.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Football place
                        </label>

                        <select
                            {...register("place_id", {
                                required: "Please select a place"
                            })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500"
                        >
                            <option value="">
                                Select a place
                            </option>

                            {places.map((place) => (
                                <option
                                    key={place.id}
                                    value={place.id}
                                >
                                    {place.name} - {place.city} - {place.price} DH
                                </option>
                            ))}
                        </select>

                        {errors.place_id && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.place_id.message}
                            </p>
                        )}
                    </div>

                    {places.length > 0 && (
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold">
                                Available places
                            </h2>

                            <div className="grid gap-3">
                                {places.map((place) => (
                                    <div
                                        key={place.id}
                                        className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {place.name}
                                                </h3>

                                                <p className="text-sm text-slate-400">
                                                    {place.adress}, {place.city}
                                                </p>
                                            </div>

                                            <span className="text-emerald-400 font-semibold">
                                                {place.price} DH
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/matches")}
                            className="flex-1 bg-slate-800 hover:bg-slate-700 rounded-lg px-4 py-3 font-medium transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg px-4 py-3 font-semibold transition"
                        >
                            {isSubmitting
                                ? "Creating..."
                                : "Create Match"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateMatch;