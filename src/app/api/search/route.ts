import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Result } from "@/app/types/result.type";

/**
 * Handles GET requests to the `/api/search` endpoint.
 *
 * @param {NextRequest} req - The NextRequest object containing the request
 *   query parameters.
 *
 * @returns {NextResponse} - The response to the request, containing the search
 *   results as JSON.
 *
 * If the `query` parameter is missing, returns a 400 response with an error
 * message. Otherwise, attempts to fetch the search results from SerpAPI and
 * returns the results as JSON. If the fetch fails, returns a 500 response with
 * an error message.
 */
export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    if (!query) {
        return NextResponse.json(
            { error: "No query provided" },
            { status: 400 }
        );
    }

    try {
        const res = await axios.get("https://serpapi.com/search.json", {
            params: {
                q: query,
                api_key: process.env.SERPAPI_API_KEY,
            },
        });

        const results = res.data.organic_results.map((result: Result) => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
        }));

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch search results: ${error}` },
            { status: 500 }
        );
    }
}
