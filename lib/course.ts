// Aura course: 7 blocks, 24 lessons.
// Every lesson: theory, video links, key points, practice, task, AI exam, avatar progress.

export type Video = { title: string; url: string };
export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  theory: string[];
  videos: Video[];
  keyPoints: string[];
  practice: string[];
  task: string;
  placeholder: string;
  example: string;
  rubric: string; // what the AI audience judges
  result: string;
};
export type Block = {
  n: number;
  title: string;
  goal: string;
  color: string;
  lessons: Lesson[];
};

const yt = (q: string): Video => ({
  title: q,
  url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(q),
});

export const BLOCKS: Block[] = [
  {
    n: 1,
    title: "Foundation",
    goal: "Know who you are, who you talk to and how you stand out.",
    color: "#FF8FCF",
    lessons: [
      {
        id: "1.1",
        title: "What a personal brand is",
        minutes: 5,
        theory: [
          "A personal brand is what people remember about you when you are not in the room. It is trust, visibility and expertise put together.",
          "A blog is a diary of what you do. A brand is a promise of what you help with. People follow a blog for fun, but they hire a brand.",
          "Expertise without visibility does not pay. The best nutritionist in town loses clients to the one people see every day in their feed.",
          "A clear brand brings clients, job offers and invitations to you, so you spend less time chasing them.",
        ],
        videos: [yt("what is a personal brand"), yt("why personal branding matters"), yt("how experts get clients with content")],
        keyPoints: ["Personal brand = trust + visibility + expertise.", "Without a brand you are hard to find.", "Content is a tool for building trust."],
        practice: ["Write 3 versions of “who I am”.", "Pick the strongest one.", "Check it with the AI audience."],
        task: "Describe yourself in one sentence: who you are, who you help and what result you give.",
        placeholder: "I help … to … so they can …",
        example: "I help busy moms plan healthy meals in 15 minutes so they stop skipping lunch.",
        rubric: "One sentence. Clear who the person is, who they help and a concrete result. No vague words like 'inspire' or 'everyone'.",
        result: "Your first positioning line.",
      },
      {
        id: "1.2",
        title: "How to choose a niche",
        minutes: 6,
        theory: [
          "A niche is the topic and the people you are known for. When you talk to everyone, nobody feels you are talking to them.",
          "Look for the overlap of three circles: a skill you have, a topic you enjoy and a problem people pay to solve.",
          "Narrow it in steps: nutrition → nutrition for moms → quick family meals for working moms. Each step makes you easier to remember.",
          "Test: can you post about it 100 days in a row without running out of ideas? If yes, it is a niche, not a phase.",
        ],
        videos: [yt("how to choose a niche for personal brand"), yt("how to find your niche"), yt("niche mistakes content creators")],
        keyPoints: ["Niche = skill + interest + demand.", "A narrow niche gives a stronger position.", "Do not be afraid to narrow down."],
        practice: ["List 10 topics you know well.", "Mark the 3 strongest.", "Ask the AI coach to narrow one of them."],
        task: "Pick one niche and explain why you can talk about it 100 days in a row.",
        placeholder: "My niche is … because …",
        example: "Quick family meals for working moms. I cook for 4 kids, I am a dietitian and my clients ask me the same 30 questions every week.",
        rubric: "A specific niche, not a broad category. A believable reason: experience, demand or a stock of ideas.",
        result: "Your niche.",
      },
      {
        id: "1.3",
        title: "Who your audience is",
        minutes: 6,
        theory: [
          "Your ideal client profile (ICP) is one real person, not a crowd: their age, routine and what keeps them up at night.",
          "Pains, wants and fears matter more than demographics. “Woman 30–40” says little. “Feels guilty when her kids eat fast food again” says a lot.",
          "Write every post as a message to that one person. People feel when a video was made for them.",
        ],
        videos: [yt("how to define target audience"), yt("how to create an audience persona"), yt("target audience mistakes")],
        keyPoints: ["Audience is a specific person, not everyone.", "Pains matter more than demographics.", "The sharper the audience, the stronger the content."],
        practice: ["Create 3 audience personas.", "Write the main pain of each.", "Choose your main persona."],
        task: "Describe your ideal viewer: who they are, what they want, what they fear and why they should listen to you.",
        placeholder: "My viewer is … They want … They are afraid … They should listen to me because …",
        example: "Sarah, 34, two kids, office job. Wants to eat well without cooking for an hour. Fears she is setting a bad example. Listens to me because I show 15-minute meals that kids actually eat.",
        rubric: "A concrete person with a want, a fear and a reason to trust the author. Pains, not only age and gender.",
        result: "Your audience profile.",
      },
      {
        id: "1.4",
        title: "Positioning",
        minutes: 6,
        theory: [
          "Positioning formula: I help [who] get [result] without [pain] through [how].",
          "To stand out, own an angle: a method, a tone, a format or a group nobody else serves well.",
          "If a 12-year-old cannot repeat your positioning, it is too complex.",
        ],
        videos: [yt("how to create positioning statement"), yt("how to stand out as an expert"), yt("positioning mistakes")],
        keyPoints: ["Positioning = who you are + for whom + what result.", "Being unique beats being popular.", "Keep it simple."],
        practice: ["Ask the AI coach for 10 versions.", "Pick one and make it yours."],
        task: "Write your positioning statement: for whom, what problem you solve and what result you give.",
        placeholder: "I help … get … without …",
        example: "I help working moms feed their family healthy dinners in 15 minutes without meal-prep Sundays.",
        rubric: "Uses the formula. Specific audience, clear result, a pain removed. Simple language.",
        result: "Your positioning statement.",
      },
    ],
  },
  {
    n: 2,
    title: "Content Creation",
    goal: "Come up with ideas and turn them into strong content.",
    color: "#FFD43B",
    lessons: [
      {
        id: "2.1",
        title: "Content ideas",
        minutes: 6,
        theory: [
          "Content pillars are 3–4 main themes you rotate. For a nutritionist: quick recipes, myths, grocery tips, client stories.",
          "Every idea should answer a pain of your audience. Start from their questions, comments and DMs.",
          "Series beat one-offs: “Fridge rescue #1, #2, #3” makes people come back for the next one.",
        ],
        videos: [yt("how to come up with reels ideas"), yt("content pillars explained"), yt("how to not repeat yourself in content")],
        keyPoints: ["Content pillars are your main themes.", "Ideas must solve audience pains.", "Series keep attention."],
        practice: ["Ask the AI coach for 20 ideas.", "Keep the best 10.", "Sort them by pillar."],
        task: "Write 10 Reels ideas for your niche, one per line.",
        placeholder: "1. …\n2. …",
        example: "1. 3 breakfasts kids eat in 5 minutes\n2. The “healthy” snack with more sugar than a donut\n3. What I buy at the store for $50 a week",
        rubric: "Ten distinct ideas, each tied to a pain or want of the audience. Not generic topics.",
        result: "Your idea bank.",
      },
      {
        id: "2.2",
        title: "Hooks",
        minutes: 5,
        theory: [
          "A hook is the first line. People decide in 1–2 seconds whether to keep watching.",
          "Hook types: question, myth or conflict, number, contrast, call-out (“Busy mom?”), insider (“As a dietitian I never…”).",
          "Never open with a greeting or your name. Lead with the reason to stay.",
          "Write 3 versions and test them. The AI audience picks the winner before real people see it.",
        ],
        videos: [yt("5 types of hooks for reels"), yt("how to write strong hooks"), yt("hook mistakes short videos")],
        keyPoints: ["The hook decides if the viewer stays.", "Use a question, conflict, number or contrast.", "Test 3 versions."],
        practice: ["Ask the AI coach for 10 hooks.", "Pick 3.", "Run them through the hook battle."],
        task: "Write 5 hooks on one topic, one per line. The AI audience will pick the best.",
        placeholder: "1. …\n2. …",
        example: "1. “Healthy” granola bars are candy.\n2. Why are you always hungry at 3 pm?\n3. 3 desk snacks under 200 calories.",
        rubric: "Each hook works in the first 2 seconds: no greeting, names a viewer or a tension, promises something specific.",
        result: "Your hook library.",
      },
      {
        id: "2.3",
        title: "Script",
        minutes: 6,
        theory: [
          "Short video structure: Hook → Context → Insight → Proof → CTA. For 20–30 seconds, Hook → Insight → CTA is enough.",
          "Cut every sentence that does not move the viewer forward. One video, one idea.",
          "End with one clear action: save, comment a word, follow for part 2.",
        ],
        videos: [yt("how to write reels script"), yt("short video structure"), yt("how to keep attention in short videos")],
        keyPoints: ["Structure = Hook → Insight → CTA.", "Shorter is better.", "One video = one idea."],
        practice: ["Build a script from blocks.", "Ask the AI coach to tighten it."],
        task: "Write a 20–30 second script using Hook → Insight → CTA. Label each part.",
        placeholder: "Hook: …\nInsight: …\nCTA: …",
        example: "Hook: Your kid’s granola bar has as much sugar as a cookie.\nInsight: Look for under 6 g of sugar and 3 g of fiber. These 2 brands pass.\nCTA: Save this for your next grocery run.",
        rubric: "Has all three parts. Hook grabs, insight is specific and useful, CTA is one clear action. Fits 20–30 seconds.",
        result: "Your first ready script.",
      },
      {
        id: "2.4",
        title: "Formats",
        minutes: 6,
        theory: [
          "Main formats: talking head, storytelling, POV, listicle, breakdown, hot take, B-roll with voiceover, screen recording with explanation.",
          "Pick formats that fit your niche and your comfort with the camera. Faceless formats work too.",
          "Test different formats for 2 weeks and keep the ones your audience watches longest.",
        ],
        videos: [yt("short video formats explained"), yt("how to choose a content format"), yt("content format mistakes")],
        keyPoints: ["The format must fit the niche.", "Test different formats.", "Do not get stuck on one."],
        practice: ["Pick 3 formats.", "Write one short script for each."],
        task: "Write the same idea in 3 formats (for example talking head, POV and listicle). Two or three lines each.",
        placeholder: "Format 1 (…): …\nFormat 2 (…): …\nFormat 3 (…): …",
        example: "Talking head: I stopped buying granola bars. Here is why…\nPOV: POV: you read the label of your kid’s “healthy” snack…\nListicle: 3 snacks with less sugar than you think…",
        rubric: "Three clearly different formats, each a real version of the same idea, each with a hook.",
        result: "Your content DNA: the formats that fit you.",
      },
    ],
  },
  {
    n: 3,
    title: "Video Production",
    goal: "Film and edit simple videos that look good.",
    color: "#9DB8FF",
    lessons: [
      {
        id: "3.1",
        title: "Filming a talking head",
        minutes: 6,
        theory: [
          "Light beats camera. Face a window or a ring light; never have the window behind you.",
          "Phone at eye level, camera lens about one hand above your eyes, a calm uncluttered background.",
          "Speak a bit faster than in real life, smile with your eyes and look into the lens, not the screen.",
        ],
        videos: [yt("how to film talking head video on phone"), yt("lighting for phone video"), yt("how to speak on camera confidently")],
        keyPoints: ["Light matters more than the camera.", "Speak calmly and clearly.", "Look into the lens."],
        practice: ["Film a 15-second video.", "Describe your setup for the AI check."],
        task: "Film a 15-second talking head from your script. Describe your setup: light, angle, background, and paste the words you said.",
        placeholder: "Light: …\nAngle: …\nBackground: …\nWhat I said: …",
        example: "Light: facing a window at 10 am\nAngle: eye level, phone on books\nBackground: kitchen shelf\nWhat I said: Your kid’s granola bar…",
        rubric: "Light in front, eye-level angle, clean background, a hook in the first line of what was said.",
        result: "Your first video.",
      },
      {
        id: "3.2",
        title: "B-roll",
        minutes: 5,
        theory: [
          "B-roll is footage of the process: hands chopping, a label close-up, typing, walking into the studio.",
          "Film 5–8 clips of 2–3 seconds each while you work. Then record a voiceover on top.",
          "B-roll saves shy creators: your expertise is visible even when your face is not.",
        ],
        videos: [yt("what is b-roll"), yt("how to film b-roll on phone"), yt("b-roll with voiceover reels")],
        keyPoints: ["B-roll makes video feel alive.", "Show the process.", "Combine voiceover and visuals."],
        practice: ["Collect 5 B-roll clips.", "Write a voiceover for them."],
        task: "Plan a 20-second B-roll video: list 5 clips and write the voiceover line for each.",
        placeholder: "Clip 1: … | Voiceover: …",
        example: "Clip 1: opening the fridge | “Dinner in 15 minutes, with what you already have.”",
        rubric: "Five concrete shots, voiceover matches each shot, starts with a hook.",
        result: "You can make B-roll videos.",
      },
      {
        id: "3.3",
        title: "Editing",
        minutes: 6,
        theory: [
          "Pace beats beauty: cut pauses, breaths and “so, um”. A jump cut every 2–3 seconds keeps eyes on screen.",
          "Subtitles are a must: most people watch with the sound off.",
          "Music sets the mood; keep it quiet under your voice. Use sound effects only to stress a key moment.",
        ],
        videos: [yt("reels editing basics"), yt("how to add subtitles to reels"), yt("how to choose music for reels")],
        keyPoints: ["Pace matters more than beauty.", "Subtitles are a must.", "Music sets the mood."],
        practice: ["Edit your video.", "Describe your edit for the AI check."],
        task: "Edit your video and describe it: length, number of cuts, subtitles, music and where the key moment is.",
        placeholder: "Length: …\nCuts: …\nSubtitles: …\nMusic: …\nKey moment: …",
        example: "Length: 22 s\nCuts: 9\nSubtitles: yes, big white text\nMusic: soft lo-fi at 15%\nKey moment: sugar number at 0:06 with a zoom",
        rubric: "Under 35 seconds, frequent cuts, subtitles on, music under the voice, one clear key moment.",
        result: "Your first finished Reel.",
      },
    ],
  },
  {
    n: 4,
    title: "Platform Mastery",
    goal: "Work with Instagram, TikTok and YouTube Shorts.",
    color: "#A6E36B",
    lessons: [
      {
        id: "4.1",
        title: "Instagram",
        minutes: 6,
        theory: [
          "Reels bring new people, Stories build trust with people who already follow, carousels get saved and shared.",
          "Covers keep your grid clean and readable. Use 3–5 relevant hashtags, not 30.",
          "Your profile is a shop window: photo with your face, a name with your niche keyword, a bio with who you help and one link.",
        ],
        videos: [yt("how to make instagram reels"), yt("instagram stories guide"), yt("how to optimize instagram profile")],
        keyPoints: ["Reels are the main format.", "Stories build trust.", "The profile is your shop window."],
        practice: ["Prepare a Reel.", "Plan 3 Stories.", "Rewrite your profile."],
        task: "Write your new Instagram name field and bio, plus 3 Stories you will post this week.",
        placeholder: "Name: …\nBio: …\nStories: 1) … 2) … 3) …",
        example: "Name: Anna | 15-min family meals\nBio: Dietitian for busy moms 🍲 Dinner in 15 min, kids approved. Free meal plan ↓\nStories: 1) poll: what did you cook today 2) my grocery cart 3) Q&A",
        rubric: "Name has a niche keyword, bio says who and what result plus a call to action, Stories build trust.",
        result: "You are ready for Instagram.",
      },
      {
        id: "4.2",
        title: "TikTok",
        minutes: 5,
        theory: [
          "TikTok rewards speed and watch time. The first 2 seconds and the share of people who watch to the end decide reach.",
          "Trends and sounds give a boost, but put your niche into them. A trend without your expertise brings the wrong followers.",
          "Comments are fuel: answer them with new videos (reply with video).",
        ],
        videos: [yt("how to grow on tiktok"), yt("tiktok trends guide"), yt("tiktok retention tips")],
        keyPoints: ["TikTok = speed + trends.", "The hook decides everything.", "Comments drive engagement."],
        practice: ["Pick a trend.", "Adapt it to your niche.", "Write 3 hooks for it."],
        task: "Take one current trend or format and adapt it to your niche. Write 3 hooks for it.",
        placeholder: "Trend: …\nMy version: …\nHooks: 1) … 2) … 3) …",
        example: "Trend: “Things I would never do as a…”\nMy version: Things I would never buy as a dietitian\nHooks: 1) As a dietitian I never buy these 3 snacks…",
        rubric: "The trend is real and recognisable, the version fits the niche, hooks are strong in 2 seconds.",
        result: "You are ready for TikTok.",
      },
      {
        id: "4.3",
        title: "YouTube Shorts",
        minutes: 5,
        theory: [
          "Shorts grow fast and live long: they keep getting views from search for months.",
          "Titles matter on YouTube. Use the words people search for: “15 minute dinner for kids”.",
          "Group Shorts into playlists by pillar and link a long video when you have one. That is your channel strategy.",
        ],
        videos: [yt("how to make youtube shorts"), yt("youtube titles and thumbnails"), yt("youtube channel strategy")],
        keyPoints: ["Shorts give fast growth.", "Title and thumbnail matter.", "Channel strategy is the long game."],
        practice: ["Write a title.", "Describe a thumbnail frame.", "Pick a playlist."],
        task: "Write a YouTube Short title with search keywords, describe the thumbnail frame and the playlist it goes to.",
        placeholder: "Title: …\nThumbnail: …\nPlaylist: …",
        example: "Title: 15 Minute Dinner Kids Actually Eat (Dietitian)\nThumbnail: my face + plate, text “15 MIN”\nPlaylist: Quick family dinners",
        rubric: "Title has searchable keywords and a benefit, thumbnail is readable at small size, playlist fits a pillar.",
        result: "You are ready for YouTube.",
      },
    ],
  },
  {
    n: 5,
    title: "Growth & Marketing",
    goal: "Turn content into results: leads, clients, sales.",
    color: "#FFA36B",
    lessons: [
      {
        id: "5.1",
        title: "The funnel",
        minutes: 6,
        theory: [
          "Awareness → Interest → Desire → Action. Reels bring awareness, carousels and Stories build interest and desire, a clear offer gets action.",
          "Do not sell in the first video. Earn trust with 5–10 useful posts, then invite.",
          "Map the path: viewer → follower → lead magnet → call → client.",
        ],
        videos: [yt("what is a marketing funnel"), yt("how to build a content funnel"), yt("sales funnel mistakes")],
        keyPoints: ["A funnel is the client’s path.", "Content should lead to an action.", "Do not sell right away."],
        practice: ["Draw your 4 steps.", "Name the content for each step."],
        task: "Build your funnel: for each step (Awareness, Interest, Desire, Action) write what content or offer moves people forward.",
        placeholder: "Awareness: …\nInterest: …\nDesire: …\nAction: …",
        example: "Awareness: myth Reels\nInterest: carousel with a weekly plan\nDesire: client before/after Stories\nAction: free 15-min call link in bio",
        rubric: "All four steps present, each with specific content, ends with one clear action.",
        result: "You understand your funnel.",
      },
      {
        id: "5.2",
        title: "Targeting (text lesson)",
        minutes: 6,
        theory: [
          "Targeting means showing a post to the right people: by interests, behaviours and lookalikes of your followers.",
          "Split people into segments: by pain, stage and place. Each segment gets its own message.",
          "Lookalike audiences copy the traits of people who already engage. Start with 1–3% similarity.",
          "This lesson is theory only: Aura does not set up ads for you. You will plan segments here and set them up in the platform.",
        ],
        videos: [yt("how ad targeting works"), yt("audience segments explained"), yt("targeting mistakes ads")],
        keyPoints: ["Targeting = the right people.", "Segments beat “everyone”.", "Test hypotheses."],
        practice: ["Describe 3 segments.", "Write one message for each."],
        task: "Create 3 audience segments for targeting: who they are, their interests and the message each one gets.",
        placeholder: "Segment 1: … | Interests: … | Message: …",
        example: "Segment 1: moms 30–40 in Dallas | Interests: meal prep, kids nutrition | Message: dinner in 15 minutes",
        rubric: "Three different segments, each with interests and its own message tied to a pain.",
        result: "You understand targeting.",
      },
      {
        id: "5.3",
        title: "Ads",
        minutes: 6,
        theory: [
          "Ads speed up what already works. Promote a post that performed well organically, not a new one.",
          "Start small: $5–10 a day for 3–5 days per test. The creative matters more than the budget.",
          "A/B test one thing at a time: hook, first frame or offer. Watch cost per click and cost per lead.",
        ],
        videos: [yt("instagram ads basics"), yt("how to make ad creative"), yt("a/b testing ads")],
        keyPoints: ["Ads are an accelerator.", "Creative beats budget.", "Test hypotheses."],
        practice: ["Write an ad creative.", "Write a version B with a different hook."],
        task: "Write an ad creative for your niche: hook, main text, call to action, plus a version B with a different hook.",
        placeholder: "A: Hook … Text … CTA …\nB: Hook …",
        example: "A: Hook: Dinner in 15 min, kids approved. Text: 7 recipes… CTA: Get the free plan\nB: Hook: Stop ordering pizza on Tuesdays",
        rubric: "Clear hook, benefit-focused text, one CTA, version B changes only the hook.",
        result: "You understand ads.",
      },
      {
        id: "5.4",
        title: "Analytics",
        minutes: 6,
        theory: [
          "Watch retention first: the share of people who watch past 3 seconds and to the end.",
          "Then engagement (saves and shares beat likes), then CTR to your link and conversions to leads.",
          "Compare posts with each other, not with famous creators. Look for what your top 3 posts have in common.",
        ],
        videos: [yt("instagram reels analytics explained"), yt("how to read social media analytics"), yt("analytics mistakes creators")],
        keyPoints: ["Metrics are feedback.", "Retention matters more than likes.", "Analyse, do not guess."],
        practice: ["Add a post’s numbers in Results.", "Ask the AI coach what they mean."],
        task: "Take one of your posts (or a made-up one): write its views, likes, saves, average watch time, and your 2 conclusions.",
        placeholder: "Views: … Likes: … Saves: … Watch time: …\nConclusions: 1) … 2) …",
        example: "Views 2,140, likes 96, saves 41, watch 6.2 s of 22 s\nConclusions: 1) hook works, middle is slow 2) people save lists, make more lists",
        rubric: "Numbers present, conclusions follow from them, at least one specific next step.",
        result: "You understand analytics.",
      },
    ],
  },
  {
    n: 6,
    title: "Brand Building",
    goal: "Put everything into one system.",
    color: "#B9AEFF",
    lessons: [
      {
        id: "6.1",
        title: "Style and tone of voice",
        minutes: 6,
        theory: [
          "A recognisable style means people know it is you before they see your name: same colors, fonts, framing and phrases.",
          "Tone of voice is your character in words: warm, bold, nerdy, funny. Pick three words and stick to them.",
          "Visual identity: 2–3 colors, 1–2 fonts, one way to frame your face. Repeat it everywhere.",
        ],
        videos: [yt("how to build a personal brand style"), yt("tone of voice explained"), yt("visual identity for personal brand")],
        keyPoints: ["Style = recognition.", "Tone of voice = character.", "Visual identity = the face of the brand."],
        practice: ["Pick 3 tone words.", "Pick colors and fonts.", "Write your brand kit."],
        task: "Write your brand kit: positioning, 3 tone-of-voice words, 2–3 colors, fonts and one signature phrase.",
        placeholder: "Positioning: …\nTone: …\nColors: …\nFonts: …\nSignature phrase: …",
        example: "Positioning: 15-min dinners for working moms\nTone: warm, direct, a bit funny\nColors: tomato red, cream\nFonts: rounded sans\nPhrase: “Dinner’s done, mama.”",
        rubric: "All five parts filled, tone words are specific, the pieces fit the audience.",
        result: "Your brand kit.",
      },
      {
        id: "6.2",
        title: "Content series",
        minutes: 5,
        theory: [
          "A series is a repeatable format with a name: “Fridge rescue”, “Label check Monday”.",
          "Repetition builds recognition. People come back for the next episode, and the algorithm sees returning viewers.",
          "A good series is easy to film every week and has endless episodes.",
        ],
        videos: [yt("what is a content series"), yt("how to create content series"), yt("content series mistakes")],
        keyPoints: ["Series = retention.", "Repetition = recognition.", "Series help you grow."],
        practice: ["Name 3 series.", "Write 3 episode ideas for each."],
        task: "Create 3 content series for your niche: name, format, posting day and 3 episode ideas each.",
        placeholder: "Series 1: … | Format: … | Day: … | Episodes: …",
        example: "Series 1: Label Check Monday | Format: close-up B-roll | Day: Monday | Episodes: granola, yogurt, juice",
        rubric: "Three named series, each repeatable with a fixed format and day, episodes fit the niche.",
        result: "Your content series.",
      },
      {
        id: "6.3",
        title: "Offer and lead magnet",
        minutes: 6,
        theory: [
          "Your offer is what you sell: a clear result, a format, a price and a deadline.",
          "A lead magnet is free value in exchange for contact: a checklist, a 7-day plan, a mini-guide.",
          "The lead magnet should solve one small problem fast and lead naturally to your paid offer.",
        ],
        videos: [yt("what is an offer in marketing"), yt("how to create a lead magnet"), yt("how to collect leads from instagram")],
        keyPoints: ["Offer = what you sell.", "Lead magnet = free value.", "Leads = future clients."],
        practice: ["Write your offer.", "Write a lead magnet title and its 3 parts."],
        task: "Create a lead magnet for your audience: title, what is inside, how people get it and which paid offer it leads to.",
        placeholder: "Title: …\nInside: …\nHow to get: …\nLeads to: …",
        example: "Title: 7 Dinners in 15 Minutes\nInside: recipes, shopping list, kid ratings\nHow to get: comment DINNER\nLeads to: 4-week family meal coaching",
        rubric: "Specific title with a result, useful contents, a simple way to get it, a clear link to a paid offer.",
        result: "Your lead magnet.",
      },
    ],
  },
  {
    n: 7,
    title: "Real Launch",
    goal: "Go live in the real world.",
    color: "#5A3CF0",
    lessons: [
      {
        id: "7.1",
        title: "Launch prep",
        minutes: 6,
        theory: [
          "Before the first post: profile done, 7 scripts ready, a calendar for 30 days.",
          "Pick first topics from your strongest pillar and your best-scoring hooks from the course.",
          "A calendar is a system: same days, same times, series on fixed days. Consistency beats bursts.",
        ],
        videos: [yt("how to prepare a social media launch"), yt("how to make a content plan"), yt("mistakes before launching instagram")],
        keyPoints: ["Preparation is half the success.", "The calendar is your system.", "Do not launch without a plan."],
        practice: ["Choose posting days.", "Fill the first 2 weeks."],
        task: "Write a 30-day launch plan: posting days, times, which series go where, and the first 4 topics.",
        placeholder: "Days: …\nTimes: …\nSeries: …\nFirst topics: …",
        example: "Days: Mon, Wed, Fri, Sun\nTimes: 7:30 am and 8 pm\nSeries: Label Check Monday, Fridge Rescue Friday\nFirst topics: granola myth, 3 desk snacks…",
        rubric: "Realistic frequency, fixed days and times, series placed, first topics specific.",
        result: "Your launch plan.",
      },
      {
        id: "7.2",
        title: "Your first 7 videos",
        minutes: 5,
        theory: [
          "The first 7 videos are a test, not a verdict. Expect small numbers and learn from them.",
          "Mix formats and pillars across the 7 so you see what your audience prefers.",
          "Do not burn out: batch-film 3–4 videos in one session, post on schedule.",
        ],
        videos: [yt("first 7 videos new creator"), yt("how to avoid creator burnout"), yt("how to analyze your first posts")],
        keyPoints: ["The first 7 videos are a test.", "Do not expect instant results.", "Analyse and adjust."],
        practice: ["Write 7 hooks.", "Assign a format to each."],
        task: "Write 7 short scripts or hooks for your first posts, each with its format.",
        placeholder: "1. (format) …\n2. …",
        example: "1. (talking head) “Healthy” granola bars are candy…\n2. (B-roll) Dinner in 15 minutes with what is in your fridge…",
        rubric: "Seven distinct posts, mixed formats, strong hooks, all inside the niche.",
        result: "You are ready to launch.",
      },
      {
        id: "7.3",
        title: "Publishing and analysis",
        minutes: 5,
        theory: [
          "Publish at your planned time, reply to every comment in the first hour, share to Stories.",
          "After 48 hours, record the numbers in Results: views, likes, saves, watch time.",
          "Keep what works, change one thing in what does not, publish again. That is how you scale.",
        ],
        videos: [yt("best way to publish reels"), yt("which instagram metrics to track"), yt("how to adjust content strategy")],
        keyPoints: ["Publishing is the beginning.", "Metrics are feedback.", "Adjust and scale."],
        practice: ["Publish a real post.", "Add its numbers in Results."],
        task: "Publish your first real post and write its link (or platform), the numbers after 48 hours and one thing you will change.",
        placeholder: "Link: …\nViews: … Likes: … Saves: …\nI will change: …",
        example: "Link: youtube.com/shorts/…\nViews 1,180, likes 64, saves 22\nI will change: shorter intro, number in the first line",
        rubric: "A real post, numbers present, a concrete change based on the numbers.",
        result: "You move to the real world.",
      },
    ],
  },
];

export const LEVELS = [
  { n: 1, name: "Noob", stage: "noob" },
  { n: 2, name: "Beginner", stage: "beginner" },
  { n: 3, name: "Creator", stage: "creator" },
  { n: 4, name: "Advanced Creator", stage: "advanced" },
  { n: 5, name: "Brand Builder", stage: "brand" },
  { n: 6, name: "Growth Marketer", stage: "growth" },
  { n: 7, name: "Pro", stage: "pro" },
] as const;

export const ALL_LESSONS = BLOCKS.flatMap((b) => b.lessons.map((l) => ({ ...l, block: b.n })));

export function findLesson(id: string) {
  return ALL_LESSONS.find((l) => l.id === id);
}

// Level = number of finished blocks (0..6). Block 1 is free, Pro opens blocks 2–7.
export function levelFromDone(done: string[]) {
  let finished = 0;
  for (const b of BLOCKS) {
    if (b.lessons.every((l) => done.includes(l.id))) finished++;
    else break;
  }
  return LEVELS[Math.min(finished, 6)];
}

export const FREE_BLOCKS = 1;
export const PASS_MARK = 6;
