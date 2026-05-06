export interface SkillCategory {
  label: string
  items: string[]
}

export const skills: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'FastAPI', 'Express', 'REST APIs', 'Microservices'],
  },
  {
    label: 'ML / AI',
    items: ['PyTorch', 'XGBoost', 'LightGBM', 'LSTM', 'Vision Transformers', 'RAG', 'Anthropic API'],
  },
  {
    label: 'Data & Storage',
    items: ['PostgreSQL', 'Redis', 'Vector DBs', 'ETL pipelines'],
  },
  {
    label: 'DevOps & Tools',
    items: ['Docker', 'CI/CD', 'Jenkins', 'Git', 'Selenium', 'Prometheus'],
  },
]
