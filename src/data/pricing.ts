export interface ModelOption {
  id: string
  label: string
  description: string
  inputPer1M: number
  outputPer1M: number
  supportsCache: boolean
}

export const models: ModelOption[] = [
  {
    id: 'claude-opus-4-7',
    label: 'Claude Opus 4.7',
    description: 'most capable',
    inputPer1M: 15,
    outputPer1M: 75,
    supportsCache: true,
  },
  {
    id: 'claude-sonnet-4-6',
    label: 'Claude Sonnet 4.6',
    description: 'balanced',
    inputPer1M: 3,
    outputPer1M: 15,
    supportsCache: true,
  },
  {
    id: 'claude-haiku-4-5',
    label: 'Claude Haiku 4.5',
    description: 'fastest',
    inputPer1M: 0.8,
    outputPer1M: 4,
    supportsCache: true,
  },
  {
    id: 'gpt-4o',
    label: 'GPT-4o',
    description: 'OpenAI flagship',
    inputPer1M: 2.5,
    outputPer1M: 10,
    supportsCache: false,
  },
  {
    id: 'gpt-4o-mini',
    label: 'GPT-4o mini',
    description: 'fast and cheap',
    inputPer1M: 0.15,
    outputPer1M: 0.6,
    supportsCache: false,
  },
  {
    id: 'gemini-2-flash',
    label: 'Gemini 2.0 Flash',
    description: 'Google, fast',
    inputPer1M: 0.1,
    outputPer1M: 0.4,
    supportsCache: false,
  },
  {
    id: 'o4-mini',
    label: 'o4-mini',
    description: 'OpenAI reasoning',
    inputPer1M: 1.1,
    outputPer1M: 4.4,
    supportsCache: false,
  },
]
