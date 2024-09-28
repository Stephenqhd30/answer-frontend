export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}


/**
 * 用户角色列表
 */
export const userRoleEnum = {
  [UserRole.ADMIN]: {
    text: '管理员',
    color: 'processing',
  },
  [UserRole.USER]: {
    text: '用户',
    color: 'success',
  },
  [UserRole.BAN]: {
    text: '禁用',
    color: 'danger',
  },
};
