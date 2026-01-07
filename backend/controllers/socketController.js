const Game = require('../models/Game');
let players = [];


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('새로운 연결: ' + socket.id);

        // 1. [입장]
        socket.on('join', (nickname) => {
            console.log(`👤 입장: ${nickname} (${socket.id})`);
            
            const newPlayer = {
                id: socket.id,
                nickname: nickname,
                animal: null,
                location: '대기실',
                isAlive: true
            };
            players.push(newPlayer);

            io.emit('update player list', players);
            io.emit('chat message', {
                id: 'system',
                text: `📢 [${nickname}] 님이 입장하셨습니다.`
            });
        });

        // 2. [채팅]
        socket.on('chat message', (msg) => {
            const sender = players.find(p => p.id === socket.id);
            const senderName = sender ? sender.nickname : '알수없음';

            io.emit('chat message', {
                id: socket.id,
                nickname: senderName,
                text: msg
            });
        });

        // 3. [퇴장]
        socket.on('disconnect', () => {
            const leaver = players.find(p => p.id === socket.id);
            if (leaver) {
                console.log(`👋 퇴장: ${leaver.nickname}`);
                players = players.filter(p => p.id !== socket.id);
                
                io.emit('update player list', players);
                io.emit('chat message', {
                    id: 'system',
                    text: `📢 [${leaver.nickname}] 님이 퇴장하셨습니다.`
                });
            }
        });
    });
};