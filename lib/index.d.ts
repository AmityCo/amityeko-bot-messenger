export default function sendMessage(
  serverEndpoint: string,
  accessToken: string,
  groupId: string,
  threadId: string,
  messageType: 'text' | 'image',
  messageContent: string,
): Promise<void>
