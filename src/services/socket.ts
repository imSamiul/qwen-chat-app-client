import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(accessToken: string) {
    if (this.socket?.connected) {
      this.socket.disconnect(); // Disconnect if already connected
    }

    this.socket = io(import.meta.env.VITE_BASE_URL || 'http://localhost:3000', {
      auth: {
        socket_token: accessToken,
      },
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('newFriendRequest', (data) => {
      console.log('New friend request:', data);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
      // Optional: Log only, no refresh logic here
    });
  }

  // Use a generic type for the emit method
  emit<T = unknown>(event: string, data: T): void {
    this.socket?.emit(event, data);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
