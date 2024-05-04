
import { useEffect, useState } from "react"
import { Channel } from "stream-chat";
import { useChatContext } from "stream-chat-react";


export const useGetChannelById = (id: string) => {
  const [channel, setChannel] = useState<Channel>();
  const [isChannelLoading, setIsChannelLoading] = useState(true);

  const { client } = useChatContext();

  useEffect(() => {
    if (!client) return;

    const loadChannel = async () => {
      const channels = await client.queryChannels({
        id: id
      });

      if (channels.length > 0) setChannel(channels[0]);

      setIsChannelLoading(false);
    }

    loadChannel();
  }, [client, id]);

  return { channel, isChannelLoading };
}