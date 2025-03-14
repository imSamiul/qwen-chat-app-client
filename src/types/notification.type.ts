import { z } from 'zod';

export const notificationSchema = z.object({
  _id: z.string(),
  recipient: z.string(),
  sender: z.string(),
  type: z.enum(['friend_request']), // Add more types as needed
  content: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(), // or z.date() if you parse it
  updatedAt: z.string(), // or z.date() if you parse it
  __v: z.number(),
});

export const notificationArraySchema = z.array(notificationSchema);

// You can also create a TypeScript type from the schema
export type Notification = z.infer<typeof notificationSchema>;
export type NotificationArray = z.infer<typeof notificationArraySchema>;
