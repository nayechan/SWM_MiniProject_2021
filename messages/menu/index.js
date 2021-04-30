module.exports = {
    menuMessage: {
        make: (conversationId, nickname) => {
            return {
                conversationId: conversationId,
                text: '임귀당귀 메뉴판',
                blocks: [
                    {
                        type: 'header',
                        text: `${nickname}님의 임귀당귀`,
                        style: 'yellow',
                    },                    
                    {
                        type: 'text',
                        text: '마음의 소리를 외쳐보세요📣',
												markdown: false,
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
                        text: '다른 사람은 어떤 소리를 외쳤을까요❔',
                        markdown: false,
                    },
                    {
                        type: 'button',
												action_type: 'submit_action',
                        value: 'get_random_post',
                       	action_name: 'get_random_post',
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