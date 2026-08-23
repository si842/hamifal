export type ProjectSectionBlock = {
  text: string;
  strong?: boolean;
};

export type ProjectSection = {
  label: string;
  body: (string | ProjectSectionBlock)[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  year: string;
  summary: string;
  description: string;
  visualTone: "ink" | "steel" | "sand" | "olive";
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "paylens",
    name: "PAYLENS",
    category: "Enterprise fintech & data",
    tags: ["ENTERPRISE", "FINTECH", "DATA"],
    year: "2025 – present",
    summary:
      "Insurance agencies drown in fragmented data from different insurers, portals, and formats. Paylens was built to turn that mess into one structured layer agencies can run on.",
    description:
      "Insurance agencies drown in fragmented data: different insurers, portals, formats, and reports that never agree.\n\nPaylens turns that mess into one structured data layer for reporting, reconciliation, automation, and better decisions.\n\nThe company has a shipping enterprise product and real customers in the market.",
    visualTone: "steel",
    sections: [
      {
        label: "Context",
        body: [
          "Insurance agencies run on dense, fragmented data across the ecosystem. Manual processes and disconnected systems make accuracy and scale hard to sustain, and buying enterprise software in this market is slow, relational, and high-stakes.",
        ],
      },
      {
        label: "Opportunity",
        body: [
          "Build an operating system that turns fragmented insurance data into a reliable operational layer for the agency, then prove the business through real enterprise buying cycles.",
        ],
      },
      {
        label: "What we did",
        body: [
          "Built the company end-to-end: market research, customer validation, product strategy, architecture, hiring, and enterprise sales from discovery through close.",
        ],
      },
      {
        label: "Product",
        body: [
          "A configurable operating platform for insurance agencies.",
          "Data flows through a common engine: ingestion from external systems, reconciliation across sources, normalization into a consistent model, analysis, and operational workflows built on top.",
          "AI sits across that stack to help users query, understand, and act on the data without replacing the underlying deterministic systems.",
        ],
      },
      {
        label: "Architecture",
        body: [
          "A modular automation and data engine designed around the full flow:",
          {
            text: "Ingestion → Reconciliation → Normalization → Analysis → Operations → AI",
            strong: true,
          },
          "Each layer is configurable to the agency, while the underlying platform remains consistent across customers.",
        ],
      },
      {
        label: "Execution",
        body: [
          "Iterate against live agency workflows and enterprise buying cycles. Feed what users need, and what actually closes, back into the product.",
        ],
      },
      {
        label: "Outcome",
        body: [
          "A shipping enterprise platform, a validated market, a team built around the problem, and closed enterprise deals, with the technical foundation to support increasingly complex agency operations.",
        ],
      },
    ],
  },
  {
    slug: "stealth",
    name: "STEALTH",
    category: "Intelligence Operations",
    tags: ["AI NATIVE", "MULTI-SOURCE"],
    year: "2026 – present",
    summary:
      "Operators cannot hold dozens of sources in their head, and gathering that evidence by hand is too slow. Built to collect across sources quickly, keep context across far more information than a person can track, and produce one coherent picture operators can use.",
    description:
      "Operators cannot hold dozens of sources in their head, and gathering that evidence by hand is too slow.\n\nStealth collects across sources quickly, maintains context across far more information than one operator can track, and turns it into one coherent picture.\n\nThe product is in market, with early design partners shaping its next stage.",
    visualTone: "ink",
    sections: [
      {
        label: "Context",
        body: [
          "Intelligence work is inherently multi-source. Operators needed a system that could collect broadly, retrieve precisely, and reason across information without losing provenance.",
        ],
      },
      {
        label: "What we built",
        body: [
          "An AI-native intelligence platform for multi-source collection, retrieval, and analysis.",
          "The product combines agent workflows, embeddings, vector retrieval, RAG, access controls, and auditability in a system designed for sustained operator use.",
        ],
      },
      {
        label: "What we did",
        body: [
          "Helped build and develop the product, and worked on product and strategy, with some early market validation.",
        ],
      },
      {
        label: "Outcome",
        body: [
          "A launched product, early design-partner engagement, and a team built around the problem, with the foundation for commercial growth.",
        ],
      },
    ],
  },
  {
    slug: "modge",
    name: "MODGE",
    category: "Outsourcing & productivity",
    tags: ["OUTSOURCING", "OPERATIONS", "PRODUCTIVITY"],
    year: "2025",
    summary:
      "Outsourcing and ops teams manage work through forms filled out after the fact. Modge was built to capture real work as it happens and turn it into timesheets and insight leaders can trust.",
    description:
      "Outsourcing and ops teams manage work through forms people fill out after the work is done. The real activity stays invisible.\n\nModge captures work as it happens, then turns it into timesheets, workflows, and productivity insight leaders can trust.\n\nThe product was built and launched in 2025.",
    visualTone: "sand",
    sections: [
      {
        label: "Context",
        body: [
          "Distributed teams generate enormous amounts of operational data, but most workforce systems reduce it to timesheets and attendance. Managers can see hours worked, but not how work actually happens or where productivity breaks down.",
        ],
      },
      {
        label: "Opportunity",
        body: [
          "Build a workforce intelligence platform that automatically captures work, connects activity to people and projects, and turns that operational data into useful management insight, without relying on manual reporting or invasive surveillance.",
        ],
      },
      {
        label: "What we did",
        body: [
          "Worked from thesis through product creation: opportunity framing, product strategy, desktop-agent architecture, data models, core workforce workflows, and the first intelligence layers.",
        ],
      },
      {
        label: "Product",
        body: [
          "A workforce operating platform spanning automatic time capture, activity classification, projects, timesheets, approvals, scheduling, attendance, and management insights.",
          "Instead of treating time tracking as the product, the system creates a structured operational dataset that can support increasingly sophisticated workforce intelligence.",
        ],
      },
      {
        label: "Architecture",
        body: [
          "A desktop-to-cloud data platform built around reliable activity capture, privacy boundaries, session and project modeling, approval workflows, payroll-ready outputs, and analytical layers built on top of operational data.",
        ],
      },
      {
        label: "Execution",
        body: [
          "Built the core product foundation end-to-end: desktop collection, data processing, timesheet rollups, manager workflows, and the first insight surfaces that turned raw activity into something teams could actually operate on.",
        ],
      },
      {
        label: "Outcome",
        body: [
          "Built and launched the core product in 2025.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  return projects.filter((project) => project.slug !== slug).slice(0, count);
}
