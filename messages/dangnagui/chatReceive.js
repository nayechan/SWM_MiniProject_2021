module.exports = {
    makeMessage: (message, actions, action_time, chatType, fromName) => {
        let chatTypeString, textData;
        if (chatType == "reply") {
            chatTypeString = "답변";
            textData = actions.reply;
        }
        else {
            chatTypeString = "고민";
            textData = actions.question;
        }
        return {
            conversationId: message.conversation_id,
            "text": `${chatTypeString}이 도착하였습니다!`,
            "blocks": [
                {
                    "type": "header",
                    "text": `${chatTypeString}이 도착하였습니다!`,
                    "style": "blue"
                },
                {
                    "type": "text",
                    "text": "*내용*",
                    "markdown": true
                },
                {
                    "type": "text",
                    "text": textData,
                    "markdown": true
                },
                {
                    "type": "divider"
                },
                {
                    "type": "text",
                    "text": "*시간*",
                    "markdown": true
                },
                {
                    "type": "text",
                    "text": action_time,
                    "markdown": true
                },
                {
                    "type": "divider"
                },
                {
                    "type": "text",
                    "text": "*작성자*",
                    "markdown": true
                },
                {
                    "type": "text",
                    "text": fromName,
                    "markdown": true
                },
                {
                    "type": "action",
                    "elements": [
                        {
                            "type": "button",
                            "action_type": 'doReply',
                            "value": "reply",
                            "text": "답장하기",
                            "style": "primary"
                        },
                        {
                            "type": "button",
                            "action_type": 'passReply',
                            "value": "pass",
                            "text": "패스하기",
                            "style": "danger"
                        }
                    ]
                }
            ]
        };
    }
};
