import { GET } from "./route";
import { NextRequest } from "next/server";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

function createRequest(url: string) {
    return new NextRequest(url);
}

describe("GET /api/search", () => {
    it("should return 400 if query is missing", async () => {
        const req = createRequest("http://localhost/api/search");
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json).toEqual({ error: "No query provided" });
    });

    it("should return search results when API call succeeds", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                organic_results: [
                    {
                        title: "Test Title",
                        link: "https://example.com",
                        snippet: "Test Snippet",
                    },
                ],
            },
        });

        const req = createRequest("http://localhost/api/search?query=test");
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toEqual([
            {
                title: "Test Title",
                link: "https://example.com",
                snippet: "Test Snippet",
            },
        ]);
    });

    it("should return 500 if API call fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

        const req = createRequest("http://localhost/api/search?query=test");
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json.error).toContain("Failed to fetch search results");
    });
});
