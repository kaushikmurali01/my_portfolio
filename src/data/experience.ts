export interface ExperienceEntry {
  title: string
  company: string
  meta: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Software Developer',
    company: 'Enerva Energy Solutions',
    meta: 'Sep 2024 to May 2026 · Toronto',
    bullets: [
      'Architected and shipped two large-scale customer-facing analytics portals serving 200+ enterprise facilities, on a multi-tenant React and Node.js stack with regulatory-compliant calculation engines, real-time consumption tracking, and geospatial visualizations.',
      'Led an R&D effort integrating gradient-boosting models (XGBoost, LightGBM) and LSTM forecasting alongside the existing ASHRAE/CalTRACK regression baselines, with a CV(RMSE) and NMBE evaluation framework.',
      'Engineered the ML feature pipeline in collaboration with the Alberta Machine Intelligence Institute, covering feature selection, leak prevention, and reproducible training runs.',
      'Built a self-hosted RAG-based Q&A system (local LLM with vector search) and an internal HR portal end to end, both shipped to production for company-wide use.',
      'Migrated 100+ legacy Excel calculation models into versioned API microservices, replacing fragile spreadsheet workflows with auditable, testable services.',
    ],
  },
  {
    title: 'QA Automation Engineer (Co-op)',
    company: 'Proofpoint',
    meta: 'May 2022 to Aug 2023 · Toronto',
    bullets: [
      'Built automated UI and API regression suites in C# and Selenium covering 200+ test cases.',
      'Cut manual QA cycle time by 30% and caught regressions before they shipped to production.',
      'Maintained Jenkins and Bitbucket Pipelines for nightly builds and integration tests across multiple product lines.',
    ],
  },
]
