"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { useUser } from "@clerk/nextjs";
import { BackgroundFiltersProvider, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const Meeting = ({ params: {id} }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetuppComplete, setIsSetupComplete] = useState(false);

  const {call, isCallLoading} = useGetCallById(id);
  const {channel, isChannelLoading} = useGetChannelById(id);

  useEffect(() => {
    const addMember = async () => {
      const query = await channel?.queryMembers({id: user?.id});
      if (!query?.members.length) {
        await channel?.addMembers([{user_id: user?.id!, channel_role: "channel_member"}]);
      }
    }
    addMember();
  }, [user, channel]);

  if (!isLoaded || isCallLoading || isChannelLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <BackgroundFiltersProvider
          isBlurringEnabled={true}
          backgroundFilter="blur"
        >
          <StreamTheme>
            {!isSetuppComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom channel={channel!} />
            )}
          </StreamTheme>
        </BackgroundFiltersProvider>
      </StreamCall>
    </main>
  )
}

export default Meeting;