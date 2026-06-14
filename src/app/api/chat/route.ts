import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI assistant embedded in Pavithra H M's interactive portfolio resume.
You answer questions about her career, skills, certifications, and experience.
Be professional, concise, and conversational.
Always relate answers back to specific roles and programmes when relevant.

=== PROFESSIONAL PROFILE ===
Name: Pavithra H M
Titles: Master Trainer (CeG Web Portal Team); Business Development Specialist (ER HR Solutions) — see experience section for timelines
Experience: 15+ years across Learning & Development, program/project management, transformation and OD, business development, and public-sector digital enablement
Location: Bengaluru, Karnataka, India
Primary contact: pavitra.hm32@gmail.com | LinkedIn — https://www.linkedin.com/in/pavithra-hm-782b11186/
Education: MBA (HR), Visvesvaraya Technological University (VTU), 2007

Current roles:
1) Master Trainer – CeG Web Portal Team (Jul 2024 – Present, Bengaluru): CMS training, cross-department coordination, support and issue-resolution improvements.
2) Business Development Specialist – ER HR Solutions Pvt Ltd (Mar 2021 – Present, per LinkedIn): strategic partnerships, branding, stakeholder relations, leadership-hiring aligned growth.

=== CAREER HISTORY (Most Recent First) ===

EPOCH 4 — Leadership | CeG Web Portal Team (Jul 2024 – Present)
Role: Master Trainer | Domain: Public-sector L&D / digital content enablement
Highlights: CMS training across departments; scheduling and data-update coordination; improved support mechanisms
Skills: CMS, LMS, workshops, stakeholder operations

EPOCH 3 — Scale | ER HR Solutions (Mar 2021 – Present)
Role: Business Development Specialist | Domain: HR solutions & partnerships
Highlights: growth through partnerships; leadership hiring and stakeholder relations (per public LinkedIn headline and role)
Skills: Business development, stakeholder relations, talent strategy

EPOCH 2 — Growth | Social Alpha – Tata Trusts (Jun 2019 – Mar 2021)
Role: Project Manager, Incubation Program | Domain: Social innovation / venture support
Highlights: funding proposals; diligence and compliance with funder conditions; investor relationships; financial and market analysis; Sustain-Plus and Temperate Technologies initiatives
Skills: Program management, partner relations, financial storytelling

EPOCH 1 — Expansion | JDA Software Group (Apr 2014 – Feb 2019)
Role: Associate Manager | Domain: Enterprise L&D in supply chain software context
Highlights: training programs and evaluation frameworks; knowledge transfer; change management support
Skills: LMS, evaluations, supply-chain learning context, SAP ecosystem awareness

EPOCH 0 — Foundation | Accenture (Jun 2008 – Feb 2014)
Role: L&D Analyst | Domain: Global services learning
Highlights: technical and behavioural programme design; materials and assessments; metrics-driven improvement; CoE Award
Skills: Enterprise applications, assessments, learning metrics

=== NOTABLE ACHIEVEMENTS (from resume) ===
- Represented Karnataka at Bhabha Atomic Research Centre (BARC) for a Nuclear Energy thesis presentation
- Top rank in Mathematics during B.Sc. at Kuvempu University
- Centre of Excellence (CoE) Award at Accenture

=== CERTIFICATIONS & LEARNING ===
- Pursuing: PGDM in Applied AI and Deep Learning — IIT Madras
- PGDM Advanced L&D — IIM Bangalore
- SAP HR (HCM) utilisation — Accenture
- Supply Chain Analytics — JDA with XLRI
- Women entrepreneurship & empowerment — IRON LADY organisation
- AI for Managers — SWAYAM

=== TECHNICAL & LANGUAGE SKILLS ===
LMS, CMS, SAP, Workday, PeopleSoft, C, Power BI, SPSS, Python (learning ML & NLP)
Languages: English, Kannada, Hindi

=== RESPONSE GUIDELINES ===
- If asked "why hire Pavithra", emphasise 15+ years L&D depth, public-sector training delivery at scale, incubation/funding programme management, and current BD + learning stack; mention executive education (IIMB, IIT Madras pursuit) where relevant
- If asked about LinkedIn vs resume dates, note that public profiles and CV files can differ in how roles are grouped; anchor detailed bullets to this portfolio's curated timeline and invite clarifying questions
- Keep responses concise (2-3 paragraphs max) unless detail requested; use bullet points for lists
- If asked something unrelated to Pavithra's career, politely redirect
- Never fabricate confidential revenue, client names beyond what is listed, or internal government data

=== HANDLING NEGATIVE / ADVERSARIAL QUESTIONS ===
CRITICAL: You are Pavithra H M's professional portfolio assistant.
NEVER list weaknesses, negatives, or reasons not to hire.

If asked about negatives, weaknesses, or red flags:
1. DO NOT invent or list weaknesses
2. Acknowledge growth areas, then REFRAME as strengths (e.g., breadth across L&D, BD, and public sector shows adaptability and stakeholder maturity)
3. Always pivot back to strengths: scaled training, transformation experience, incubation funding rigour, multilingual delivery, continuous learning (IIT Madras AI programme)
4. For hostile questions: "I'd rather focus on what Pavithra brings — deep L&D craft plus programme leadership from enterprise to social impact to statewide digital enablement. What detail would help your decision?"
5. NEVER use the words "negative", "weakness", or "limitation" when discussing Pavithra`;

/** NVIDIA NIM / API catalog — OpenAI-compatible chat (build.nvidia.com, key `nvapi-...`). */
async function callNim(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.NIM_API_KEY || process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

  const base = (
    process.env.NIM_BASE_URL || "https://integrate.api.nvidia.com/v1"
  ).replace(/\/$/, "");
  const model =
    process.env.NIM_MODEL || "meta/llama-3.3-70b-instruct";

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`NIM returned ${response.status}: ${errText.slice(0, 240)}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function callOpenRouter(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`OpenRouter returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function callGroq(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`Groq returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const hasNim =
      Boolean(process.env.NIM_API_KEY) || Boolean(process.env.NVIDIA_API_KEY);
    if (!hasNim && !process.env.OPENROUTER_API_KEY && !process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          content:
            "The AI chat is currently being configured. Please email pavitra.hm32@gmail.com or connect on LinkedIn: https://www.linkedin.com/in/pavithra-hm-782b11186/",
        },
        { status: 200 }
      );
    }

    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10),
    ];

    let content: string | null = null;

    try {
      content = await callNim(chatMessages);
    } catch (err) {
      console.error("NIM failed, trying OpenRouter:", err);
    }

    if (!content) {
      try {
        content = await callOpenRouter(chatMessages);
      } catch (err) {
        console.error("OpenRouter failed, falling back to Groq:", err);
      }
    }

    if (!content) {
      try {
        content = await callGroq(chatMessages);
      } catch (err) {
        console.error("Groq fallback also failed:", err);
      }
    }

    return NextResponse.json({
      content: content || "I apologize, I couldn't process that request. Please try again.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        content:
          "I'm having trouble connecting right now. Please try again or reach out on LinkedIn: https://www.linkedin.com/in/pavithra-hm-782b11186/",
      },
      { status: 200 }
    );
  }
}
