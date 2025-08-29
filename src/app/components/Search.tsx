"use client";

import { useState } from "react";
import { Result } from "../types/result.type";
import axios from "axios";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);

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
        <div className="p-4">
            <h1>Google Scraper</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a search query"
                className="border border-gray-300 rounded-md p-2 mb-4"
            />
            <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                {loading ? "Loading..." : "Search"}
            </button>

            {results.length > 0 && (
                <div className="mt-4">
                    <button onClick={downloadJSON}>Download JSON</button>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index} className="mb-2">
                                <a
                                    href={result.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {result.title}
                                </a>
                                <p>{result.snippet}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;
