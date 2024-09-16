/**
 * 审核状态：0-待审核, 1-通过, 2-拒绝
 */
export enum ReviewStatusEnum {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

export const reviewStatusEnum = {
  0: { text: '待审核', color: 'warning' },
  1: { text: '通过', color: 'success' },
  2: { text: '拒绝', color: 'error' },
};

