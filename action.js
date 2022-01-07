const core = require('@actions/core')
const github = require('@actions/github')

const run = require('./lib/index')

run(
  core.getInput('serverEndpoint'),
  core.getInput('accessToken'),
  core.getInput('groupId'),
  core.getInput('threadId'),
  core.getInput('type'),
  core.getInput('content'),
).catch((err) => core.setFailed(err.message))
