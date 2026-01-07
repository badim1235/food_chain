require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');

// 분리한 파일들 불러오기
const connectDB = require('./config/db');
const socketController = require('./controllers/socketController');

const app = express();
app.use(cors());

// DB 연결 실행
connectDB();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 소켓 로직 연결 (Controller에 io 객체 넘겨주기)
socketController(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});