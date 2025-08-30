import { Result } from "../types/result.type";

interface ResultItemProps {
    result: Result;
}

/**
 * A single search result item, which displays the title and snippet of a result
 * with a link to the original page.
 *
 * @param {{ result: Result }} props
 * @prop {Result} result - The search result to render.
 *
 * @returns {JSX.Element} A rendered list item element displaying the result.
 */

const ResultItem = ({ result }: ResultItemProps) => {
    return (
        <li className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300">
            <a
                href={result.link}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-semibold text-white underline decoration-pink-400 hover:decoration-pink-200 hover:text-pink-100 transition-colors duration-200 block"
            >
                {result.title}
            </a>
            <p className="mt-2 text-sm text-gray-100/90 leading-relaxed">
                {result.snippet}
            </p>
        </li>
    );
};

export default ResultItem;
