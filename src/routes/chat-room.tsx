import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/chat-room')({
  component: RouteComponent,
});

function RouteComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // // Fetch existing messages when the room is joined
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const { data } = await axios.get(`/api/messages/${roomId}`);
  //     setMessages(data);
  //   };

  //   fetchMessages();
  // }, [roomId]);

  // Scroll to the bottom of the chat when new messages are added
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  // // Listen for incoming messages
  // useEffect(() => {
  //   socket.on(
  //     'receive-message',
  //     ({ sender, content }: { sender: string; content: string }) => {
  //       setMessages((prev) => [...prev, { sender, content }]);
  //     }
  //   );

  //   socket.on('typing', ({ username }: { username: string }) => {
  //     setTypingUser(username);
  //   });

  //   socket.on('stop-typing', () => {
  //     setTypingUser(null);
  //   });

  //   return () => {
  //     socket.off('receive-message');
  //     socket.off('typing');
  //     socket.off('stop-typing');
  //   };
  // }, []);

  // // Send a message
  // const sendMessage = async () => {
  //   if (!message.trim()) return;

  //   socket.emit('send-message', { roomId, content: message });
  //   setMessages((prev) => [...prev, { sender: 'You', content: message }]);
  //   setMessage('');
  // };

  // // Handle typing events
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMessage(e.target.value);

  //   if (e.target.value.trim()) {
  //     socket.emit('typing', { roomId, username: 'You' });
  //   } else {
  //     socket.emit('stop-typing', { roomId });
  //   }
  // };

  // Handle file uploads
  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const { data } = await axios.post('/api/upload', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });

  //   socket.emit('send-message', { roomId, content: data.fileUrl });
  // };
  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      {/* Chat Header */}
      <div className='bg-blue-500 text-white p-4 text-center'>
        <h2 className='text-xl font-bold'>Room: </h2>
      </div>

      {/* Chat Messages */}
      <div className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === 'You' ? 'text-right' : 'text-left'
            }`}
          >
            <p className='font-bold'>{msg.sender}</p>
            <p>
              {msg.content.startsWith('http') ? (
                <img src={msg.content} alt='Uploaded' className='max-w-xs' />
              ) : (
                msg.content
              )}
            </p>
          </div>
        ))}
        {typingUser && (
          <p className='text-gray-500 italic'>{typingUser} is typing...</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Chat Input */}
      <div className='border-t p-4 bg-white'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={message}
            placeholder='Type a message...'
            className='flex-1 p-2 border rounded'
          />
          <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
            Send
          </button>
          <label className='bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600'>
            Upload
            <input type='file' hidden />
          </label>
        </div>
      </div>
    </div>
  );
}
