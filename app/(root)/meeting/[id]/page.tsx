"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: {id} }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetuppComplete, setIsSetupComplete] = useState(false);

  const {call, isCallLoading} = useGetCallById(id);
  const {channel, isChannelLoading} = useGetChannelById(id);

  if (!isLoaded || isCallLoading || isChannelLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetuppComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom channel={channel!} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting;