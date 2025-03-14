import { z } from 'zod';

export const userSchema = z.object({
  _id: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  friends: z.array(z.string()),
  friendRequests: z.array(z.string()),
  uniqueID: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export type SearchForFriend = {
  user: User;
  hasSentRequest: boolean;
  hasReceiveRequest: boolean;
  isFriend: boolean;
};

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, 'Username must be at least 4 characters long'),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long'),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
