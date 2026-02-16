// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// require("dotenv").config({path:"./config.env"});
// // console.log("MONGODB_URI =>", process.env.MONGODB_URI);
// require("./connection");

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,  //  env se
//     credentials: true,               //  cookies allow
//   })
// );


// const UserRoutes = require('./routes/user');
// const PostRoutes = require('./routes/post');
// const NotificationRoutes = require('./routes/notification');
// const CommentRoutes = require('./routes/comment');
// const ConversationRoute = require('./routes/conversation')
// const MessageRoute  = require('./routes/message');


// app.use('/api/auth',UserRoutes);
// app.use('/api/post', PostRoutes);
// app.use('/api/notification', NotificationRoutes);
// app.use('/api/comment', CommentRoutes);
// app.use('/api/conversation', ConversationRoute);
// app.use('/api/message', MessageRoute);


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log('Server is running on port', PORT));



const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config({ path: "./config.env" });
require("./connection");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
    credentials: true,
  })
);

const UserRoutes = require("./routes/user");
const PostRoutes = require("./routes/post");
const NotificationRoutes = require("./routes/notification");
const CommentRoutes = require("./routes/comment");
const ConversationRoute = require("./routes/conversation");
const MessageRoute = require("./routes/message");

app.use("/api/auth", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/conversation", ConversationRoute);
app.use("/api/message", MessageRoute);

const PORT = process.env.PORT || 5000;

// ✅ create http server from express app
const server = http.createServer(app);

// ✅ attach socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Make io accessible to routes
app.set('io', io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // User joins their own notification room
  socket.on("joinUser", (userId) => {
    console.log(`User ${userId} joined their notification room`);
    socket.join(`user_${userId}`);
  });

  // Join a conversation room
  socket.on("joinConversation", (conversationId) => {
    console.log(`User ${socket.id} joined conversation ${conversationId}`);
    socket.join(conversationId);
  });

  // Send message to a conversation
  socket.on("sendMessage", (conversationId, message) => {
    console.log(`Message sent to conversation ${conversationId}:`, message);
    // Broadcast to all users in the conversation except sender
    socket.to(conversationId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ✅ IMPORTANT: server.listen (not app.listen)
server.listen(PORT, () => console.log("Server is running on port", PORT));
