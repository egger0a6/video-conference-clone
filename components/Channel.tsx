import { Channel as ChatChannel, MessageInput, MessageList, Thread, Window, useChatContext } from "stream-chat-react";

const Channel = () => {
  const { client } = useChatContext();
  console.log(client)
  const id = crypto.randomUUID();

  const channel = client.channel("livestream", id, {
    name: `call`
  });

  return (
    <ChatChannel channel={channel}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </ChatChannel>
  )
}

export default Channel;