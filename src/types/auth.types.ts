export type User = {
  _id?: string;
  username: string;
  email: string;
};
export type LoginCredentials = {
  email: string;
  password: string;
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
