interface DownloadButtonProps {
    onClick: () => void;
}

/**
 * A button to download the search results as a JSON file.
 *
 * @param {{ onClick: () => void }} props
 * @prop {() => void} onClick - The function to call when the button is clicked.
 *
 * @returns {JSX.Element} A rendered button element.
 */
const DownloadButton = ({ onClick }: DownloadButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
        >
            💾 Download JSON
        </button>
    );
};

export default DownloadButton;
