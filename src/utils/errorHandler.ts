import axios from 'axios';

export function getErrorMessage(error: unknown): string {
  console.log(error);
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
