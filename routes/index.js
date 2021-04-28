// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../database');

const libKakaoWork = require('../libs/kakaoWork');
const {
	inviteUserMessage,
	initUserModal,
	initUserSuccessMessage,
	initUserFailMessage,
} = require('../messages/user');
const { menuMessage } = require('../messages/menu');
const { postFormModal, registerPostSuccessMessage, registerPostFailMessage, randomPostMessage, randomPostFailMessage } = require('../messages/post');

const { user, post } = db.models;

router.get('/', async (req, res, next) => {
	const kakaoUsers = await libKakaoWork.getUserList();

	// 검색된 모든 유저에게 각각 채팅방 생성 (2)
	const conversations = await Promise.all(
		kakaoUsers.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);

	// 생성된 채팅방에 메세지 전송 (3)
	const messages = await Promise.all(
		conversations.map((conversation) =>
			libKakaoWork.sendMessage(inviteUserMessage.make(conversation.id))
		)
	);
	// 응답값은 자유롭게 작성하셔도 됩니다.
	res.json({
		kakaoUsers,
		conversations,
		messages,
	});
});

router.get('/test', async (req, res, next) => {
	res.json({
		messages: 'this is test',
	});
});

// 모달을 리턴하는 곳
router.post('/request', async (req, res, next) => {
	console.log(req.body);
	const { message, value } = req.body;
	const kakaoUserId = message.user_id;
	const conversationId = message.conversation_id;
	const userInstance = await user.findOne({
		where: {
			id: kakaoUserId,
		},
	});

	if (value === 'init_user') {
		if (userInstance == null) {
			// 닉네임 입력, 가입 절차.
			return res.json(initUserModal.make());
		} else {
			await libKakaoWork.sendMessage(menuMessage.make(conversationId, userInstance.nickname));
			return res.json({});
		}
	}

	if (userInstance == null) {
		// 유저 정보를 찾지 못했을 때 초대 메시지를 보냄.
		libKakaoWork.sendMessage(inviteUserMessage.make(conversationId));
		return res.json({});
	}

	switch (value) {
		case 'get_menu': // 메뉴 얻기
			await libKakaoWork.sendMessage(menuMessage.make(conversationId, userInstance.nickname));
			return res.json({});
		case 'get_post_form': // 포스트 작성 폼 얻기
			return res.json(postFormModal.make(userInstance.nickname));
		case 'get_random_post': // 다른 사람 글 얻기.
			const randomPosts = await post.findAll({
				include: [
					{
					  model: user,
					  attributes: ['nickname']
					}
				],
				limit: 10,
				order: [['id', 'DESC']]
			});
			
			if(randomPosts == null || randomPosts.length == 0) {
				await libKakaoWork.sendMessage(randomPostFailMessage.make(conversationId));	
			} else {
				const randomNum = Math.floor(Math.random() * randomPosts.length);
				await libKakaoWork.sendMessage(randomPostMessage.make(conversationId, randomPosts[randomNum]));				
			}
			return res.json({});
		default:
	}
	res.json({});
});

router.post('/callback', async (req, res, next) => {
	console.log(req.body);
	const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
	const kakaoUserId = message.user_id;
	const conversationId = message.conversation_id;
	const userInstance = await user.findOne({
		where: {
			id: kakaoUserId,
		},
	});

	// 가입 시,
	if (value === 'init_user_result') {
		const nickname = actions.nickname;

		try {
			await user.create({
				id: kakaoUserId,
				nickname: nickname,
			});
			await libKakaoWork.sendMessage(initUserSuccessMessage.make(conversationId, nickname));
			return res.json({ result: true });
		} catch (e) {
			console.log('유저 생성에 실패하였습니다.');
			console.log(e);
			await libKakaoWork.sendMessage(
				initUserFailMessage.make(conversationId, '알 수 없는 이유입니다.')
			);
			return res.json({ result: false });
		}
	}

	if (userInstance == null) {
		// 유저 정보를 찾지 못했을 때 초대 메시지를 보냄.
		libKakaoWork.sendMessage(inviteUserMessage.make(conversationId));
		return res.json({});
	}

	switch (value) {
		case 'register_post_result':
			const title = actions.title;
			const content = actions.content;

			try {
				const postInstance = await post.create({
					title: title,
					content: content,
				});
				await postInstance.setUser(userInstance);
				await libKakaoWork.sendMessage(registerPostSuccessMessage.make(conversationId, userInstance.nickname));
				return res.json({ result: true });
			} catch (e) {
				console.log('글 등록에 실패하였습니다.');
				console.log(e);
				await libKakaoWork.sendMessage(
					initUserFailMessage.make(conversationId, '알 수 없는 이유입니다.')
				);
				return res.json({ result: false });
			}

			break;
		default:
	}

	return res.json({ result: true });
});

module.exports = router;