// Top Shorts this week for a niche keyword, live from the YouTube Data API.
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") || "nutrition tips").slice(0, 80);
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return Response.json({ live: false, items: [] });
  const since = new Date(Date.now() - 7 * 86400000).toISOString();
  const s = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&order=viewCount&maxResults=8&publishedAfter=${since}&q=${encodeURIComponent(q + " #shorts")}&key=${key}`
  );
  if (!s.ok) return Response.json({ live: false, items: [] });
  const sd = await s.json();
  const ids: string[] = (sd.items || []).map((i: { id: { videoId: string } }) => i.id.videoId).filter(Boolean);
  if (!ids.length) return Response.json({ live: true, items: [] });
  const v = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids.join(",")}&key=${key}`);
  const vd = await v.json();
  const items = (vd.items || []).map((x: { id: string; snippet: { title: string; channelTitle: string; thumbnails?: { medium?: { url: string } } }; statistics: { viewCount?: string; likeCount?: string } }) => ({
    id: x.id,
    title: x.snippet.title,
    channel: x.snippet.channelTitle,
    thumb: x.snippet.thumbnails?.medium?.url || "",
    views: Number(x.statistics.viewCount || 0),
    likes: Number(x.statistics.likeCount || 0),
    url: `https://www.youtube.com/shorts/${x.id}`,
  }));
  return Response.json({ live: true, items });
}
