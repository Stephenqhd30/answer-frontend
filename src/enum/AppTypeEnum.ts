/**
 * 应用类型（0-得分类，1-测评类）
 */
export enum AppType {
  SCORE = 0,
  TEXT = 1,
}

export const appTypeEnum = {
  [AppType.SCORE]: { text: '得分类应用' },
  [AppType.TEXT]: { text: '测评类应用' },
};
