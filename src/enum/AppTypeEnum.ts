/**
 * 应用类型（0-得分类，1-测评类）
 */
export enum AppTypeEnum {
  SCORE = 0,
  TEXT = 1,
}

export const appTypeEnum = {
  0: { text: '得分类应用' },
  1: { text: '测评类应用' },
};
/**
 * 应用类型列表
 */
export const appTypeList = [
  {
    label: "得分类应用",
    value: 0,
  },
  {
    label: "测评类应用",
    value: 1,
  },
];
