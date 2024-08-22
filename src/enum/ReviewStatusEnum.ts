/**
 * 审核状态：0-待审核, 1-通过, 2-拒绝
 */
export enum ReviewStatusEnum {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 审核状态列表
 */
export const reviewStatusList = [
  {
    label: '待审核',
    value: 0,
  },
  {
    label: '通过',
    value: 1,
  },
  {
    label: '拒绝',
    value: 2,
  },
];

export const reviewTagColor = ['warning', 'success', 'error'];
