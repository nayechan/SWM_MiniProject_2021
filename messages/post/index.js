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
							markdown: false,
						},
						{
							type: 'input',
							name: 'title',
							required: true,
							placeholder: '제목을 입력해주세요 (최대 100자)',
						},
						{
							type: 'label',
							text: '게시글 내용',
							markdown: false,
						},
						{
							type: 'input',
							name: 'content',
							required: true,
							placeholder: '게시글 내용을 입력해주세요 (최대 400자)',
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
						markdown: false,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
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
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
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
						text: post.title,
						style: 'blue',
					},
					{
						type: 'text',
						text: `작성자 - ${post.user.nickname}`,
						markdown: false,
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
						value: `replypost_${post.id}`,
						text: '답글 보내기',
						style: 'default',
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
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
				text: '글 가져오기 실패',
				blocks: [
					{
						type: 'header',
						text: '글을 가져올 수 없습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: '가져올 수 있는 글이 없습니다.',
						markdown: false,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
						text: '돌아가기',
						style: 'default',
					},
				],
			};
		},
	},
	replyPostModal: {
		make: (user, post) => {
			return {
				view: {
					title: `${post.user.nickname}님께 외치기`,
					accept: '외치기',
					decline: '취소',
					value: `replypost_result_${post.id}`,
					blocks: [
						{
							type: 'label',
							text: `${user.nickname}님의 답글`,
							markdown: false,
						},
						{
							type: 'label',
							text: '제목',
							markdown: false,
						},
						{
							type: 'input',
							name: 'title',
							required: true,
							placeholder: '제목을 입력해주세요 (최대 100자)',
						},
						{
							type: 'label',
							text: '답글 내용',
							markdown: false,
						},
						{
							type: 'input',
							name: 'content',
							required: true,
							placeholder: '답글 내용을 입력해주세요 (최대 400자)',
						},
					],
				},
			};
		},
	},
	getPostModalFailMessage: {
		make: (conversationId) => {
			return {
				conversationId: conversationId,
				text: '답글을 등록할 수 없는 포스트입니다.',
				blocks: [
					{
						type: 'header',
						text: '답글을 등록할 수 없는 포스트입니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: '글이 삭제되었거나, 비정상적인 요청입니다.',
						markdown: false,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
						text: '메뉴판 얻기',
						style: 'default',
					},
				],
			};
		},
	},
	replyMessage: {
		make: (conversationId, replyTitle, replyContent, user, targetPost) => {
			return {
				conversationId: conversationId,
				text: '답글이 도착했습니다.',
				blocks: [
					{
						type: 'header',
						text: `${user.nickname}님의 답글이 도착했습니다.`,
						style: 'blue',
					},
					{
						type: 'text',
						text: `${targetPost.title}에 대한 답글입니다.`,
						markdown: false,
					},
					{
          	type: 'divider',
          },
					{
						type: 'text',
						text: replyTitle,
						markdown: false,
					},
					{
						type: 'divider',
					},
					{
						type: 'text',
						text: replyContent,
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
						text: '메뉴판 얻기',
						style: 'default',
					},
				],
			};
		},
	},
	replyPostSuccessMessage: {
		make: (conversationId) => {
			return {
				conversationId: conversationId,
				text: '답글 작성에 성공했습니다.',
				blocks: [
					{
						type: 'header',
						text: '답글을 성공적으로 전송했습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: '답글을 성공적으로 전송했습니다.',
						markdown: false,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
						text: '메뉴판 얻기',
						style: 'default',
					},
				],
			};
		},
	},
	replyPostFailMessage: {
		make: (conversationId, failMessage) => {
			return {
				conversationId: conversationId,
				text: '답글 전송에 실패했습니다.',
				blocks: [
					{
						type: 'header',
						text: '답글 전송에 실패했습니다.',
						style: 'blue',
					},
					{
						type: 'text',
						text: failMessage,
						markdown: true,
					},
					{
						type: 'button',
						action_type: 'submit_action',
						value: 'get_menu',
						action_name: 'get_menu',
						text: '메뉴판 얻기',
						style: 'default',
					},
				],
			};
		},
	},
};