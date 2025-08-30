interface SearchInputProps {
    query: string;
    setQuery: (query: string) => void;
    onSearch: () => void;
    loading: boolean;
}

/**
 * A search input component that accepts a query, an onSearch callback, and
 * a loading boolean prop. It renders a text input and a button that
 * displays a loading animation when the loading prop is true.
 *
 * @param {SearchInputProps} props
 * @return {JSX.Element}
 */
const SearchInput = ({
    query,
    setQuery,
    onSearch,
    loading,
}: SearchInputProps) => {
    /**
     * Handles key down events on the search input. If the Enter key is
     * pressed, prevents the default form submission behavior and calls the
     * onSearch callback instead.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="flex-1 p-3 rounded-xl border-2 border-white bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-sm transition-all"
            />
            <button
                onClick={onSearch}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-white/30 hover:bg-white/50 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
                {loading ? "⏳ Loading..." : "Search"}
            </button>
        </div>
    );
};

export default SearchInput;
