const axios = require('axios')

const messageFormatters = {
  text: (content) => ({
    type: 'text',
    text: content,
  }),

  image: (content) => ({
    type: 'image',
    originalContentUrl: content,
    previewImageUrl: content,
  }),
}

module.exports = async function run(
  serverEndpoint,
  accessToken,
  groupId,
  threadId,
  messageType,
  messageContent,
) {
  if (!(messageType in messageFormatters))
    throw new Error(`Invalid messageType: ${messageType}`)

  await axios.post(
    `${serverEndpoint}/bot/v2/message/push`,
    {
      gid: groupId,
      tid: threadId,
      messages: [messageFormatters[messageType](messageContent)],
    },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )
}
