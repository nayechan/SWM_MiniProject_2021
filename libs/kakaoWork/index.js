// libs/kakaoWork/index.js
const Config = require('config');

const axios = require('axios');
const kakaoInstance = axios.create({
  baseURL: 'https://api.kakaowork.com',
  headers: {
    Authorization: `Bearer ${Config.keys.kakaoWork.bot}`,
  },
});

// 유저 목록 검색 (1)
exports.getUserList = async () => {
  const users = [];
  const res = await kakaoInstance.get('/v1/users.list', {
	  limmit: 100,
  });
  Array.prototype.push.apply(users, res.data.users);	

  while(res.data.cursor != null){
	  const res = await kakaoInstance.get('/v1/users.list', {
		  limmit: 100,
		  cursor: res.data.cursor,
	  });
	  Array.prototype.push.apply(users, res.data.users);
  }

  console.log('메시지 전송 유저 수: ' + users.length);
  return users;
};

// 채팅방 생성 (2)
exports.openConversations = async ({ userId }) => {
  const data = {
    user_id: userId,
  };
  const res = await kakaoInstance.post('/v1/conversations.open', data);
  return res.data.conversation;
};

// 메시지 전송 (3)
exports.sendMessage = async ({ conversationId, text, blocks }) => {
  const data = {
    conversation_id: conversationId,
    text,
    ...blocks && { blocks },
  };
  const res = await kakaoInstance.post('/v1/messages.send', data);
  return res.data.message;
};
