import {
  NotificationArray,
  notificationArraySchema,
} from '@/types/notification.type';
import { getErrorMessage } from '@/utils/errorHandler';
import { instance } from './instance.api';

export const authApi = {
  getNotification: async (): Promise<NotificationArray> => {
    try {
      const { data } = await instance.get<NotificationArray>(
        '/notification/get-notifications'
      );
      const parsedData = notificationArraySchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
      }
      return parsedData.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
