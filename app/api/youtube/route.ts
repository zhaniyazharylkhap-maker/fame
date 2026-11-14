// Real YouTube stats for a public video or Short. Needs YOUTUBE_API_KEY (YouTube Data API v3).
function videoId(url: string) {
  const m = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/) || url.match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : null;
}

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url") || "";
  const id = videoId(url.trim());
  if (!id) return Response.json({ error: "Paste a YouTube Short or video link." }, { status: 400 });
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return Response.json({ error: "YouTube stats are not configured yet (YOUTUBE_API_KEY). Add the numbers manually." }, { status: 503 });
  const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${id}&key=${key}`);
  if (!r.ok) return Response.json({ error: "YouTube did not answer. Try again." }, { status: 502 });
  const d = await r.json();
  const v = d.items?.[0];
  if (!v) return Response.json({ error: "Video not found or not public." }, { status: 404 });
  return Response.json({
    id,
    title: v.snippet?.title || "YouTube video",
    channel: v.snippet?.channelTitle || "",
    views: Number(v.statistics?.viewCount || 0),
    likes: Number(v.statistics?.likeCount || 0),
    comments: Number(v.statistics?.commentCount || 0),
  });
}
