module.exports = {
	inviteUserMessage: {
		make: (conversationId) => {
			return {
				conversationId: conversationId,
				text: '임귀당귀 서비스 초대',
				blocks: [
					{
						type: 'header',
						text: '임금님 귀는 당나귀 귀',
						style: 'blue',
					},
					{
					  type: "image_link",
					  url: "https://cdn.pixabay.com/photo/2016/03/31/20/22/burro-1295711_960_720.png"
					},
					{
					  type: "divider"
					},
					{
					  type: "text",
					  text: "어디 말할 곳은 없고, 이대로 두기에는 가슴 답답한 일이 있으신가요?",
					 markdown: true
					},
					{
					  "type": "text",
					  "text": "*임금님 귀는 당나귀 귀* 서비스를 사용해보세요!",
					  "markdown": true
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'init_user',
						text: '시작하기',
						style: 'default',
					},
				],
			};
		},
	},
	initUserModal: {
		make: () => {
			return {
				view: {
					title: 'modal title',
					accept: '가입',
					decline: '취소',
					value: 'init_user_result',
					blocks: [
						{
							type: 'label',
							text: '닉네임 설정',
							markdown: true,
						},
						{
							type: 'label',
							text: '(다른 사람에게 보여지는 닉네임입니다.)',
							markdown: true,
						},
						{
							type: 'input',
							name: 'nickname',
							required: true,
							placeholder: '닉네임',
						},
					],
				},
			};
		},
	},
	initUserSuccessMessage: {
		make: (conversationId, nickname) => {
			return {
				conversationId: conversationId,
				text: '가입 성공!',
				blocks: [
					{
						type: 'header',
						text: '가입되었습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text:
							`${nickname} 님 환영합니다.`,
						markdown: true,
					},
				],
			};
		},
	},
	initUserFailMessage: {
		make: (conversationId, failMessage) => {
			return {
				conversationId: conversationId,
				text: '가입 실패',
				blocks: [
					{
						type: 'header',
						text: '가입에 실패하였습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: failMessage,
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'init_user',
						text: '다시 시도하기',
						style: 'default',
					},
				],
			};
		},
	},
};