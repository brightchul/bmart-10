export type User = {
  email: string;
  password: string;
  userName: string;
  type?: string;
  salt: string;
  deleteFlag?: boolean;
  vipFlag?: boolean;
  wishArray?: any;
};
