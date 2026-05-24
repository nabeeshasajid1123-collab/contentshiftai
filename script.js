const API_KEY = "";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const formats = {
  Instagram: ["Reel Script", "Carousel", "Single Post"],
  LinkedIn: ["Story Post", "Carousel", "How-To"],
  Twitter: ["Single Tweet", "Thread", "Hot Take"],
  Threads: ["Conversation Starter", "Hot Take", "Personal Story", "Thread"],
  YouTube: ["Shorts Script", "Long-form Script", "Title + Description"]
};

const prompts = {

  "Instagram_Reel Script": `You are an expert Instagram Reels scriptwriter. Rewrite the content below as a Reel script optimized for maximum retention and shares.

Rules:
- HOOK (0-3 sec): One bold statement that stops the scroll. Max 10 words. [on-screen text]
- BODY (3-55 sec): 5-8 punchy points. One sentence each. Spoken casually. Add [cut] between each point. Add [text overlay: "..."] for each point.
- CTA (last 5 sec): One specific action — save, share, follow, or comment.
- Write for viewers watching with sound OFF
- Total script fills 30-60 seconds at normal speaking pace

Output with clear sections labeled: HOOK / BODY / CTA`,

  "Instagram_Carousel": `You are an expert Instagram carousel strategist. Rewrite the content below as an 8-slide carousel optimized for saves and shares.

Rules:
- Slide 1 (Hook): Bold statement or question that forces a swipe. Max 8 words.
- Slides 2-7 (Value): Each slide = ONE insight. Short headline + 1-2 sentence explanation.
- Slide 8 (CTA): Warm specific CTA — save this or share with someone who needs this.
- Caption (separate): 150-200 words. Story behind the carousel. End with a specific question.

Output format:
SLIDE 1: [text]
SLIDE 2: [text]
SLIDE 3: [text]
SLIDE 4: [text]
SLIDE 5: [text]
SLIDE 6: [text]
SLIDE 7: [text]
SLIDE 8: [text]
CAPTION: [caption text]`,

  "Instagram_Single Post": `You are an expert Instagram caption writer. Rewrite the content below as a single post caption optimized for comments and saves.

Rules:
- Line 1: Hook — emotion, curiosity, or relatable truth. Max 12 words.
- Blank line after hook.
- Body: Short story or insight in 3-4 short paragraphs. Sound like a real person. 150-250 words total.
- End with a specific question easy to answer from personal experience.
- 5 niche-relevant hashtags at the end.

Output only the caption. Nothing else.`,

  "LinkedIn_Story Post": `You are an expert LinkedIn content strategist. Rewrite the content below as a high-performing LinkedIn story post.

Rules:
- Line 1 (Hook): Drop into the middle of a moment — tension or surprising result. Max 12 words. Never start with I or a greeting.
- Blank line after hook.
- Structure: Hook → Context → Struggle → Insight → Question
- Short paragraphs — max 2 sentences each.
- Sound human. No corporate language.
- Length: 1,300-1,900 characters total.
- End with a specific question they can answer from their own experience.
- 3 relevant hashtags on the last line.

Output only the post. Nothing else.`,

  "LinkedIn_Carousel": `You are an expert LinkedIn carousel creator. Rewrite the content below as a 10-slide LinkedIn carousel optimized for saves and shares.

Rules:
- Slide 1 (Cover): Bold promise or result. Make them swipe. Max 10 words.
- Slides 2-9 (Value): One clear idea per slide. Short headline + 2-3 sentence explanation.
- Slide 10 (CTA): Tell them to save, share, or follow for more.

Output format:
SLIDE 1: [text]
SLIDE 2: [text]
SLIDE 3: [text]
SLIDE 4: [text]
SLIDE 5: [text]
SLIDE 6: [text]
SLIDE 7: [text]
SLIDE 8: [text]
SLIDE 9: [text]
SLIDE 10: [text]`,

  "LinkedIn_How-To": `You are an expert LinkedIn content strategist. Rewrite the content below as a LinkedIn how-to post optimized for saves.

Rules:
- Line 1 (Hook): State the exact result or skill they will get. Specific and direct. Max 12 words.
- Blank line.
- Intro: One sentence on why this matters right now.
- Numbered steps: 5-8 steps. Each step has a bold title + 1-2 sentences of explanation. Immediately actionable.
- End with one sentence summary + a question asking which step they struggle with most.
- 3 relevant hashtags at the end.
- Length: 1,300-1,900 characters.

Output only the post. Nothing else.`,

  "Twitter_Single Tweet": `You are an expert Twitter/X strategist. Rewrite the core idea from the content below as a single tweet.

Rules:
- One punchy sentence or two short sentences max.
- State a bold opinion, surprising fact, or ask a question they cannot ignore.
- 240-259 characters for maximum likes.
- No hashtags unless one fits perfectly.
- No links.
- Sound like a real person with a sharp opinion.

Output only the tweet. Nothing else.`,

  "Twitter_Thread": `You are an expert Twitter/X thread writer. Rewrite the content below as a high-performing Twitter thread.

Rules:
- Tweet 1 (Hook): Bold claim or result that stops the scroll. One sentence. End with "A thread 🧵"
- Tweets 2-10: One clear insight per tweet. Short sentences. One idea only.
- Tweet 11 (Kicker): One-line takeaway they will want to retweet.
- Number each tweet: 1/ 2/ 3/
- Each tweet max 270 characters.
- No filler. No "let's dive in". No "in conclusion".

Output the full thread numbered. Nothing else.`,

  "Twitter_Hot Take": `You are an expert Twitter/X content strategist. Rewrite the core idea from the content below as a controversial but defensible hot take.

Rules:
- State the bold opinion in the first sentence — no warm-up.
- Back it up in 2-3 short sentences.
- End with a statement that makes people reply — not a question.
- Total: 3-5 sentences max, under 280 characters.
- Sound confident, not aggressive.
- No hashtags.

Output only the tweet. Nothing else.`,

  "Threads_Conversation Starter": `You are an expert Threads content strategist. Rewrite the core idea from the content below as a Threads post designed to generate replies.

Rules:
- Open with a bold opinion or observation — no warm-up, no greeting.
- State it like a smart person talking to a friend, not a brand.
- Under 400 characters.
- End with a specific question from personal experience — something concrete they can actually answer.
- No hashtags.
- No corporate language.

Output only the post. Nothing else.`,

  "Threads_Hot Take": `You are an expert Threads content strategist. Rewrite the core idea from the content below as a Threads hot take.

Rules:
- State the controversial opinion in the first line — bold, direct, no setup.
- Add 1-2 sentences that back it up just enough to be defensible.
- Last line invites debate — a statement, not a question.
- Under 500 characters total.
- Sound like a real person with a real opinion.
- No hashtags.

Output only the post. Nothing else.`,

  "Threads_Personal Story": `You are an expert Threads content strategist. Rewrite the content below as a short personal story for Threads.

Rules:
- Open with a specific moment or realization — drop the reader into it immediately.
- Keep it casual and human — like texting a smart friend.
- 3-5 short paragraphs, each 1-2 sentences.
- No corporate language, no motivational fluff.
- End with a soft observation or question that invites people to share their own experience.
- Under 500 characters total.
- No hashtags.

Output only the post. Nothing else.`,

  "Threads_Thread": `You are an expert Threads content strategist. Rewrite the content below as a Threads thread — a series of connected posts where each reply builds on the previous one.

Rules:
- Post 1 (Hook): Bold opinion or surprising statement. Under 300 characters. Makes them want to read the next post.
- Posts 2-6 (Build): Each post adds one new point or insight. Short, conversational, one idea only. Each feels incomplete without the next.
- Post 7 (Kicker): One punchy closing thought or question that invites replies.
- Write like a real person thinking out loud — casual, direct, no corporate tone.
- No hashtags.
- Label each post: POST 1: POST 2: etc.
- Each post under 400 characters.

Output all 7 posts labeled clearly. Nothing else.`,

  "YouTube_Shorts Script": `You are an expert YouTube Shorts scriptwriter. Rewrite the content below as a Shorts script optimized for completion rate and shares.

Rules:
- HOOK (0-3 sec): One bold statement that stops the scroll. Deliver the payoff immediately. [on-screen text]
- BODY (3-50 sec): ONE clear idea broken into 4-6 punchy points. One sentence each. Add [cut] between points. Add [text overlay: "..."] for each.
- CTA (last 5 sec): One action only — subscribe, save, or comment.
- Write for 60 seconds max at normal speaking pace.
- Short sentences. Natural rhythm. Write how you talk.

Output with clear sections: HOOK / BODY / CTA`,

  "YouTube_Long-form Script": `You are an expert YouTube scriptwriter. Rewrite the content below as a long-form YouTube video script optimized for watch time.

Rules:
- HOOK (0-10 sec): Deliver the biggest result or most surprising fact immediately. Create a curiosity loop. [on-screen text]
- INTRO (10-60 sec): Validate their click, raise the stakes, hint at the payoff.
- BODY: Break into 4-6 segments. Each segment has a mini-hook at the start. Add pattern interrupt every 60-90 seconds — [cut to b-roll] [show graphic] etc.
- MID-POINT HOOK (50% mark): Re-engage viewer with a reminder of what is coming.
- CTA: One clear action at 70% mark and again at the end.
- Write conversationally — short sentences, contractions, natural rhythm.
- Target: 8-12 minutes at 140 words per minute.

Output with clear sections: HOOK / INTRO / BODY / CTA`,

  "YouTube_Title + Description": `You are an expert YouTube SEO strategist. Based on the content below, write optimized YouTube titles and a video description.

Rules for Titles (give 5 options):
- Each title under 60 characters.
- Use proven formulas: number + result, curiosity gap, transformation promise, why instead of how to.
- Include the main keyword naturally.
- Avoid clickbait — deliver on the promise.

Rules for Description:
- First 2 lines are the hook — shows before "show more" — make them click.
- 150-200 words total.
- Include main keyword in first sentence.
- 3-5 timestamps as placeholders like [0:00] [2:30] etc.
- 3-5 relevant hashtags at the very end.

Output format:
TITLES:
1. [title]
2. [title]
3. [title]
4. [title]
5. [title]

DESCRIPTION:
[description text]`
};

let selectedPlatform = null;
let selectedFormat = null;

document.querySelectorAll(".platform-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".platform-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedPlatform = btn.dataset.platform;
    selectedFormat = null;

    const formatSection = document.getElementById("formatSection");
    const formatButtons = document.getElementById("formatButtons");
    formatButtons.innerHTML = "";

    formats[selectedPlatform].forEach(format => {
      const fb = document.createElement("button");
      fb.className = "format-btn";
      fb.textContent = format;
      fb.addEventListener("click", () => {
        document.querySelectorAll(".format-btn").forEach(b => b.classList.remove("active"));
        fb.classList.add("active");
        selectedFormat = format;
      });
      formatButtons.appendChild(fb);
    });

    formatSection.classList.remove("hidden");
  });
});

document.getElementById("repurposeBtn").addEventListener("click", async () => {
  const content = document.getElementById("userContent").value.trim();

  if (!content) {
    alert("Please paste your content first.");
    return;
  }
  if (!selectedPlatform) {
    alert("Please select a platform.");
    return;
  }
  if (!selectedFormat) {
    alert("Please select a format.");
    return;
  }

  const outputCards = document.getElementById("outputCards");
  const outputSection = document.getElementById("outputSection");
  const loading = document.getElementById("loading");

  outputCards.innerHTML = "";
  outputSection.classList.add("hidden");
  loading.classList.remove("hidden");
  document.getElementById("repurposeBtn").disabled = true;

  try {
    const promptKey = `${selectedPlatform}_${selectedFormat}`;
    const prompt = `${prompts[promptKey]}\n\nOriginal content:\n${content}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Something went wrong.";

    const card = document.createElement("div");
    card.className = "output-card";
    card.innerHTML = `
      <h3>${selectedPlatform} — ${selectedFormat}</h3>
      <p>${result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\\#/g, '#').replace(/\n/g, '<br>')}</p>
      <button class="copy-btn" onclick="copyText(this)">Copy</button>
    `;
    outputCards.appendChild(card);
    outputSection.classList.remove("hidden");

  } catch (err) {
    alert("Error calling Gemini API. Check your API key and try again.");
    console.error(err);
  } finally {
    loading.classList.add("hidden");
    document.getElementById("repurposeBtn").disabled = false;
  }
});

function copyText(btn) {
  const text = btn.previousElementSibling.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerText = "Copied!";
    setTimeout(() => btn.innerText = "Copy", 2000);
  });
}