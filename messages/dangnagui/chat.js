module.exports = {
    msgWelcome: {
        makeMessage: (isFirst, chatType) => {
            let chatTypeString;
            if (chatType == "reply")
                chatTypeString = "답변";
            else
                chatTypeString = "고민";

            let jsonData = {
                "title": `${chatTypeString}을 적어보세요!`,
                "accept": "확인",
                "decline": "취소",
                "value": "{request_modal의 응답으로 전송한 value 값}",
                "blocks": []
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
                    "name": `nickName`,
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
                "name": `input${chatType}`,
                "required": false,
                "placeholder": "내용을 입력해주세요"
            });

            jsonData["blocks"] = blocks;
        }
    }
};