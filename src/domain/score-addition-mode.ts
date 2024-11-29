const scoreAdditionModes = ['add', 'set', 'steal'] as const
export type ScoreAdditionMode = (typeof scoreAdditionModes)[number]
