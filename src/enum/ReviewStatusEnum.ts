/**
 * 审核状态：0-待审核, 1-通过, 2-拒绝
 */
export enum ReviewStatus {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 审核状态枚举
 */
export const reviewStatusEnum = {
  [ReviewStatus.REVIEWING]: {
    text: '待审核',
    label: '待审核',
    value: ReviewStatus.REVIEWING,
    color: 'warning',
  },
  [ReviewStatus.PASS]: {
    text: '通过',
    label: '待审核',
    value: ReviewStatus.PASS,
    color: 'success',
  },
  [ReviewStatus.REJECT]: {
    text: '拒绝',
    label: '待审核',
    value: ReviewStatus.REJECT,
    color: 'error',
  },
};

