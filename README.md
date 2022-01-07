# AmityEko Bot Messenger

## What is it?

This is a:

- (originally) [GitHub action](https://github.com/features/actions) for automating the send of a message to [AmityEko](https://www.amityeko.com/) application.
- npm package ([@amityco/amityeko-bot-messenger](https://www.npmjs.com/package/@amityco/amityeko-bot-messenger))
- command line tool (see below)

## Who is it for?

For engineers whose company is using AmityEko, a way to automate messages of Github workflows and such.

## Notes on usage

Although you may find useful at first to send lots of messages for integration, be aware that CI usually runs _very often_ and you may end up flooding your group with messages. When doing so, you may drag the interest of the groups users _out_ of the group: they may end up not reading the messages, because there are too many messages to read.

**Be a responsible human being and don't spam your peers :)**

## How to use it?

### Github Action

In your workflow, add:

```yaml
  - uses: AmityCo/amityeko-bot-messenger@v1
    with:
      accessToken: {{ secrets.AMITYEKO_TOKEN }}
      groupId: {{ secrets.AMITYEKO_GROUP_ID }}
      threadId: {{ secrets.AMITYEKO_THREAD_ID }}
      content: |
        Hello world!
        This is a multi-line message :)
```

You can also send an image (even a gif) with:

```yaml
  - uses: AmityCo/amityeko-bot-messenger@v1
    with:
      accessToken: {{ secrets.AMITYEKO_TOKEN }}
      groupId: {{ secrets.AMITYEKO_GROUP_ID }}
      threadId: {{ secrets.AMITYEKO_THREAD_ID }}
      type: image
      content: https://cataas.com/cat/gif
```

### NPM package

1. `npm i -D @amityco/amityeko-bot-messenger`
2. `import sendMessage from '@amityco/amityeko-bot-messenger'`

The signature function is:

```ts
function(
  serverEndpoint: string,
  accessToken: string,
  groupId: string,
  threadId: string,
  type: 'text' | 'image',
  content: string,
): Promise<void>
```

### Command line usage

1. `npm i -g @amityco/amityeko-bot-messenger`
2. `aem text "hello world"` or `aem image https://cataas.com/cat/gif`
#### Configuration

You can provide informations about server endpoint, access token, group and thread ids in few different ways.

1. In a JSON file `$HOME/.aemrc`:

```json
{
  "serverEndpoint": "",
  "accessToken": "",
  "groupId": "",
  "threadId": ""
}
```

2. As environment variables:

```bash
AMITYEKO_SERVER_ENDPOINT= AMITYEKO_ACCESS_TOKEN= AMITYEKO_GROUP_ID= AMITYEKO_THREAD_ID= aem text "hello world"
```

3. As command arguments:

```bash
aem text "hello world" --endpoint= --token= --gid= --pid=
```

## Where can I find the necessary variables?

### Access Token

The bot account must be created from the AmityEko admin panel, therefore you must either have access to it or ask an admin to create a bot for you. If you need more informations, ask the AmityEko staff for details.

### Group ID, Thread ID

When connected to the AmityEko app, you can easily find this information from the url. See the screenshot below for finding the correct values:

<img src="./docs/url.png" height="40" />
