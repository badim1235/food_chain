const mongoose = require('mongoose');

// 1. 플레이어 스키마 (개인 정보)
const playerSchema = new mongoose.Schema({
    socketId: { type: String, required: true }, // 소켓 ID (연결 식별용)
    nickname: { type: String, required: true }, // 닉네임
    
    // 게임 내 역할 및 상태
    animal: { type: String, default: null },    // 동물 (사자, 토끼 등)
    location: { type: String, default: '대기실' }, // 현재 위치 (숲, 강, 들, 하늘)
    isAlive: { type: Boolean, default: true },  // 생존 여부
    
    // 승리 조건 및 카운트
    starvationCount: { type: Number, default: 0 }, // 굶은 횟수 (사자, 악어 등)
    targetPlayer: { type: String, default: null }, // (까마귀 등) 예측 대상 닉네임
});

// 2. 게임 스키마 (방 정보)
const gameSchema = new mongoose.Schema({
    roomId: { type: String, default: 'main' }, // 방 이름 (나중에 여러 방 만들 때 사용)
    status: { type: String, default: 'waiting' }, // waiting(대기), playing(진행), ended(종료)
    round: { type: Number, default: 0 },          // 현재 라운드 (1~4)
    
    players: [playerSchema], // 위에서 만든 플레이어 목록을 포함
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);