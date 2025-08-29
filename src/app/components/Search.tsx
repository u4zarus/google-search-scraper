"use client";

import { useState } from "react";
import { Result } from "../types/result.type";
import axios from "axios";

/**
 * A search component that fetches search results from the API when a query is
 * entered and the search button is clicked. It displays the results in a list
 * and also provides a button to download the results as a JSON file.
 *
 * @returns A JSX element containing the search component.
 */
const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);

    /**
     * Handles the search query by fetching the search results from the API
     * when the search button is clicked. It sets the loading state to true
     * when the request is made and false when the response is received.
     * It also sets the results state to the received data.
     */
    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);

        const res = await axios.get(
            `/api/search?query=${encodeURIComponent(query)}`
        );
        const data = res.data;

        setResults(data);
        setLoading(false);
    };

    /**
     * Downloads the search results as a JSON file when called.
     */
    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(results, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "results.json";
        a.click();
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 text-white p-6">
            <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
                🔍 Google Scraper
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a search query"
                    className="flex-1 p-3 rounded-xl border-2 border-white bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-sm transition-all"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-white/30 hover:bg-white/50 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                    {loading ? "⏳ Loading..." : "Search"}
                </button>
            </div>

            {results.length > 0 && (
                <div className="mt-8 w-full max-w-xl space-y-4">
                    <button
                        onClick={downloadJSON}
                        className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
                    >
                        💾 Download JSON
                    </button>

                    <ul className="space-y-3">
                        {results.map((result, index) => (
                            <li
                                key={index}
                                className="p-4 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors duration-300 shadow-inner"
                            >
                                <a
                                    href={result.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-lg font-bold underline decoration-pink-300 hover:text-pink-100 hover:scale-105 transform transition-all duration-200 block"
                                >
                                    {result.title}
                                </a>
                                <p className="mt-1 text-sm text-white/90">
                                    {result.snippet}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;
