module.exports = {
	makeMessage: (message, actions, action_time, chatType) => {
		let chatTypeString;
		if (chatType == "reply")
		{
			chatTypeString = "답변";
		}
		else
		{
			chatTypeString = "고민";
		}
		console.log(actions.inputText);
		return {
			conversationId: message.conversation_id,
			"text": `${chatTypeString}을 누군가에게 보냈습니다!`,
			"blocks": [
				{
				  "type": "header",
				  "text": `${chatTypeString}을 보냈습니다!`,
				  "style": "blue"
				},
				{
					"type": "text",
					"text": "*내용*",
					"markdown": true
				},
				{
					"type": "text",
					"text": actions.inputText,
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
				}
			]
		};
	}
};
