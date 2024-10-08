
const express = require("express");
const http = require('http');
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
require('dotenv').config();



const port = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
      origin: ["http://localhost:2108"],
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true
    }
  });


// Socket.io connection
io.on('connection', (socket) => {
    console.log(`A user connected.`);

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')(io);

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:2108"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));
app.use(session({
    genid: function(req) {
        return uuidv4();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get("/test", (req, res) => {
    res.send("Test");
});