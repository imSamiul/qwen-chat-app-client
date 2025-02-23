import { SearchForFriend } from '@/types/auth.types';
import { getErrorMessage } from '@/utils/errorHandler';
import { instance } from './instance.api';

export const friendApi = {
  searchFriend: async (uniqueId: string): Promise<SearchForFriend> => {
    try {
      const { data } = await instance.get<SearchForFriend>(
        `/friend/search-friend?uniqueId=${uniqueId}`
      );
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
