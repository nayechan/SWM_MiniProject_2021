module.exports = {
    msgWelcome: {
        makeMessage: (conversation) => {
            return {
                "conversationId": conversation.id,
                "text": "임금님 귀는 당나귀 귀!",
                "blocks": [
                    {
                        "type": "header",
                        "text": "임금님 귀는 당나귀 귀!",
                        "style": "blue"
                    },
                    {
                        "type": "text",
                        "text": "마음속의 고민 챗봇을 이용해서 풀어보세요!",
                        "markdown": true
                    },
                    {
                        "type": "action",
                        "elements": [
                            {
                                "type": "button",
                                "action_type": 'call_modal',
                                "value": "readUsage",
                                "text": "사용법",
                                "style": "primary"
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
                ]
            }
        }
    }
};