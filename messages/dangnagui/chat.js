module.exports = {
	makeMessage: (isFirst, chatType) => {
		let chatTypeString;
		if (chatType == "reply")
			chatTypeString = "답변";
		else
			chatTypeString = "고민";

		let jsonData = {
			"view": {
				"title": `${chatTypeString}을 적어보세요!`,
				"accept": "확인",
				"decline": "취소",
				"value": `${chatType}Result`,
				"blocks": []
			}
		};

		let blocks = [];

		if (isFirst) {
			blocks.push({
				"type": "label",
				"text": "닉네임",
				"markdown": true

			});
			blocks.push({
				"type": "input",
				"name": "nickName",
				"required": false,
				"placeholder": "내용을 입력해주세요"
			});
		}
		blocks.push({
			"type": "label",
			"text": chatTypeString,
			"markdown": true
		});
		blocks.push({
			"type": "input",
			"name": "inputText",
			"required": false,
			"placeholder": "내용을 입력해주세요"
		});

		jsonData["view"]["blocks"] = blocks;

		return jsonData;
	}
};
