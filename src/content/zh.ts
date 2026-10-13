/**
 * 中文文案。`alt` 字段是另一种语言的装饰性副标签（中文版显示英文，英文版显示中文），
 * 与主文案成对出现。en.ts 必须与本文件结构一致。
 */
export const zh = {
  locale: "zh",
  htmlLang: "zh-CN",
  ogLocale: "zh_CN",
  home: "/",

  meta: {
    title: "沙尘彼岸 Sandsend · 企业 AI 工程",
    template: "%s · 沙尘彼岸 Sandsend",
    ogTitle: "沙尘彼岸 Sandsend · 沙尽之处，AI 抵岸。",
    description:
      "沙尘彼岸 Sandsend 是一家企业 AI 工程公司：以前线部署工程推动企业 AI 化转型，以轻量化架构构建 AI Agent 系统，并为企业私有化部署、微调模型与组织训练数据。",
    keywords: ["企业 AI", "AI 转型", "前线部署工程", "FDE", "AI Agent", "智能体", "私有化部署", "模型微调", "训练数据", "Sandsend", "沙尘彼岸"],
  },

  brand: { name: "沙尘彼岸", alt: "Sandsend" },

  ui: {
    cta: "预约场景诊断",
    homeLabel: "沙尘彼岸 首页",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    lang: { href: "/en", hrefLang: "en", locale: "en" as "zh" | "en", label: "EN", aria: "Switch to English" },
  },

  nav: [
    { href: "#practices", label: "业务", alt: "Practices" },
    { href: "#stack", label: "体系", alt: "Stack" },
    { href: "#engagement", label: "合作", alt: "Engagement" },
    { href: "#trust", label: "安全", alt: "Trust" },
    { href: "#sectors", label: "行业", alt: "Sectors" },
  ],

  hero: {
    eyebrow: "Enterprise AI · Forward Deployed",
    titleLines: ["沙尽之处，", "AI "],
    titleAccent: "抵岸",
    titleEnd: "。",
    lede: "我们派驻工程师进入企业现场，把分散的数据、流程与模型，连接成真正参与判断与执行的 AI 系统——从一个值钱的业务问题开始，在真实数据上交付，并对结果负责。",
    secondary: "三大业务",
    stats: [
      { value: "4–8", unit: "周", label: "从锁定场景到可运行原型" },
      { value: "100", unit: "%", label: "AI 结论可追溯至数据依据" },
      { value: "0", unit: "", label: "私有化部署下数据出域" },
    ],
  },

  manifesto: {
    label: "Thesis",
    statement: "我们不卖软件。\n我们交付的，是一个具体的业务问题被真正解决掉。",
    points: [
      { k: "01", t: "先找到值钱的场景", d: "从「每天最贵的三个错误决策」出发，把痛点换算成金额，再决定做不做。" },
      { k: "02", t: "在真实数据上做出能跑的系统", d: "不做 PPT 演示。用你的数据、你的流程，几周内做出看得见结果的东西。" },
      { k: "03", t: "再谈平台与规模", d: "一个场景跑通、数字被验证之后，再复制到更多部门、厂区与业务线。" },
    ],
  },

  practicesIntro: {
    label: "Practices · 三大业务",
    titleLines: ["从战略到模型，", "一支团队交付到底"],
    lede: "前线部署工程决定做什么、怎么落地；智能体系统让 AI 真正执行；模型工程把能力沉淀为企业自有的资产。三者可独立合作，也可组合成一次完整的 AI 化转型。",
    deliverables: "Deliverables",
  },

  practices: [
    {
      id: "fde",
      index: "01",
      alt: "Forward Deployed Engineering",
      name: "前线部署工程",
      scope: "企业 AI 化转型",
      lead: "工程师进驻现场，而不是交一份方案书。",
      body: "我们的前线部署工程师（FDE）同时承担工程师、产品经理与解决方案架构师的角色，与业务负责人和技术负责人并肩工作：找出每年真实在亏钱的决策环节，打通 ERP、MES、WMS、CRM 等系统的数据，建立 AI 能理解的业务对象模型，再把 AI 嵌进日常流程。",
      deliverables: [
        "AI 成熟度与价值场景诊断",
        "场景地图与 ROI 测算",
        "数据打通与业务对象建模（Ontology）",
        "嵌入日常流程的 AI 决策工作流",
        "组织赋能与上生产路线图",
      ],
      tags: ["驻场交付", "业务 × 技术双线对接", "无中间层"],
      layers: [0, 1, 2, 3, 4, 5],
    },
    {
      id: "agents",
      index: "02",
      alt: "Agent Systems",
      name: "智能体系统",
      scope: "轻量化 AI Agent 开发",
      lead: "不是聊天机器人，是能读数据、做判断、调工具、执行动作的数字员工。",
      body: "以轻量化架构快速构建企业级 Agent：理解任务、读取数据、做出判断、调用工具、执行动作、获取结果、继续判断。复用你现有的系统与权限体系，不推倒重来；每一条结论都附带依据，每一个关键动作都经人审批。",
      deliverables: [
        "业务 Agent 与多 Agent 编排",
        "企业知识库与检索增强（RAG）",
        "工具调用与系统对接：API · 数据库 · RPA",
        "人机协同审批与审计日志",
        "评测体系与持续迭代",
      ],
      tags: ["周级交付", "轻量部署", "可解释"],
      layers: [3, 4, 5],
    },
    {
      id: "models",
      index: "03",
      alt: "Model Engineering",
      name: "模型工程",
      scope: "模型部署 · 微调 · 训练数据",
      lead: "把模型，变成企业自己的资产。",
      body: "在你的机房或专属云上部署开源大模型与推理服务；用你的业务数据做领域微调与偏好对齐；建立从采集、清洗、标注、合成到评测的训练数据管线。模型权重、数据集与评测基线，全部留在你手里。",
      deliverables: [
        "私有化部署与推理优化：vLLM · 量化 · 多卡调度",
        "模型网关、配额与权限管控",
        "领域微调：SFT · LoRA · DPO",
        "训练数据治理：采集 · 清洗 · 标注 · 合成",
        "评测基准与上线验收",
      ],
      tags: ["数据不出域", "自主可控", "成本可测"],
      layers: [0, 2],
    },
  ],

  visuals: {
    ontology: "业务对象",
    agentSteps: [
      { k: "理解", alt: "Understand", d: "解析任务意图与约束", human: false },
      { k: "读取", alt: "Retrieve", d: "查询 SRM · WMS · 生产计划", human: false },
      { k: "判断", alt: "Reason", d: "基于业务对象与规则推理", human: false },
      { k: "调用", alt: "Tool Call", d: "库存测算 · 替代供应商检索", human: false },
      { k: "审批", alt: "Human Gate", d: "关键动作交由负责人确认", human: true },
      { k: "执行", alt: "Execute", d: "生成采购任务 · 写回系统", human: false },
      { k: "回读", alt: "Observe", d: "核对执行结果，进入下一轮", human: false },
    ],
  },

  stack: {
    label: "Operating Stack",
    title: "一套把数据变成行动的企业 AI 体系",
    lede: "三条业务线不是三个孤立的产品，而是同一套体系的不同切面。悬停或点击业务线，查看它覆盖的层级。",
    layers: [
      { code: "L1", alt: "Data", name: "数据接入", d: "只读接入 ERP、MES、WMS、SRM、CRM 与数据仓库，不改动你的现有系统。" },
      { code: "L2", alt: "Ontology", name: "业务对象模型", d: "把订单、供应商、库存、设备抽象成 AI 能理解的对象与关系。" },
      { code: "L3", alt: "Models", name: "模型层", d: "私有部署的大模型与领域微调模型，经模型网关统一调度与计量。" },
      { code: "L4", alt: "Agents", name: "智能体", d: "基于业务对象做判断、调用工具、生成带依据的建议。" },
      { code: "L5", alt: "Workflow", name: "业务工作流", d: "把判断嵌入审批与执行流程，人始终在回路之中。" },
      { code: "L6", alt: "Action", name: "执行与结果", d: "写回业务系统、生成任务、触发动作，最终以 ROI 衡量。" },
    ],
  },

  control: {
    label: "Live Scenario",
    title: "AI 不只回答问题，而是让事情自动发生",
    lede: "以供应链停线风险为例：系统把供应商、采购、物流、库存与生产计划的数据连起来，提前发现风险、推演影响、给出处置方案，并在人审批后直接生成任务。",
    disclaimer: "示例场景 · 演示数据，不代表任何真实客户",
    metrics: [
      { label: "供应商风险", value: 23 },
      { label: "高风险供应商", value: 7 },
      { label: "预计缺货 SKU", value: 14 },
      { label: "7 日停线风险", value: 3 },
    ],
    chart: "风险指数 · 近 30 日",
    threshold: "— — 告警阈值",
    grid: "供应商矩阵 · 48",
    done: "闭环完成 · 全程留痕可审计",
    log: [
      { t: "09:12:04", tag: "DETECT", text: "供应商 A · 交付延迟（近 30 日第 3 次）" },
      { t: "09:12:05", tag: "LINK", text: "关联物流异常 2 次 · 关键物料库存覆盖 4.2 天" },
      { t: "09:12:07", tag: "INFER", text: "生产计划未来 7 日需求上升 18% → 预计影响 2 号产线" },
      { t: "09:12:09", tag: "PLAN", text: "建议切换至供应商 B · 预计避免损失 ¥830 万" },
      { t: "09:12:09", tag: "CITE", text: "依据：PO-4471 · ASN-0932 · 库存快照 #2210 · 规则 R-17" },
      { t: "09:14:31", tag: "HUMAN", text: "采购经理已审批" },
      { t: "09:14:32", tag: "ACT", text: "已生成采购任务 PO-2026-1187 · 写回 SRM" },
    ],
  },

  engagement: {
    label: "Engagement",
    title: "先做小、做快、做实，再做大",
    lede: "每一个阶段都有明确的产出和进入下一阶段的条件。验收的标准不是系统上线，而是业务动作真的跑在系统里——这一条，我们愿意写进合同。",
    phases: [
      {
        k: "01",
        alt: "Mission Workshop",
        name: "场景验证",
        dur: "1–8 周",
        d: "在你的真实数据上，做出一个真能跑的东西。",
        items: ["数据诊断与流程梳理", "业务对象建模", "Agent 原型与工作流", "ROI 测算与上生产路线图"],
      },
      {
        k: "02",
        alt: "Production",
        name: "生产部署",
        dur: "3–6 个月",
        d: "进入日常业务流程，与考核指标挂钩。",
        items: ["正式系统与系统对接", "权限、审计与安全", "模型部署与持续评测", "培训与运维交接"],
      },
      {
        k: "03",
        alt: "Expansion",
        name: "平台扩展",
        dur: "年度",
        d: "把被验证的能力复制到更多部门与厂区。",
        items: ["多场景、多业务线", "集团级平台与模型网关", "持续迭代与能力共建", "年度框架合作"],
      },
    ],
  },

  trust: {
    label: "Trust",
    title: "大企业最怕的，\n是 AI 看到了不该看的数据",
    lede: "所以安全、权限与审计不是附加项，而是系统的一部分。",
    items: [
      { k: "私有化部署", d: "支持在客户机房或专属云交付，数据不出你的网络。" },
      { k: "只读接入", d: "不改动现有系统；权限沿用你的 SSO 与账号体系。" },
      { k: "结论可追溯", d: "每一条判断都指向具体的单据、记录与规则。" },
      { k: "人在回路", d: "AI 给出判断与建议，关键动作由人审批后执行。" },
      { k: "全程审计", d: "每一次查询、推理与执行都留痕，可回放、可问责。" },
      { k: "资产归你", d: "模型、数据集、方法与文档，全部交付给客户。" },
    ],
  },

  sectors: {
    label: "Sectors",
    title: "只深耕少数几个行业",
    lede: "行业越集中，方法、数据模型与经验的复用就越深。我们优先服务系统多、数据散、关键决策仍依赖经验与表格的大型企业。",
    cases: "典型场景",
    list: [
      {
        alt: "Manufacturing",
        name: "制造业",
        sub: "汽车 · 新能源 · 电池 · 半导体 · 化工 · 医药",
        cases: ["供应链停线预警", "库存与呆滞优化", "设备非计划停机", "质量异常溯源"],
      },
      {
        alt: "Logistics & Supply Chain",
        name: "物流与供应链",
        sub: "大型物流 · 跨境物流 · 仓配网络",
        cases: ["交付延误预测", "运力与路径调度", "异常件自动处置", "供应商绩效评估"],
      },
      {
        alt: "Retail & Trading",
        name: "零售与大型贸易",
        sub: "零售集团 · 电商 · 大宗贸易",
        cases: ["需求预测与补货", "采购价差优化", "价格与促销决策", "门店运营助手"],
      },
      {
        alt: "Financial Services",
        name: "金融",
        sub: "银行 · 保险 · 券商 · 消费金融",
        cases: ["风控与合规审查", "投研与报告辅助", "运营流程自动化", "私有化模型底座"],
      },
    ],
  },

  closing: {
    label: "Begin",
    questionLines: ["你的公司，", "每天最贵的三个"],
    questionAccent: "错误决策是什么？",
    lede: "约一次 30 分钟的场景诊断。不演示 PPT，不急着报价——我们只听你的现状，然后告诉你，哪个问题值得用 AI 解决。",
    cta: "预约场景诊断",
    mailSubject: "预约场景诊断",
    mailBody: "公司：\n行业：\n联系人 / 职位：\n希望讨论的业务问题：\n",
  },

  footer: {
    blurb: "企业 AI 工程公司。前线部署工程、智能体系统与模型工程，从一个值钱的业务问题开始。",
    practices: "业务",
    nav: "导航",
    contact: "联系",
    legal: "沙尘彼岸 Sandsend · 风纱控股 Stormveil 旗下运营公司",
  },
};

export type Content = typeof zh;
export type Practice = Content["practices"][number];
