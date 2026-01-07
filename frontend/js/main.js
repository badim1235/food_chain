// 소켓 연결
const socket = io();

console.log("Main JS 로드됨");

// 1. 게임 입장 처리
function joinGame() {
    const nickname = UI.inputs.nickname.value.trim();
    if (!nickname) {
        alert("닉네임을 입력해주세요!");
        return;
    }
    socket.emit('join', nickname);
    UI.showGameScreen();
}

UI.buttons.join.addEventListener('click', joinGame);
UI.inputs.nickname.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinGame();
});

// 2. 채팅 전송 처리
function sendMessage() {
    const msg = UI.inputs.message.value;
    if (msg.trim() === '') return;
    
    socket.emit('chat message', msg);
    UI.inputs.message.value = '';
    UI.inputs.message.focus();
}

UI.buttons.send.addEventListener('click', sendMessage);
UI.inputs.message.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// 3. 소켓 이벤트 수신 (서버 -> 클라이언트)
socket.on('update player list', (players) => {
    UI.updatePlayerList(players, socket.id);
});

socket.on('chat message', (data) => {
    UI.addChatMessage(data, socket.id);
});