import type { ResourceItem } from "../data/resources";

type GeneratedBody = {
  takeaways: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, items: T[]) {
  return items[Math.floor(rand() * items.length)]!;
}

function pickManyUnique<T>(rand: () => number, items: T[], count: number) {
  const pool = [...items];
  const out: T[] = [];
  while (pool.length && out.length < count) {
    const idx = Math.floor(rand() * pool.length);
    out.push(pool.splice(idx, 1)[0]!);
  }
  return out;
}

function topicKeywords(resource: ResourceItem) {
  const t = resource.title.toLowerCase();
  if (t.includes("hazard") || t.includes("hazmat")) {
    return {
      domain: "hazardous materials",
      nouns: ["classifications", "SDS", "segregation", "labeling", "incident response"],
      verbs: ["audit", "document", "train", "segregate", "verify"],
      metrics: ["inspection pass rate", "incident rate", "carrier rejection rate"],
    };
  }
  if (t.includes("intermodal")) {
    return {
      domain: "intermodal shipping",
      nouns: ["lane design", "drayage", "terminal dwell", "equipment positioning", "hand-offs"],
      verbs: ["optimize", "consolidate", "rebalance", "model", "synchronize"],
      metrics: ["total landed cost", "on-time delivery", "dwell time"],
    };
  }
  if (t.includes("freight rate") || t.includes("negotiation")) {
    return {
      domain: "freight procurement",
      nouns: ["benchmarks", "contract terms", "accessorials", "volume commitments", "service levels"],
      verbs: ["benchmark", "negotiate", "bundle", "validate", "incentivize"],
      metrics: ["cost per mile", "tender acceptance", "rate volatility"],
    };
  }
  if (t.includes("visibility") || t.includes("transparency")) {
    return {
      domain: "real-time visibility",
      nouns: ["events", "ETAs", "exceptions", "telemetry", "dashboards"],
      verbs: ["track", "detect", "alert", "predict", "resolve"],
      metrics: ["exception resolution time", "ETA accuracy", "OTIF"],
    };
  }
  if (t.includes("peak") || t.includes("holiday")) {
    return {
      domain: "peak season planning",
      nouns: ["capacity", "cutoff times", "inventory buffers", "carrier mix", "playbooks"],
      verbs: ["forecast", "reserve", "prioritize", "stage", "communicate"],
      metrics: ["backlog", "cycle time", "missed SLA rate"],
    };
  }
  if (t.includes("electric") || t.includes("zero emissions")) {
    return {
      domain: "electric freight",
      nouns: ["route suitability", "charging", "fleet mix", "energy costs", "incentives"],
      verbs: ["pilot", "deploy", "analyze", "right-size", "standardize"],
      metrics: ["cost per stop", "CO₂e per shipment", "utilization"],
    };
  }

  // Fallback
  return {
    domain: resource.category.toLowerCase(),
    nouns: ["process", "constraints", "stakeholders", "workflows", "trade-offs"],
    verbs: ["improve", "measure", "align", "standardize", "iterate"],
    metrics: ["lead time", "cost", "service level"],
  };
}

export function generateResourceBody(resource: ResourceItem): GeneratedBody {
  const seedFn = xmur3(`${resource.id}|${resource.title}|${resource.author}`);
  const rand = mulberry32(seedFn());
  const k = topicKeywords(resource);

  const takeawayTemplates = [
    `Start with a baseline for ${pick(rand, k.metrics)} and track it weekly.`,
    `Standardize ${pick(rand, k.nouns)} so exceptions are easy to spot.`,
    `Make "good" explicit: define service targets before you optimize cost.`,
    `Automate the boring checks (validations, alerts, and approvals).`,
    `Create a simple playbook for when conditions change mid-shipment.`,
    `Review carrier and lane performance quarterly—don’t wait for a disruption.`,
  ];

  const takeaways = pickManyUnique(rand, takeawayTemplates, 4);

  const intro = [
    `${resource.title} is ultimately about turning uncertainty into a repeatable decision process.`,
    `Teams that perform well in ${k.domain} focus on the few levers that move outcomes: ${pick(rand, k.nouns)}, ${pick(rand, k.nouns)}, and clear accountability.`,
    `Below is a practical, operations-first walkthrough you can adapt to your network in a week, not a quarter.`,
  ];

  const framework = [
    `Begin by mapping the end-to-end workflow and identifying where information is lost at hand-offs.`,
    `Then ${pick(rand, k.verbs)} the inputs that drive decisions: service requirements, constraints, and the cost model (including accessorials and penalties).`,
    `Finally, define escalation rules so exceptions don’t become emergencies. A lightweight RACI and a single source of truth go a long way.`,
  ];

  const checklist = [
    `Confirm which data fields are required (and who owns them) before execution starts.`,
    `Define the minimum viable KPIs: ${pick(rand, k.metrics)}, plus one operational metric that explains it.`,
    `Set thresholds for alerts and build a short routine: triage, resolve, document, and prevent.`,
    `Run a two-week pilot on a small set of lanes, then expand once the process is stable.`,
  ];

  const pitfalls = [
    `Over-optimizing for a single metric can create hidden costs—watch for downstream impacts like rework and missed cutoffs.`,
    `Inconsistent definitions (what counts as "on time" or "exception") can invalidate analysis. Align terminology early.`,
    `If your team can’t explain why a decision was made, it won’t scale. Prefer simple rules over complex models at first.`,
  ];

  const nextSteps = [
    `If you want to move from theory to execution, pick one lane, one carrier mix, and one KPI to improve.`,
    `Document what changed, what improved, and what broke—then roll those learnings into a reusable playbook.`,
    `Repeat the cycle monthly so improvements compound instead of resetting each peak or disruption.`,
  ];

  const sections: GeneratedBody["sections"] = [
    { heading: "Overview", paragraphs: intro },
    { heading: "A Practical Framework", paragraphs: framework },
    { heading: "Implementation Checklist", paragraphs: checklist },
    { heading: "Common Pitfalls", paragraphs: pitfalls },
    { heading: "Next Steps", paragraphs: nextSteps },
  ];

  // Slight variation per resource
  if (resource.type === "Whitepaper") {
    sections.splice(2, 0, {
      heading: "What to Measure",
      paragraphs: [
        `For ${k.domain}, measurement is the difference between a pilot and a program.`,
        `Use a small scorecard that pairs outcomes (like ${pick(rand, k.metrics)}) with leading indicators (like dwell time, data completeness, or tender response time).`,
      ],
    });
  }

  return { takeaways, sections };
}
