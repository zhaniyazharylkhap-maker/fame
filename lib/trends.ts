// Weekly picks by the Aura team (Instagram and TikTok have no public trends API).
// YouTube top Shorts load live from /api/trends.
export type TrendSet = { keyword: string; formats: [string, string, string, string][]; hooks: [string, string][]; tags: [string, string][] };

export const TRENDS: Record<string, TrendSet> = {
  nutrition: {
    keyword: "nutrition tips",
    formats: [["TikTok", "Myth vs fact, split screen", "+64%", "Left: the myth as on-screen text. Right: you, one fact, one swap. 15 seconds."], ["Instagram", "Grocery haul with labels", "+41%", "Film 5 products, freeze on each label, give a 1–10 score."], ["YouTube", "What I eat as a dietitian", "+33%", "A day of meals in 30 seconds, one tip per meal."], ["Instagram", "Carousel: swap this for that", "+28%", "6 slides, one swap each. Last slide: save this."]],
    hooks: [["If your kid eats this for breakfast, watch this.", "Myth · TikTok"], ["I’m a dietitian and I never buy these 3 things.", "Insider · Instagram"], ["This snack has more sugar than a donut.", "Shock number · YouTube"], ["Busy mom? Save this lunchbox list.", "Call-out · Instagram"]],
    tags: [["#mealprep", "+22%"], ["#guthealth", "+35%"], ["#lunchboxideas", "+48%"], ["#readthelabel", "+57%"], ["#proteinsnacks", "+19%"]],
  },
  fitness: {
    keyword: "home workout",
    formats: [["TikTok", "30-second desk workout", "+52%", "3 moves at a real desk, 10 seconds each, timer on screen."], ["Instagram", "Form check: right vs wrong", "+38%", "Split screen, wrong form in red, right in green."], ["YouTube", "I did this every day for 30 days", "+31%", "Day 1 vs day 30 and the one thing that changed."], ["Instagram", "Carousel: 5 stretches for back pain", "+26%", "One stretch per slide with a hold time."]],
    hooks: [["Sitting all day? Do this before 5 pm.", "Call-out · TikTok"], ["Your back hurts because of this one habit.", "Mistake · Instagram"], ["I trained 300 clients. Everyone gets this wrong.", "Insider · YouTube"], ["3 moves, no gym, 5 minutes.", "Number · Instagram"]],
    tags: [["#deskworkout", "+44%"], ["#mobility", "+27%"], ["#walkingworkout", "+39%"], ["#over30fitness", "+21%"], ["#strengthtraining", "+15%"]],
  },
  beauty: {
    keyword: "makeup tips",
    formats: [["TikTok", "5-minute morning look", "+47%", "Real time, one product per step, price on screen."], ["Instagram", "Before and after, no filter", "+36%", "Same light, same angle, name the 2 products that mattered."], ["YouTube", "Salon owner reacts", "+29%", "React to a viral hack: safe or not, in 20 seconds."], ["Instagram", "Carousel: drugstore dupes", "+24%", "Pricey vs cheap on each slide."]],
    hooks: [["Stop putting concealer here.", "Mistake · TikTok"], ["A salon owner rates viral hacks.", "Insider · YouTube"], ["5 minutes, 4 products, done.", "Number · Instagram"], ["Don’t book a balayage before watching this.", "Warning · Instagram"]],
    tags: [["#cleangirl", "+31%"], ["#nailart", "+25%"], ["#dupes", "+42%"], ["#hairtok", "+28%"], ["#salonlife", "+17%"]],
  },
  food: {
    keyword: "cafe small business",
    formats: [["TikTok", "Day in the life of a café", "+45%", "Open to close in 30 seconds, end with a reason to visit."], ["Instagram", "Making the bestseller", "+34%", "Close-up process, sound on, price at the end."], ["YouTube", "Customer reacts to first bite", "+27%", "Ask before filming, one honest reaction."], ["Instagram", "Carousel: menu secrets", "+22%", "One off-menu item per slide."]],
    hooks: [["We sell 300 of these a day. Here’s why.", "Number · TikTok"], ["Only locals know this menu item.", "Secret · Instagram"], ["5 am in a bakery.", "Day in the life · YouTube"], ["Rate our new drink 1 to 10.", "Engagement · Instagram"]],
    tags: [["#cafelife", "+26%"], ["#smallbusiness", "+19%"], ["#bakery", "+33%"], ["#supportlocal", "+15%"], ["#foodtok", "+21%"]],
  },
  general: {
    keyword: "personal brand tips",
    formats: [["TikTok", "Things I’d never do as a…", "+51%", "Your job title plus 3 things insiders avoid."], ["Instagram", "Carousel: mistakes beginners make", "+33%", "One mistake and one fix per slide."], ["YouTube", "A day in my work in 30 seconds", "+29%", "Show the process, not the result."], ["Instagram", "POV: your first client call", "+24%", "Short relatable skit."]],
    hooks: [["As a [your job], I would never…", "Insider · TikTok"], ["Stop doing this if you want clients.", "Mistake · Instagram"], ["3 tools I use every single day.", "Number · YouTube"], ["Nobody tells you this about [your niche].", "Secret · Instagram"]],
    tags: [["#smallbusinesstips", "+24%"], ["#personalbrand", "+18%"], ["#dayinmylife", "+21%"], ["#freelancelife", "+16%"], ["#behindthescenes", "+19%"]],
  },
};
