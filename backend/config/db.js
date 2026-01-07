const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-chain';
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB에 성공적으로 연결되었습니다!');
    } catch (err) {
        console.error('❌ MongoDB 연결 실패:', err);
        process.exit(1); // 연결 실패 시 서버 종료
    }
};

module.exports = connectDB;