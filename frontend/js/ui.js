// UI 관련 요소들을 객체로 관리
const UI = {
    screens: {
        login: document.getElementById('login-screen'),
        game: document.getElementById('game-container')
    },
    inputs: {
        nickname: document.getElementById('nickname-input'),
        message: document.getElementById('message-input'),
        memo: document.getElementById('memo-input')
    },
    buttons: {
        join: document.getElementById('join-btn'),
        send: document.getElementById('send-btn')
    },
    display: {
        chat: document.getElementById('chat-display'),
        playerList: document.getElementById('player-list'),
        location: document.getElementById('current-location')
    },

    // 화면 전환 함수
    showGameScreen() {
        this.screens.login.style.display = 'none';
        this.screens.game.style.display = 'flex';
    },

    // 플레이어 목록 업데이트 함수
    updatePlayerList(players, myId) {
        this.display.playerList.innerHTML = '';
        players.forEach(player => {
            const li = document.createElement('li');
            li.textContent = player.nickname;
            if (player.id === myId) {
                li.style.fontWeight = 'bold';
                li.textContent += ' (나)';
            }
            this.display.playerList.appendChild(li);
        });
    },

    // 채팅 메시지 추가 함수
    addChatMessage(data, myId) {
        const msgDiv = document.createElement('div');
        
        if (data.id === 'system') {
            msgDiv.className = 'msg system';
            msgDiv.textContent = data.text;
        } else if (data.id === myId) {
            msgDiv.className = 'msg me';
            msgDiv.textContent = '나: ' + data.text;
        } else {
            msgDiv.className = 'msg other';
            msgDiv.textContent = `${data.nickname}: ${data.text}`;
        }

        this.display.chat.appendChild(msgDiv);
        this.display.chat.scrollTop = this.display.chat.scrollHeight;
    }
};