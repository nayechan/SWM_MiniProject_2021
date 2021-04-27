// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../database');


const libKakaoWork = require('../libs/kakaoWork');
const { invite_survey, cafe_survey, cafe_survey_results } = require('../messages/cafe');

router.get('/', async (req, res, next) => {
	await db.user.create({
        nickname: "userNickname",
      });
	
	
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();
	console.log(users);

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id 	}))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messages = await Promise.all([
    conversations.map((conversation) =>
      libKakaoWork.sendMessage(invite_survey.makeMessage(conversation))
    ),
  ]);

  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    users,
    conversations,
    messages,
  });
});

// routes/index.js
router.post('/request', async (req, res, next) => {
  const { message, value } = req.body;

  switch (value) {
    case 'cafe_survey':
      // 설문조사용 모달 전송
      return res.json(cafe_survey.makeMessage());
      break;
    default:
  }

  res.json({});
});


router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)

  switch (value) {
    case 'cafe_survey_results':
      // 설문조사 응답 결과 메세지 전송 (3)
      await libKakaoWork.sendMessage(cafe_survey_results.makeMessage(message, actions, action_time));
      break;
    default:
  }

  res.json({ result: true });
});

module.exports = router;