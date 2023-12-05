export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountType: string;
  avatarUrl: string;
};

export type Data = {
  user: UserInfo;
};
