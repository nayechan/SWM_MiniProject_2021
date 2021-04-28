module.exports = {
	inviteMessage: {
		make: (conversation) => {
			return {
			  "conversationId": conversation.id,
			  "text": "임귀당귀 서비스 초대",
			  "blocks": [
				{
				  "type": "header",
				  "text": "임금님 귀는 당나귀 귀 !",
				  "style": "blue"
				},
				{
				  "type": "text",
				  "text": "어디 말할 곳은 없고, 이대로 속에 두기에는 가슴 답답한 일이 있으신가요?",
				  "markdown": true
				},
				{
				  "type": "text",
				  "text": "임금님 귀는 당나귀 귀 서비스를 이용해 보세요!",
				  "markdown": true
				},
				{
				 	type: 'button',
					action_type: 'call_modal',
					value: 'init_user',
					text: '시작하기',
					style: 'default',
				}
			  ]
			};
		},
	},
	initMessage: {
		make: (conversation) => {
			return {
			  "conversationId": conversation.id,
			  "text": "정보 입력",
			  "blocks": [
				{
				  "type": "header",
				  "text": "정보 입력",
				  "style": "blue"
				},
				{
				  "type": "text",
				  "text": "어디 말할 곳은 없고, 이대로 속에 두기에는 가슴 답답한 일이 있으신가요?",
				  "markdown": true
				},
				{
				  "type": "text",
				  "text": "임금님 귀는 당나귀 귀 서비스를 이용해 보세요!",
				  "markdown": true
				},
				{
				 	type: 'button',
					action_type: 'call_modal',
					value: 'init',
					text: '시작하기',
					style: 'default',
				}
			  ]
			};
		},
	},
};