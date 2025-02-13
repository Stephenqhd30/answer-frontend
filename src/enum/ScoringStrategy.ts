/**
 * 评分策略（0-自定义，1-AI）
 */
export enum ScoringStrategy {
  CUSTOM = 0,
  AI = 1,
}

export const scoringStrategyEnum = {
  [ScoringStrategy.CUSTOM]: {
    text: '自定义',
    value: ScoringStrategy.CUSTOM,
  },
  [ScoringStrategy.AI]: {
    text: 'AI',
    value: ScoringStrategy.AI,
  }
};
