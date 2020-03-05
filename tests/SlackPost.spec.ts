import { SlackPost } from "../src/SlackPost";

var getContents = (text: string, blocks: any = null) => {
  let contents: any = {
    "event": {
      "subtype": "bot_message",
      "text": text,
    }
  };

  if (blocks) {
    contents["event"]["blocks"] = blocks;
  }

  return contents;
}

var getParameter = (contents: any) => {
  return {
    "postData": {
      "contents": JSON.stringify(contents)
    }
  };
}

var createSlackPostFromBlockElements = (elements: any[]): SlackPost => {
  const text = "test";
  const defaultBlocks: any = [
    {
      "type": "rich_text",
      "block_id": "DUMMY",
      "elements": [
        {
          "type": "rich_text_section",
        }
      ]
    }
  ];
  let targetBlocks: any = defaultBlocks;
  targetBlocks[0]["elements"][0]["elements"] = elements;
  const contents = getContents(text, targetBlocks);
  const parameter = getParameter(contents);
  return new SlackPost(parameter);
}

test("isBotPost", () => {
  const text = "test";
  const contents = getContents(text);
  const parameter = getParameter(contents);
  let slackPost = new SlackPost(parameter);
  expect(slackPost.isBotPost()).toBe(true);
})

test("getRawJson", () => {
  const text = "test";
  const contents = getContents(text);
  const parameter = getParameter(contents);
  let slackPost = new SlackPost(parameter);
  expect(slackPost.getRawJson()).toStrictEqual(parameter);
})

test("getContents", () => {
  const text = "test";
  const contents = getContents(text);
  const parameter = getParameter(contents);
  let slackPost = new SlackPost(parameter);
  expect(slackPost.getContents()).toStrictEqual(contents);
})

test("getText", () => {
  const text = "test";
  const contents = getContents(text);
  const parameter = getParameter(contents);
  let slackPost = new SlackPost(parameter);
  expect(slackPost.getText()).toBe(text)
})

test("hasMention", () => {
  const noMentionElements = [
    {
      "type": "text",
      "text": "test"
    }
  ];
  expect(createSlackPostFromBlockElements(noMentionElements)
    .hasMention())
    .toBe(false);

  const mixElements = [
    {
      "type": "text",
      "text": "1"
    },
    {
      "type": "user",
      "user_id": "USERID1"
    }
  ];
  expect(createSlackPostFromBlockElements(mixElements)
    .hasMention())
    .toBe(true);
})

test("getMentionTargets", () => {
  const noMentionElements = [
    {
      "type": "text",
      "text": "test"
    }
  ];

  expect(createSlackPostFromBlockElements(noMentionElements)
    .getMentionTargets())
    .toStrictEqual([]);

  const multiMentionElements = [
    {
      "type": "user",
      "user_id": "USERID1"
    },
    {
      "type": "user",
      "user_id": "USERID2"
    },
    {
      "type": "user",
      "user_id": "USERID1"
    }
  ];

  expect(createSlackPostFromBlockElements(multiMentionElements)
    .getMentionTargets())
    .toStrictEqual(["USERID1", "USERID2"]);

  const mixElements = [
    {
      "type": "text",
      "text": "1"
    },
    {
      "type": "user",
      "user_id": "USERID1"
    },
    {
      "type": "user",
      "user_id": "USERID2"
    },
    {
      "type": "text",
      "text": "2"
    },
    {
      "type": "user",
      "user_id": "USERID1"
    },
    {
      "type": "user",
      "user_id": "USERID3"
    }
  ];

  expect(createSlackPostFromBlockElements(mixElements)
    .getMentionTargets())
    .toStrictEqual(["USERID1", "USERID2", "USERID3"]);
})
