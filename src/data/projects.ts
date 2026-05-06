export interface Project {
  number: string
  title: string
  url: string
  tagline: string
  description: string
  stack: string[]
  meta: string
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'LLM Code Review Bot',
    url: 'https://github.com/kaushikmurali01/llm-code-review',
    tagline: "A GitHub App that reads pull requests so your senior engineers don't have to.",
    description:
      'Open-source GitHub App that reviews PRs using Claude. Posts inline comments with severity tags, suggested fixes, and security/performance categorization. Architected with a FastAPI webhook server, Redis-backed RQ queue for async PR analysis, HMAC-SHA256 signature verification, and prompt caching to cut token costs ~60%.',
    stack: ['Python', 'FastAPI', 'Anthropic API', 'Redis · RQ', 'Docker'],
    meta: '14 tests · CI',
  },
  {
    number: '02',
    title: 'Distributed Job Scheduler',
    url: 'https://github.com/kaushikmurali01/distributed-job-scheduler',
    tagline:
      'Cron-style scheduling, leader election, and at-least-once delivery, without the operational pain of bigger queues.',
    description:
      'Multi-node scheduler with Redis-backed leader election (compare-and-renew Lua script for race-free renewal), exponential backoff with jitter, dead-letter queue, and Postgres FOR UPDATE SKIP LOCKED for fair work-stealing. Load-tested to 10K jobs/min across 5 worker nodes.',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Prometheus'],
    meta: '13 tests · TypeScript strict',
  },
  {
    number: '03',
    title: 'Chest X-Ray Multi-Classification',
    url: 'https://github.com/kaushikmurali01/ViT-Chest-Xray',
    tagline:
      'A comparative study of three architectures on the NIH ChestX-ray14 dataset, published on arXiv.',
    description:
      'Co-authored research comparing CNN, ResNet, and Vision Transformer architectures for 14-class multi-label classification of thoracic diseases. Built the training and evaluation pipeline in PyTorch covering data preprocessing for 100K+ X-ray images, fine-tuning of pretrained weights, and from-scratch ViT training.',
    stack: ['Python', 'PyTorch', 'Vision Transformers', 'ResNet'],
    meta: 'Paper ↗ · Source ↗',
  },
]
