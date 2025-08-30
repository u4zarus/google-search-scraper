import { Result } from "../types/result.type";
import ResultItem from "./ResultItem";

interface SearchResultsProps {
    results: Result[];
}

/**
 * A component that renders a list of search results.
 *
 * @param {SearchResultsProps} props
 * @prop {Result[]} results - An array of search results to render.
 *
 * @returns {JSX.Element} A rendered list of search results.
 */
const SearchResults = ({ results }: SearchResultsProps) => {
    return (
        <ul className="space-y-3">
            {results.map((result, index) => (
                <ResultItem key={index} result={result} />
            ))}
        </ul>
    );
};

export default SearchResults;
