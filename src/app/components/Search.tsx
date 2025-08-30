"use client";

import { useState } from "react";
import { Result } from "../types/result.type";
import axios from "axios";
import SearchInput from "./SearchInput";
import DownloadButton from "./DownloadButton";
import SearchResults from "./SearchResults";

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

            <SearchInput
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
                loading={loading}
            />

            {results.length > 0 && (
                <div className="mt-8 w-full max-w-xl space-y-4">
                    <DownloadButton onClick={downloadJSON} />
                    <SearchResults results={results} />
                </div>
            )}
        </div>
    );
};

export default Search;
