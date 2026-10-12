import type { Content } from "./zh";

export const en: Content = {
  locale: "en",
  htmlLang: "en",
  ogLocale: "en_US",
  home: "/en",

  meta: {
    title: "Sandsend · Enterprise AI Engineering",
    template: "%s · Sandsend",
    ogTitle: "Sandsend · Carry AI to the far shore",
    description:
      "Sandsend is an enterprise AI engineering company. We drive AI transformation through forward deployed engineering, build AI agent systems on a lightweight architecture, and deploy, fine-tune and curate training data for private enterprise models.",
    keywords: ["enterprise AI", "AI transformation", "forward deployed engineering", "FDE", "AI agents", "private deployment", "fine-tuning", "training data", "Sandsend"],
  },

  brand: { name: "Sandsend", alt: "沙尘彼岸" },

  ui: {
    cta: "Book a diagnostic",
    homeLabel: "Sandsend home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    lang: { href: "/", hrefLang: "zh-CN", label: "中文", aria: "切换到中文" },
  },

  nav: [
    { href: "#practices", label: "Practices", alt: "业务" },
    { href: "#stack", label: "Stack", alt: "体系" },
    { href: "#engagement", label: "Engagement", alt: "合作" },
    { href: "#trust", label: "Trust", alt: "安全" },
    { href: "#sectors", label: "Sectors", alt: "行业" },
  ],

  hero: {
    eyebrow: "Enterprise AI · Forward Deployed",
    titleLines: ["Carry AI to", "the "],
    titleAccent: "far shore",
    lede: "We embed engineers inside your enterprise and connect scattered data, processes and models into AI systems that genuinely take part in judgment and execution — starting from one business problem worth solving, delivered on real data, and accountable for the outcome.",
    secondary: "Three practices",
    stats: [
      { value: "4–8", unit: "wk", label: "From locked use case to running prototype" },
      { value: "100", unit: "%", label: "AI conclusions traceable to source data" },
      { value: "0", unit: "", label: "Data leaving your network in private deployments" },
    ],
  },

  manifesto: {
    label: "Thesis",
    statement: "We don't sell software.\nWe deliver one specific business problem, actually solved.",
    points: [
      { k: "01", t: "Find the use case worth money", d: "Start from the three most expensive wrong decisions you make every day, put a price on the pain, then decide whether to build." },
      { k: "02", t: "Ship a working system on real data", d: "No slideware. With your data and your processes, we build something with visible results in weeks." },
      { k: "03", t: "Then talk platform and scale", d: "Once one use case runs and the numbers hold up, we replicate it across more departments, plants and business lines." },
    ],
  },

  practicesIntro: {
    label: "Practices · 三大业务",
    titleLines: ["From strategy to models,", "one team, end to end"],
    lede: "Forward deployed engineering decides what to build and how it lands; agent systems let AI actually execute; model engineering turns capability into assets the enterprise owns. Engage any one on its own, or combine all three into a complete AI transformation.",
    deliverables: "Deliverables",
  },

  practices: [
    {
      id: "fde",
      index: "01",
      alt: "前线部署工程",
      name: "Forward Deployed Engineering",
      scope: "Enterprise AI transformation",
      lead: "Engineers on site — not a strategy deck.",
      body: "Our forward deployed engineers (FDEs) act as engineer, product manager and solutions architect at once, working side by side with your business and technology leads. We find the decisions that genuinely lose money every year, connect data across ERP, MES, WMS, CRM and other systems, build a business object model AI can understand, then embed AI into everyday workflows.",
      deliverables: [
        "AI maturity and value-case assessment",
        "Use-case map and ROI model",
        "Data integration and business object modeling (Ontology)",
        "AI decision workflows embedded in daily operations",
        "Enablement and path-to-production roadmap",
      ],
      tags: ["On-site delivery", "Business × tech in one team", "No middle layer"],
      layers: [0, 1, 2, 3, 4, 5],
    },
    {
      id: "agents",
      index: "02",
      alt: "智能体系统",
      name: "Agent Systems",
      scope: "Lightweight AI agent development",
      lead: "Not chatbots — digital workers that read data, judge, call tools and act.",
      body: "We build enterprise-grade agents fast on a lightweight architecture: understand the task, read the data, make a judgment, call tools, take action, observe the result, and judge again. We reuse your existing systems and permission model instead of starting over; every conclusion carries its evidence, and every critical action is approved by a person.",
      deliverables: [
        "Business agents and multi-agent orchestration",
        "Enterprise knowledge base and retrieval augmentation (RAG)",
        "Tool calling and integration: API · database · RPA",
        "Human-in-the-loop approvals and audit logs",
        "Evaluation framework and continuous iteration",
      ],
      tags: ["Delivered in weeks", "Lightweight deployment", "Explainable"],
      layers: [3, 4, 5],
    },
    {
      id: "models",
      index: "03",
      alt: "模型工程",
      name: "Model Engineering",
      scope: "Deployment · fine-tuning · training data",
      lead: "Turn models into assets your company owns.",
      body: "We deploy open-weight LLMs and inference services in your data center or dedicated cloud, fine-tune and preference-align them on your business data, and build a training-data pipeline from collection, cleaning and labeling to synthesis and evaluation. Model weights, datasets and evaluation baselines all stay in your hands.",
      deliverables: [
        "Private deployment and inference optimization: vLLM · quantization · multi-GPU scheduling",
        "Model gateway, quotas and access control",
        "Domain fine-tuning: SFT · LoRA · DPO",
        "Training data governance: collection · cleaning · labeling · synthesis",
        "Evaluation benchmarks and go-live acceptance",
      ],
      tags: ["Data stays in-house", "Fully under your control", "Measurable cost"],
      layers: [0, 2],
    },
  ],

  visuals: {
    ontology: "Object model",
    agentSteps: [
      { k: "Understand", alt: "理解", d: "Parse task intent and constraints", human: false },
      { k: "Retrieve", alt: "读取", d: "Query SRM · WMS · production plan", human: false },
      { k: "Reason", alt: "判断", d: "Reason over business objects and rules", human: false },
      { k: "Tool Call", alt: "调用", d: "Inventory calc · alternate supplier search", human: false },
      { k: "Approve", alt: "审批", d: "Critical actions confirmed by the owner", human: true },
      { k: "Execute", alt: "执行", d: "Create purchase task · write back", human: false },
      { k: "Observe", alt: "回读", d: "Check results, start the next loop", human: false },
    ],
  },

  stack: {
    label: "Operating Stack",
    title: "One enterprise AI stack that turns data into action",
    lede: "The three practices aren't isolated products — they are facets of the same stack. Hover or tap a practice to see the layers it covers.",
    layers: [
      { code: "L1", alt: "数据接入", name: "Data", d: "Read-only connections to ERP, MES, WMS, SRM, CRM and your data warehouse. Existing systems stay untouched." },
      { code: "L2", alt: "业务对象模型", name: "Ontology", d: "Orders, suppliers, inventory and equipment, abstracted into objects and relationships AI can understand." },
      { code: "L3", alt: "模型层", name: "Models", d: "Privately deployed LLMs and domain fine-tuned models, routed and metered through one model gateway." },
      { code: "L4", alt: "智能体", name: "Agents", d: "Reason over business objects, call tools, and produce recommendations backed by evidence." },
      { code: "L5", alt: "业务工作流", name: "Workflow", d: "Judgments embedded in approval and execution flows, with a human always in the loop." },
      { code: "L6", alt: "执行与结果", name: "Action", d: "Write back to business systems, create tasks, trigger actions — ultimately measured in ROI." },
    ],
  },

  control: {
    label: "Live Scenario",
    title: "AI that doesn't just answer — it makes things happen",
    lede: "Take supply-chain line-stoppage risk. The system links supplier, procurement, logistics, inventory and production-plan data to spot risk early, simulate the impact, propose a response and, once a person approves, create the task directly.",
    disclaimer: "Illustrative scenario · demo data, not a real customer",
    metrics: [
      { label: "Supplier risks", value: 23 },
      { label: "High-risk suppliers", value: 7 },
      { label: "SKUs at risk", value: 14 },
      { label: "7-day line-stop risks", value: 3 },
    ],
    chart: "Risk index · last 30 days",
    threshold: "— — Alert threshold",
    grid: "Supplier matrix · 48",
    done: "Loop closed · fully logged and auditable",
    log: [
      { t: "09:12:04", tag: "DETECT", text: "Supplier A · late delivery (3rd in 30 days)" },
      { t: "09:12:05", tag: "LINK", text: "2 linked logistics exceptions · critical stock cover 4.2 days" },
      { t: "09:12:07", tag: "INFER", text: "7-day demand up 18% in production plan → Line 2 at risk" },
      { t: "09:12:09", tag: "PLAN", text: "Switch to Supplier B · est. loss avoided ¥8.3M" },
      { t: "09:12:09", tag: "CITE", text: "Evidence: PO-4471 · ASN-0932 · stock snapshot #2210 · rule R-17" },
      { t: "09:14:31", tag: "HUMAN", text: "Approved by procurement manager" },
      { t: "09:14:32", tag: "ACT", text: "Purchase task PO-2026-1187 created · written back to SRM" },
    ],
  },

  engagement: {
    label: "Engagement",
    title: "Start small, fast and real. Then go big.",
    lede: "Every phase has a clear output and clear criteria for moving on. Acceptance isn't the system going live — it's the business actually running on it. That one we're willing to put in the contract.",
    phases: [
      {
        k: "01",
        alt: "场景验证",
        name: "Validation",
        dur: "1–8 weeks",
        d: "Build something that genuinely runs, on your real data.",
        items: ["Data diagnostics and process mapping", "Business object modeling", "Agent prototype and workflow", "ROI model and production roadmap"],
      },
      {
        k: "02",
        alt: "生产部署",
        name: "Production",
        dur: "3–6 months",
        d: "Woven into daily operations and tied to performance metrics.",
        items: ["Production system and integrations", "Permissions, audit and security", "Model deployment and ongoing evaluation", "Training and operations handover"],
      },
      {
        k: "03",
        alt: "平台扩展",
        name: "Expansion",
        dur: "Annual",
        d: "Replicate proven capabilities across more departments and sites.",
        items: ["More use cases and business lines", "Group-wide platform and model gateway", "Continuous iteration and co-building", "Annual framework agreement"],
      },
    ],
  },

  trust: {
    label: "Trust",
    title: "What large enterprises fear most\nis AI seeing data it shouldn't",
    lede: "That's why security, permissions and audit aren't add-ons — they're part of the system.",
    items: [
      { k: "Private deployment", d: "Delivered in your data center or dedicated cloud. Data never leaves your network." },
      { k: "Read-only access", d: "No changes to existing systems; permissions follow your SSO and accounts." },
      { k: "Traceable conclusions", d: "Every judgment points to specific documents, records and rules." },
      { k: "Human in the loop", d: "AI proposes judgments and recommendations; critical actions run only after human approval." },
      { k: "Full audit trail", d: "Every query, inference and action is logged — replayable and accountable." },
      { k: "You own the assets", d: "Models, datasets, methods and documentation are all handed over to you." },
    ],
  },

  sectors: {
    label: "Sectors",
    title: "Deep in only a few industries",
    lede: "The more focused the industries, the more our methods, data models and experience compound. We prioritize large enterprises with many systems, scattered data, and critical decisions still run on experience and spreadsheets.",
    cases: "Typical use cases",
    list: [
      {
        alt: "制造业",
        name: "Manufacturing",
        sub: "Automotive · New energy · Batteries · Semiconductors · Chemicals · Pharma",
        cases: ["Line-stoppage early warning", "Inventory and slow-stock optimization", "Unplanned equipment downtime", "Quality issue root-cause tracing"],
      },
      {
        alt: "物流与供应链",
        name: "Logistics & Supply Chain",
        sub: "Large-scale logistics · Cross-border · Warehousing & distribution",
        cases: ["Delivery delay prediction", "Capacity and route scheduling", "Automated exception handling", "Supplier performance scoring"],
      },
      {
        alt: "零售与大型贸易",
        name: "Retail & Trading",
        sub: "Retail groups · E-commerce · Commodity trading",
        cases: ["Demand forecasting and replenishment", "Purchase price optimization", "Pricing and promotion decisions", "Store operations assistant"],
      },
      {
        alt: "金融",
        name: "Financial Services",
        sub: "Banking · Insurance · Securities · Consumer finance",
        cases: ["Risk and compliance review", "Research and report assistance", "Operations process automation", "Private model foundation"],
      },
    ],
  },

  closing: {
    label: "Begin",
    questionLines: ["What are the three", "costliest wrong calls"],
    questionAccent: "your company makes daily?",
    lede: "Book a 30-minute use-case diagnostic. No slide decks, no rush to quote — we listen to where you are today, then tell you which problem is worth solving with AI.",
    cta: "Book a diagnostic",
    mailSubject: "Use-case diagnostic request",
    mailBody: "Company:\nIndustry:\nName / title:\nBusiness problem to discuss:\n",
  },

  footer: {
    blurb: "An enterprise AI engineering company. Forward deployed engineering, agent systems and model engineering — starting from one business problem worth solving.",
    practices: "Practices",
    nav: "Navigate",
    contact: "Contact",
    legal: "Sandsend · An operating company of Stormveil",
  },
};
