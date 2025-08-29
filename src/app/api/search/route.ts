import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

type Result = {
    title: string;
    link: string;
    snippet?: string;
};

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    if (!query) {
        return NextResponse.json(
            { error: "No query provided" },
            { status: 400 }
        );
    }

    const url = `https://google.com/search?q=${encodeURIComponent(query)}`;

    try {
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
        });

        const $ = cheerio.load(data);
        const results: Result[] = [];

        $("div.g").each((index, element) => {
            const title = $(element).find("h3").text();
            const link = $(element).find("a").attr("href");
            const snippet = $(element).find(".VwiC3b").text();
            if (title && link) {
                results.push({ title, link, snippet });
            }
        });

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch search results: ${error}` },
            { status: 500 }
        );
    }
}
