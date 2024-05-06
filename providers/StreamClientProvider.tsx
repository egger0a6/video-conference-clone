"use client";

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  StreamVideoClient,
  StreamVideo,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const {user, isLoaded} = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key missing");
    
    const newChatClient = StreamChat.getInstance(apiKey);
    newChatClient.connectUser(
      {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    );

    // const updateUserRole = async () => {
    //   const query = await newChatClient.queryUsers({id: user.id});
    //   console.log(query)
      
    //   if (query.users[0].role !== "user") {
    //     await newChatClient.partialUpdateUser({
    //       id: user.id,
    //       set: {
    //         role: "user",
    //       },
    //     });
    //   }
    // }
    // updateUserRole();

    // function fetchUser() {
    //   return new Promise((resolve, reject) => {
    //     const response = newChatClient.queryUsers({}, {});
    //     resolve(response)
    //   })
    // }

    // fetchUser()
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   }) 

    const newVideoClient = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setChatClient(newChatClient);
    setVideoClient(newVideoClient);

    return () => {
      const clear = () => {
        newChatClient.disconnectUser();
      }
      clear();
    }
  }, [user, isLoaded]);

  if (!chatClient || !videoClient) return <Loader />

  return (
    <Chat client={chatClient}>
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    </Chat>
  );
};

export default StreamVideoProvider;