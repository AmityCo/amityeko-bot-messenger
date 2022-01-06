const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')

const endpoint = core.getInput('serverUrl')
const token = core.getInput('accessToken')
const gid = core.getInput('groupId')
const tid = core.getInput('threadId')
const type = core.getInput('type')
const content = core.getInput('content')

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

async function run() {
  try {
    if (!(type in messageFormatters))
      throw new Error(`Invalid messageType: ${type}`)

    await axios.post(
      endpoint,
      { gid, tid, messages: [messageFormatters[type](content)] },
      { headers: { Authorization: `Bearer ${token}` } },
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
