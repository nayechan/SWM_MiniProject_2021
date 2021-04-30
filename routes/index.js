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
const { menuMessage, noticeModal } = require('../messages/menu');
const {
    postFormModal,
    registerPostSuccessMessage,
    registerPostFailMessage,
    randomPostMessage,
    randomPostFailMessage,
    replyPostModal,
    getPostModalFailMessage,
    replyMessage,
    replyPostSuccessMessage,
    replyPostFailMessage,
} = require('../messages/post');

const { user, post } = db.models;
const { Op } = require('sequelize');

router.post('/chatbot', async (req, res, next) => {
    const kakaoUsers = await libKakaoWork.getUserList();
    //console.log('총 메시지 전송 유저 수: ' + kakaoUsers.length);

    const conversations = await Promise.all(
        kakaoUsers.map((user) => libKakaoWork.openConversations({ userId: user.id }))
    );

    const messages = await Promise.all(
        conversations.map((conversation) =>
            libKakaoWork.sendMessage(inviteUserMessage.make(conversation.id))
        )
    );

    res.json({
        result: 'success',
        // kakaoUsers,
        // conversations,
        // messages,
    });
});

// 모달을 리턴하는 곳
router.post('/request', async (req, res, next) => {
    // console.log(req.body);
    const { message, react_user_id, value } = req.body;
    const kakaoUserId = react_user_id;
    const conversationId = message.conversation_id;
    const userInstance = await user.findOne({
        where: {
            id: kakaoUserId,
        },
    });

    // 유저 가입 요청.
    if (value === 'init_user') {
        if (userInstance == null) {
            // 닉네임 입력, 가입 절차.
            return res.json(initUserModal.make());
        } else {
            await libKakaoWork.sendMessage(menuMessage.make(conversationId, userInstance.nickname));
            return res.json(noticeModal.make('이미 회원가입된 유저입니다.'));
        }
    }

    // 유저 정보를 찾을 수 없을 때.
    if (userInstance == null) {
        libKakaoWork.sendMessage(inviteUserMessage.make(conversationId));
        return res.json(noticeModal.make('회원 가입이 유효하지 않습니다.'));
    }

    // 특정 포스트에 대한 답글 작성 모달 요청
    if (value.startsWith('replypost_')) {
        // value 값에 들어있는 postId 파싱
        const postId = value.split('_')[1];
        // console.log(postId);
        try {
            const targetPost = await post.findOne({
                where: {
                    id: postId,
                },
                include: [
                    {
                        model: user,
                        attributes: ['nickname'],
                    },
                ],
            });
            // console.log(targetPost);
            if (targetPost == null) {
                libKakaoWork.sendMessage(getPostModalFailMessage.make(conversationId));
                throw 'targetPost가 null 입니다.';
            }
            return res.json(replyPostModal.make(userInstance, targetPost));
        } catch (e) {
            //console.log(e);
            return res.json(noticeModal.make('답글 모달을 얻을 수 없습니다.'));
        }
    }

    // 다른 모든 요청 처리.
    switch (value) {
        case 'get_post_form': // 포스트 작성 폼 얻기
            return res.json(postFormModal.make(userInstance.nickname));
            break;
        default:
    }
    return res.json(noticeModal.make('알 수 없는 요청입니다.'));
});

router.post('/callback', async (req, res, next) => {
    // console.log(req.body);
    const { message, react_user_id, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
    const kakaoUserId = react_user_id;
    const conversationId = message.conversation_id;
    const userInstance = await user.findOne({
        where: {
            id: kakaoUserId,
        },
    });

    // 가입 시,
    if (value === 'init_user_result') {
        try {
            const nickname = actions.nickname;

            if (nickname.match(/\s/g) != null) {
                throw 'nicknameError';
            }
					
						if (nickname.length > 12)
							throw 'nicknameError';

            await user.create({
                id: kakaoUserId,
                nickname: nickname,
            });
            await libKakaoWork.sendMessage(initUserSuccessMessage.make(conversationId, nickname));
            await libKakaoWork.sendMessage(menuMessage.make(conversationId, nickname));
            return res.json(noticeModal.make('유저가 생성되었습니다.'));
        } catch (e) {
            //console.log('유저 생성에 실패하였습니다.');
            //console.log(e.toString());

            if (e.toString() == 'nicknameError') {
                await libKakaoWork.sendMessage(
                    initUserFailMessage.make(conversationId, '올바르지 않은 닉네임 형식입니다.')
                );
            } else {
                await libKakaoWork.sendMessage(
                    initUserFailMessage.make(conversationId, '알 수 없는 이유입니다.')
                );
            }
        }
    }

    if (userInstance == null) {
        // 유저 정보를 찾지 못했을 때 초대 메시지를 보냄.
        libKakaoWork.sendMessage(inviteUserMessage.make(conversationId));
        return res.json(noticeModal.make('유효하지 않은 유저입니다.'));
    }

    // 특정 포스트에 대한 답글 전송
    if (value.startsWith('replypost_result_')) {
        // value 값에 들어있는 postId 파싱
        const postId = value.split('_')[2];
        // console.log(postId);
        try {
            const targetPost = await post.findOne({
                where: {
                    id: postId,
                },
                include: [
                    {
                        model: user,
                        attributes: ['id', 'nickname'],
                    },
                ],
            });
            // console.log(targetPost);
            if (targetPost == null) {
                libKakaoWork.sendMessage(
                    replyPostFailMessage.make(conversationId, '대상 포스트가 유효하지 않습니다.')
                );
                throw 'targetPost가 null 입니다.';
            }
            const replyTitle = actions.title;
            const replyContent = actions.content;
					
						if(replyTitle == null || replyTitle.length > 100 || replyTitle.length == 0)
							throw "lengthException";
						if(replyContent == null || replyContent.length > 400 || replyContent.length == 0)
							throw "lengthException";

            const targetConversation = await libKakaoWork.openConversations({
                userId: targetPost.user.id,
            });

					
            await libKakaoWork.sendMessage(
                replyMessage.make(
                    targetConversation.id,
                    replyTitle,
                    replyContent,
                    userInstance,
                    targetPost
                )
            );
            await libKakaoWork.sendMessage(replyPostSuccessMessage.make(conversationId));
            return res.json(noticeModal.make('답글을 전송했습니다.'));
        } catch (e) {
            //console.log(e);
            libKakaoWork.sendMessage(
                replyPostFailMessage.make(conversationId, '답글 전송에 실패했습니다.')
            );
            return res.json(noticeModal.make('답글 전송에 실패했습니다.'));
        }
    }

    switch (value) {
        case 'register_post_result':
            const title = actions.title;
            const content = actions.content;

            try {
								if(title.length > 100)
									throw "lengthException";
								if(content.length > 400)
									throw "lengthException";
                const postInstance = await post.create({
                    title: title,
                    content: content,
                });
                await postInstance.setUser(userInstance);
                await libKakaoWork.sendMessage(
                    registerPostSuccessMessage.make(conversationId, userInstance.nickname)
                );
                return res.json(noticeModal.make('글 등록에 성공했습니다.'));
            } catch (e) {
                //console.log('글 등록에 실패하였습니다.');
                //console.log(e);
								if(e.toString() == 'lengthException')
								{
                    await libKakaoWork.sendMessage(
											registerPostFailMessage.make(conversationId, "글이나 제목의 길이가 너무 깁니다.")
										);
								}
								else{
									await libKakaoWork.sendMessage(
                    registerPostFailMessage.make(conversationId, "알 수 없는 이유입니다.")
                	);
								}
                
                return res.json(noticeModal.make('글 등록에 실패했습니다.'));
            }

            break;

        case 'get_menu': // 메뉴 얻기
            await libKakaoWork.sendMessage(menuMessage.make(conversationId, userInstance.nickname));
            return res.json({});
            break;

        case 'get_random_post': // 다른 사람 글 얻기.
            try {
                const randomPosts = await post.findAll({
                    where: {
                        [Op.not]: [{ user_id: kakaoUserId }],
                    },
                    include: [
                        {
                            model: user,
                            attributes: ['nickname'],
                        },
                    ],
                    limit: 20,
                    order: [['id', 'DESC']],
                });
				// console.log(randomPosts[0]);
                if (randomPosts == null || randomPosts.length == 0) {
                    await libKakaoWork.sendMessage(randomPostFailMessage.make(conversationId));
                    return res.json({});
                } else {
                    const randomNum = Math.floor(Math.random() * randomPosts.length);
										//console.log(randomPosts[randomNum]);
                    await libKakaoWork.sendMessage(
                        randomPostMessage.make(conversationId, randomPosts[randomNum])
                    );
                    return res.json({});
                }
            } catch (e) {
                //console.log(e);
                await libKakaoWork.sendMessage(randomPostFailMessage.make(conversationId));
                return res.json({});
            }

            break;
        default:
    }

    return res.json(noticeModal.make('알 수 없는 콜백입니다.'));
});

module.exports = router;