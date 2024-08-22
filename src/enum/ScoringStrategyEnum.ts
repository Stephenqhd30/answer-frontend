/**
 * 评分策略（0-自定义，1-AI）
 */
export enum ScoringStrategyEnum {
  CUSTOM = 0,
  AI = 1,
}

export const scoringStrategyList = [
  {
    label: "自定义",
    value: 0,
  },
  {
    label: "AI",
    value: 1,
  }
]
