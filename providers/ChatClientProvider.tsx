"use client"

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { ReactNode, use, useEffect, useState } from "react"
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const ChatClientProvider = ({ children }: { children: ReactNode}) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const {user, isLoaded} = useUser();

  useEffect(() => {
    if (!isLoaded || ! user) return;
    if (!apiKey) throw new Error("Stream API key missing");

    const client = StreamChat.getInstance(apiKey);
    client.connectUser(
      {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider
    );

    setChatClient(client);

    // const initChat = async () => {
    //   const client = StreamChat.getInstance(apiKey);
    //   await client.connectUser(
    //     {
    //       id: user?.id,
    //       name: user?.username || user?.id,
    //       image: user?.imageUrl,
    //     },
    //     tokenProvider,
    //   );
    //   setChatClient(client);
    // }

    // initChat();

    return () => {
      const clear = () => {
        client.disconnectUser();
      }
      clear();
    }
  }, [user, isLoaded]);

  if (!chatClient) return <Loader />;

  return (
    <Chat client={chatClient}>
      {children}
    </Chat>
  )
}

export default ChatClientProvider;