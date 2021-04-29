module.exports = {
    menuMessage: {
        make: (conversationId, nickname) => {
            return {
                conversationId: conversationId,
                text: '임귀당귀 메뉴판',
                blocks: [
                    {
                        type: 'header',
                        text: '임귀당귀 메뉴판',
                        style: 'blue',
                    },
                    {
                        type: 'text',
                        text: `${nickname}님 안녕하세요`,
                        markdown: true,
                    },
                    {
                        type: 'divider',
                    },
                    {
                        type: 'text',
                        text: '닉네임으로 글을 등록할 수 있어요!',
                        markdown: true,
                    },
                    {
                        type: 'button',
                        action_type: 'call_modal',
                        value: 'get_post_form',
                        text: '글 작성하기',
                        style: 'default',
                    },
                    {
                        type: 'divider',
                    },
                    {
                        type: 'text',
                        text: '다른 사람이 등록한 무작위 글을 얻어 올 수 있어요!',
                        markdown: true,
                    },
                    {
                        type: 'button',
                        action_type: 'call_modal',
                        value: 'get_random_post',
                        text: '다른 사람의 글 읽기',
                        style: 'default',
                    },
                ],
            };
        },
    },
    noticeModal: {
        make: (message) => {
            return {
                view: {
                    title: '안내',
                    accept: '확인',
                    decline: '취소',
                    value: 'nothing',
                    blocks: [
                        {
                            type: 'label',
                            text: message,
                            markdown: true,
                        },
                    ],
                },
            };
        },
    },
};