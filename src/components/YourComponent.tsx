import { useEffect } from 'react';
import socket from '../socketClient';

const YourComponent = () => {
  useEffect(() => {
    socket.on('newFriendRequest', (data) => {
      console.log('New friend request from:', data.senderId);
    });

    return () => {
      socket.off('newFriendRequest'); // Clean up the listener on unmount
    };
  }, []);

  return <div>Your Component</div>;
};

export default YourComponent;
