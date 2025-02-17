export function saveLocalAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}
export function getLocalAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  return token;
}
export function clearLocalAccessToken() {
  localStorage.removeItem('accessToken');
}
