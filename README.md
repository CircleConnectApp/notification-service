<<<<<<< HEAD
# Notification Service

A real-time notification microservice for CircleConnect built with Node.js, Express, and Socket.IO.

## Features

- Real-time notifications using Socket.IO
- RESTful API endpoints for notification management
- MongoDB integration for persistent storage
- Winston logger for better debugging and monitoring
- Support for different types of notifications (posts, likes, community updates)

## API Endpoints

- `GET /api/notifications` - Retrieve user notifications
- `POST /api/notifications/send` - Send a new notification
- `PATCH /api/notifications/:id/read` - Mark a notification as read

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/notification-service
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

3. Start the service:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Socket.IO Events

The service handles the following events:
- `connection`: When a client connects
- `join`: When a user joins their notification room
- `disconnect`: When a client disconnects

The service emits:
- `notification`: When a new notification is created

## Client Integration

To receive real-time notifications, connect to the Socket.IO server:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

// Join user's notification room
socket.emit('join', userId);

// Listen for notifications
socket.on('notification', (notification) => {
  console.log('New notification:', notification);
});
```

## Logging

The service uses Winston for logging:
- Console logging in development
- File logging in production
- Error logs are stored in `error.log`
- Combined logs are stored in `combined.log` 
=======
# notification-service
>>>>>>> 4b75998752526d4adb07f9fbbcd91dfc448f0442
