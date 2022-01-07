#!/usr/bin/env node

const { readFileSync } = require('fs')
const { join } = require('path')
const yargs = require('yargs/yargs')
const run = require('../lib/index')

const isUndefined = (str) => !str || !str.trim().length

const {
  HOME,
  AMITYEKO_SERVER_ENDPOINT,
  AMITYEKO_ACCESS_TOKEN,
  AMITYEKO_GROUP_ID,
  AMITYEKO_THREAD_ID,
} = process.env

const envConfig = {
  serverEndpoint: AMITYEKO_SERVER_ENDPOINT,
  accessToken: AMITYEKO_ACCESS_TOKEN,
  groupId: AMITYEKO_GROUP_ID,
  threadId: AMITYEKO_THREAD_ID,
}

const defaultConfig = {
  serverEndpoint: undefined,
  accessToken: undefined,
  groupId: undefined,
  threadId: undefined,
}

// 1st, try to load .rc config
try {
  const configFile = join(HOME, '.aemrc')
  const fileContent = readFileSync(configFile)
  const config = JSON.parse(fileContent.toString())

  Object.keys(defaultConfig)
    .filter((key) => key in config && !isUndefined(config[key]))
    .forEach((key) => (defaultConfig[key] = config[key]))
} catch (err) {
  // rc config not found
}

// 2nd, use env as override
Object.keys(envConfig)
  .filter((key) => !isUndefined(envConfig[key]))
  .forEach((key) => (defaultConfig[key] = envConfig[key]))

const commonOptions = {
  endpoint: {
    default: defaultConfig.serverEndpoint,
    type: 'string',
  },
  token: {
    default: defaultConfig.accessToken,
    type: 'string',
  },
  gid: {
    default: defaultConfig.groupId,
    type: 'string',
  },
  tid: {
    default: defaultConfig.threadId,
    type: 'string',
  },
}

const args = yargs(process.argv.slice(2))
  .scriptName('aem')
  .command(
    'text <content>',
    'send a text message',
    (yargs) =>
      yargs.options(commonOptions).positional('content', {
        type: 'string',
        demandOption: true,
      }),
    async (args) => {
      delete args._

      if (Object.values(args).some((val) => isUndefined(val)))
        throw new Error('Some arguments are missing.')

      return run(
        args.endpoint,
        args.token,
        args.gid,
        args.tid,
        'text',
        args.content,
      )
    },
  )
  .command(
    'image <url>',
    'send an image message',
    (yargs) =>
      yargs.options(commonOptions).positional('url', {
        type: 'string',
        demandOption: true,
      }),
    async (args) => {
      delete args._

      if (Object.values(args).some((val) => isUndefined(val)))
        throw new Error('Some arguments are missing.')

      return run(
        args.endpoint,
        args.token,
        args.gid,
        args.tid,
        'image',
        args.url,
      )
    },
  )
  .fail((message, err, yargs) => {
    console.error(message || err.message)
    console.error(yargs.help())
    process.exit(1)
  })
  .help().argv
