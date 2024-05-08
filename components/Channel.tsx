import { Channel as ChannelTypes } from "stream-chat";
import { Channel as ChatChannel, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

const Channel = ({ channel }: {channel: ChannelTypes}) => {
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