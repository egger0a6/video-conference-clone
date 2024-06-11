"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useAddChatMember } from "@/hooks/useAddChatMember";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { useUser } from "@clerk/nextjs";
import { BackgroundFiltersProvider, StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetuppComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(id);
  const { channel, isChannelLoading } = useGetChannelById(id);
  const isAddingMember = useAddChatMember(user, channel);

  if (!isLoaded || isCallLoading || isChannelLoading || isAddingMember) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <BackgroundFiltersProvider
          isBlurringEnabled={true}
          backgroundFilter="blur"
          backgroundImages={[
            "/images/callBackgroundImages/black-gray-geometry.png",
            "/images/callBackgroundImages/blue-gradient.png",
            "/images/callBackgroundImages/brown-workdesk.png",
            "/images/callBackgroundImages/cyan-purple-pink-gradient.png",
            "/images/callBackgroundImages/garden.png",
            "/images/callBackgroundImages/green-modern.png",
            "/images/callBackgroundImages/mesa.jpeg",
            "/images/callBackgroundImages/mountains.png",
            "/images/callBackgroundImages/outer-space.png",
            "/images/callBackgroundImages/tent.jpg",
            "/images/callBackgroundImages/tropical-beach.png",
          ]}
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