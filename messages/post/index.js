module.exports = {
	postFormModal: {
		make: (nickname) => {
			return {
				view: {
					title: `${nickname}님의 외침!`,
					accept: '외치기',
					decline: '취소',
					value: 'register_post_result',
					blocks: [
						{
							type: 'label',
							text: '제목',
							markdown: true,
						},
						{
							type: 'input',
							name: 'title',
							required: false,
							placeholder: '제목을 입력해주세요',
						},
						{
							type: 'label',
							text: '게시글 내용',
							markdown: true,
						},
						{
							type: 'input',
							name: 'content',
							required: false,
							placeholder: '게시글 내용을 입력해주세요',
						},
					],
				},
			};
		},
	},
	registerPostSuccessMessage: {
		make: (conversationId, nickname) => {
			return {
				conversationId: conversationId,
				text: '글 등록 성공!',
				blocks: [
					{
						type: 'header',
						text: '대나무 숲에 글이 울려퍼집니다!',
						style: 'blue',
					},
					{
						type: 'text',
						text: `${nickname} 님의 글이 성공적으로 등록되었습니다.`,
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'get_menu',
						text: '메뉴 보기',
						style: 'default',
					},
				],
			};
		},
	},
	registerPostFailMessage: {
		make: (conversationId, failMessage) => {
			return {
				conversationId: conversationId,
				text: '글 등록 실패',
				blocks: [
					{
						type: 'header',
						text: '글 등록에 실패하였습니다.',
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
						value: 'get_menu',
						text: '돌아가기',
						style: 'default',
					},
				],
			};
		},
	},
	randomPostMessage: {
		make: (conversationId, post) => {
			return {
				conversationId: conversationId,
				text: post.title,
				blocks: [
					{
						type: 'header',
						text: post.content,
						style: 'blue',
					},
					{
						type: 'text',
						text: `작성자: ${post.user.nickname}`,
						markdown: true,
					},
					{
						type: 'divider',
					},
					{
						type: 'text',
						text: post.content,
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'get_menu',
						text: '메뉴 보기',
						style: 'default',
					},
				],
			};
		},
	},
	randomPostFailMessage: {
		make: (conversationId) => {
			return {
				conversationId: conversationId,
				text: '글 등록 실패',
				blocks: [
					{
						type: 'header',
						text: '글을 가져올 수 없습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: '가져올 수 있는 글이 없습니다.',
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'get_menu',
						text: '돌아가기',
						style: 'default',
					},
				],
			};
		},
	},
};