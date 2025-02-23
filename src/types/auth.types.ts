export type User = {
  _id?: string;
  username: string;
  email: string;
  avatar: string;
  friends: string[];
  friendRequests: string[];
  uniqueId: string;
};
export type LoginCredentials = {
  email: string;
  password: string;
};
export type SearchForFriend = {
  user: User;
  hasSentRequest: boolean;
  isFriend: boolean;
};
export type SignupCredentials = {
  username: string;
  email: string;
  password: string;
};
export type AuthResponse = {
  user: User;
  accessToken: string;
};
