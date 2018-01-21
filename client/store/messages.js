const GOT_MESSAGES = 'GOT_MESSAGES';

export function gotMessages(messages) {
  return {
    type: GOT_MESSAGES,
    messages
  }
}
export default (messages = [], action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.messages;
    default:
      return messages;
  }
}
