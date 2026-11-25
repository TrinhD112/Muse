
import { NextRequest, NextResponse } from "next/server";

interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  audio: string;
  image: string;
  album_image: string;
  duration: number;
  license_ccurl: string;
  shareurl: string;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.JAMENDO_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing Jamendo Client ID" },
      { status: 500 }
    );
  }

  const query = (
    request.nextUrl.searchParams.get("q") || ""
  ).trim().slice(0, 100);

  const params = new URLSearchParams({
  client_id: clientId,
  format: "json",
  limit: "20",
  imagesize: "300",
  audioformat: "mp31",
});

  if (query) {
    params.set("search", query);
  } else {
    params.set("order", "popularity_week");
  }

  try {
    const response = await fetch(
  `https://api.jamendo.com/v3.0/tracks/?${params}`,
  {
    headers: {
      "User-Agent": "Muse/1.0",
      "Accept": "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  }
);

    const data = await response.json();
    console.log("Jamendo status:", data.headers?.status);
    console.log("Total tracks:", data.results?.length);
    console.log("First audio URL:", data.results?.[0]?.audio);

    if (
      !response.ok ||
      data.headers?.status !== "success" ||
      !Array.isArray(data.results)
    ) {
      console.error(
        "Jamendo API error:",
        data.headers
      );

      return NextResponse.json(
        { error: "Jamendo API request failed." },
        { status: 502 }
      );
    }

    const tracks = (data.results as JamendoTrack[])
      .filter((track) =>
        track.audio?.startsWith("https://")
      )
      .map((track) => ({
        id: `jamendo-${track.id}`,
        title: track.name,
        artist: track.artist_name,
        album: track.album_name || "Single",
        audioUrl: track.audio,
        image: track.image || track.album_image,
        duration: track.duration,
        licenseUrl: track.license_ccurl,
        sourceUrl: track.shareurl,
        color: "linear-gradient(135deg, #7956aa, #302344)",
      }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Music API error:", error);

    return NextResponse.json(
      { error: "Unable to load music." },
      { status: 502 }
    );
  }
}
