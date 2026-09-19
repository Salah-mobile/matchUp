import { useEffect, useState } from "react";
import SideBar from "../component/layout/Sidebar.jsx";
import api from "../services/api.js";

function CreateMatch() {
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [placeId, setPlaceId] = useState("");

    const [places, setPlaces] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingPlaces, setLoadingPlaces] = useState(true);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async () => {
        try {
            const response = await api.get("/places");

            setPlaces(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error);

            setError("Unable to load places");
        } finally {
            setLoadingPlaces(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/FootballMatch", {
                day,
                time,
                place_id: placeId,
            });

            setMessage(response.data.message);

            setDay("");
            setTime("");
            setPlaceId("");
        } catch (error) {
            console.log(error.response?.data || error);

            setError(
                error.response?.data?.message ||
                "Unable to create match"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">
            <SideBar />

            <main className="min-w-0 flex-1 p-6">
                <div className="mx-auto max-w-3xl">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Create Match
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Create a new football match for your team
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 rounded-xl border border-emerald-900 bg-emerald-950/30 px-5 py-4 text-emerald-400">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-900 bg-red-950/30 px-5 py-4 text-red-400">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Date
                            </label>

                            <input
                                type="date"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Time
                            </label>

                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Football Place
                            </label>

                            {loadingPlaces ? (
                                <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400">
                                    Loading places...
                                </div>
                            ) : (
                                <select
                                    value={placeId}
                                    onChange={(e) => setPlaceId(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-500"
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
                            )}
                        </div>

                        {placeId && (
                            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                                {(() => {
                                    const selectedPlace = places.find(
                                        (place) =>
                                            Number(place.id) === Number(placeId)
                                    );

                                    if (!selectedPlace) {
                                        return null;
                                    }

                                    return (
                                        <>
                                            <h3 className="font-bold text-white">
                                                {selectedPlace.name}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-400">
                                                📍 {selectedPlace.adress}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-400">
                                                🏙️ {selectedPlace.city}
                                            </p>

                                            <p className="mt-1 text-sm text-emerald-400">
                                                💰 {selectedPlace.price} DH
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Match"}
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
}

export default CreateMatch;