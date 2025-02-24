import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: localStorage.getItem('accessToken'), // Get the token from local storage or wherever you store it
  },
});

export default socket;
