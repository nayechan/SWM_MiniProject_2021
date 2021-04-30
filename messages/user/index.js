module.exports = {
	inviteUserMessage: {
		make: (conversationId) => {
			return {
				conversationId: conversationId,
				text: '임금님 귀는 당나귀 귀',
				blocks: [
					{
						type: 'header',
						text: '임금님 귀는 당나귀 귀',
						style: 'yellow',
					},
					{
					  type: "image_link",
					  url: "https://image.freepik.com/free-vector/cute-donkey-character-design_123847-655.jpg"
					},
					{
					  type: "divider"
					},
					{
						type: 'text',
						text:
							'어디 말할 곳은 없고, 이대로 두기에는 가슴 답답한 일이 있으신가요?',
						markdown: false,
					},
					{
						type: 'text',
						text: '*"임금님 귀는 당나귀 귀"* 서비스를 이용해 보세요!',
						markdown: true,
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
					title: '닉네임 설정',
					accept: '가입',
					decline: '취소',
					value: 'init_user_result',
					blocks: [
						{
							type: 'label',
							text: '*닉네임*을 설정해주세요.',
							markdown: true,
						},
						{
							type: 'label',
							text: '(다른 사람에게 보여지는 닉네임입니다.)',
							markdown: false,
						},
						{
							type: 'input',
							name: 'nickname',
							required: true,
							placeholder: '닉네임 (공백 없이 최대 12자)',
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
						text: '가입이 완료되었습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text:
							`${nickname} 님 환영합니다. 😀`,
						markdown: false,
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