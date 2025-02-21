
Let’s design and implement a real-time chat application with the features you’ve described using the MERN stack (MongoDB with Mongoose, Express.js, React, Node.js), TypeScript, Tailwind CSS, JWT authentication, and Socket.IO for real-time communication. I’ll include additional features like typing indicators, message read status, and file sharing, along with your specific requirements:

1. **Individual Messaging**: Users can search for another user by username, send a message request, and start chatting once accepted.
2. **Group Chats**: Users can create group chats and invite others by username, but only if they are mutual friends (i.e., both have accepted each other’s message requests).
3. **Unique Usernames**: Enforced in the database.
4. **Mutual Friendship**: Required for group invitations.

Below, I’ll outline the implementation step-by-step with code snippets for key parts. Due to the complexity, I’ll provide a high-level structure with detailed examples for critical components, and you can expand from there.

---

### Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.IO, JWT
- **Frontend**: React, TypeScript, Tailwind CSS
- **Real-Time**: Socket.IO for typing indicators, read status, and message delivery
- **File Sharing**: Multer for file uploads, stored in MongoDB or a file system

---

### Project Structure
```
chat-app/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main views (e.g., Chat, Login)
│   │   ├── types/        # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── index.tsx
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Authentication middleware
│   │   ├── sockets/      # Socket.IO logic
│   │   ├── server.ts
│   │   └── db.ts         # MongoDB connection
├── package.json
└── tsconfig.json
```

---

### Step 1: Backend Setup

#### Database Models (server/src/models/)
1. **User Model**
```typescript
// server/src/models/User.ts
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Mutual friends
  messageRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Pending requests
});

export default mongoose.model('User', UserSchema);
```

2. **Message Model**
```typescript
// server/src/models/Message.ts
import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' }, // Null for group messages
  group: { type: Schema.Types.ObjectId, ref: 'Group' }, // Null for individual messages
  content: { type: String },
  fileUrl: { type: String }, // For file sharing
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);
```

3. **Group Model**
```typescript
// server/src/models/Group.ts
import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Group', GroupSchema);
```

#### Authentication (server/src/middleware/auth.ts)
```typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

#### API Routes (server/src/routes/)
1. **User Routes**
```typescript
// server/src/routes/user.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token });
});

// Search user by username
router.get('/search/:username', authMiddleware, async (req: AuthRequest, res) => {
  const user = await User.findOne({ username: req.params.username }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
```

2. **Message Request Routes**
```typescript
// server/src/routes/messageRequest.ts
import express from 'express';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Send message request
router.post('/request/:userId', authMiddleware, async (req: AuthRequest, res) => {
  const senderId = req.user!.id;
  const recipientId = req.params.userId;

  const recipient = await User.findById(recipientId);
  if (!recipient) return res.status(404).json({ message: 'User not found' });

  if (!recipient.messageRequests.includes(senderId)) {
    recipient.messageRequests.push(senderId);
    await recipient.save();
  }
  res.json({ message: 'Request sent' });
});

// Accept message request
router.post('/accept/:userId', authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const senderId = req.params.userId;

  const user = await User.findById(userId);
  const sender = await User.findById(senderId);
  if (!user || !sender) return res.status(404).json({ message: 'User not found' });

  user.messageRequests = user.messageRequests.filter((id) => id.toString() !== senderId);
  user.friends.push(senderId);
  sender.friends.push(userId);
  await user.save();
  await sender.save();
  res.json({ message: 'Request accepted' });
});

export default router;
```

3. **Group Routes**
```typescript
// server/src/routes/group.ts
import express from 'express';
import Group from '../models/Group';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Create group
router.post('/create', authMiddleware, async (req: AuthRequest, res) => {
  const { name } = req.body;
  const group = new Group({ name, creator: req.user!.id, members: [req.user!.id] });
  await group.save();
  res.json(group);
});

// Invite user to group
router.post('/invite/:groupId/:username', authMiddleware, async (req: AuthRequest, res) => {
  const group = await Group.findById(req.params.groupId);
  const userToInvite = await User.findOne({ username: req.params.username });
  if (!group || !userToInvite) return res.status(404).json({ message: 'Group or user not found' });

  const currentUser = await User.findById(req.user!.id);
  if (!currentUser!.friends.includes(userToInvite._id) || !userToInvite.friends.includes(currentUser!._id)) {
    return res.status(403).json({ message: 'Must be mutual friends to invite' });
  }

  if (!group.members.includes(userToInvite._id)) {
    group.members.push(userToInvite._id);
    await group.save();
  }
  res.json(group);
});

export default router;
```

#### Socket.IO Setup (server/src/sockets/index.ts)
```typescript
import { Server } from 'socket.io';
import Message from '../models/Message';

export const setupSockets = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join user to their own room and group rooms
    socket.on('join', async ({ userId, groupIds }) => {
      socket.join(userId);
      groupIds.forEach((groupId: string) => socket.join(groupId));
    });

    // Send message
    socket.on('sendMessage', async ({ senderId, recipientId, groupId, content, fileUrl }) => {
      const message = new Message({ sender: senderId, recipient: recipientId, group: groupId, content, fileUrl });
      await message.save();

      if (recipientId) io.to(recipientId).emit('newMessage', message);
      if (groupId) io.to(groupId).emit('newMessage', message);
    });

    // Typing indicator
    socket.on('typing', ({ userId, recipientId, groupId }) => {
      if (recipientId) io.to(recipientId).emit('typing', { userId });
      if (groupId) io.to(groupId).emit('typing', { userId });
    });

    // Mark message as read
    socket.on('readMessage', async ({ messageId, userId }) => {
      const message = await Message.findById(messageId);
      if (message && !message.isRead) {
        message.isRead = true;
        await message.save();
        io.to(message.sender.toString()).emit('messageRead', { messageId });
      }
    });

    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
  });
};
```

#### Server Entry (server/src/server.ts)
```typescript
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import messageRequestRoutes from './routes/messageRequest';
import groupRoutes from './routes/group';
import { setupSockets } from './sockets';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/message-requests', messageRequestRoutes);
app.use('/api/groups', groupRoutes);

setupSockets(io);

mongoose.connect('mongodb://localhost/chat-app').then(() => {
  server.listen(5000, () => console.log('Server running on port 5000'));
});
```

---

### Step 2: Frontend Setup

#### Types (client/src/types/index.ts)
```typescript
export interface User {
  _id: string;
  username: string;
  friends: string[];
  messageRequests: string[];
}

export interface Message {
  _id: string;
  sender: User;
  recipient?: User;
  group?: Group;
  content?: string;
  fileUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Group {
  _id: string;
  name: string;
  members: User[];
}
```

#### Chat Page (client/src/pages/Chat.tsx)
```typescript
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'teams' | 'unread'>('all');
  const [chats, setChats] = useState<(Message | Group)[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data));

    socket.emit('join', { userId: user?._id, groupIds: user?.groups || [] });

    socket.on('newMessage', (message: Message) => setMessages((prev) => [...prev, message]));
    socket.on('typing', ({ userId }: { userId: string }) => setTyping((prev) => [...prev, userId]));
    socket.on('messageRead', ({ messageId }: { messageId: string }) => {
      setMessages((prev) => prev.map((msg) => (msg._id === messageId ? { ...msg, isRead: true } : msg)));
    });

    return () => {
      socket.off('newMessage');
      socket.off('typing');
      socket.off('messageRead');
    };
  }, [user?._id]);

  const sendMessage = (content: string) => {
    socket.emit('sendMessage', { senderId: user?._id, recipientId: selectedChat, content });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <div className="flex space-x-2 mb-4">
          <button onClick={() => setFilter('all')} className="p-2 bg-blue-500 text-white rounded">All</button>
          <button onClick={() => setFilter('teams')} className="p-2 bg-blue-500 text-white rounded">Teams</button>
          <button onClick={() => setFilter('unread')} className="p-2 bg-blue-500 text-white rounded">Unread</button>
        </div>
        {/* Render filtered chats */}
      </div>
      <div className="w-3/4 p-4">
        {selectedChat ? (
          <div>
            {messages.map((msg) => (
              <div key={msg._id} className={msg.sender._id === user?._id ? 'text-right' : 'text-left'}>
                {msg.content} {msg.isRead ? '✓✓' : '✓'}
              </div>
            ))}
            {typing.length > 0 && <p>Someone is typing...</p>}
            <input
              type="text"
              onKeyDown={() => socket.emit('typing', { userId: user?._id, recipientId: selectedChat })}
              onBlur={() => setTyping([])}
              onChange={(e) => sendMessage(e.target.value)}
              className="w-full p-2 border"
            />
          </div>
        ) : (
          <p>Select a chat</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
```

---

### Step 3: Additional Features
1. **Typing Indicators**: Handled via Socket.IO (`typing` event).
2. **Message Read Status**: Updated via `readMessage` event and reflected with checkmarks.
3. **File Sharing**: Use Multer on the backend to upload files and store URLs in the `Message` model.

---

### Implementation Notes
- **Mutual Friendship**: Enforced in the group invite logic by checking the `friends` array.
- **Unique Usernames**: Handled by Mongoose’s `unique` constraint.
- **Real-Time**: Socket.IO ensures messages, typing, and read status are updated instantly.
- **Scalability**: Add Redis for caching or optimize Socket.IO rooms for large groups.

This is a foundational implementation. You can expand it by adding UI polish with Tailwind CSS, error handling, and more robust state management (e.g., Redux). Let me know if you need help with specific parts!
