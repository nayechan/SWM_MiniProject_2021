module.exports = {
    msgWelcome: {
        makeMessage: (conversation) => {
            return {
                "conversationId": conversation.id,
                "text": "대화가 종료되었습니다...",
                "blocks": [
                    {
                        "type": "header",
                        "text": "대화가 종료되었습니다...",
                        "style": "blue"
                    },
                    {
                        "type": "text",
                        "text": "다시 고민을 보내시려면 버튼을 눌러주세요!",
                        "markdown": true
                    },
                    {
                        "type": "button",
                        "action_type": 'call_modal',
                        "value": "startChat",
                        "text": "시작",
                        "style": "primary"
                    }
                ]
            }
        }
    }
};
