import { SearchForFriend } from '@/types/auth.types';
import { getErrorMessage } from '@/utils/errorHandler';
import axios from 'axios';
import { instance } from './instance.api';

export const friendApi = {
  searchFriend: async (uniqueId: string): Promise<SearchForFriend | null> => {
    try {
      const { data } = await instance.get<SearchForFriend>(
        `/friend/search-friend?uniqueId=${uniqueId}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle known error responses (e.g., 404, 401)
        if (error.response.status === 404) {
          console.log('User not found');
          return null; // Or set state to indicate no user found
        }
      }

      throw new Error(getErrorMessage(error));
    }
  },
};
