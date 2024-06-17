"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { useGetChannelMembers } from "@/hooks/useGetChannelMembers";
import { useUser } from "@clerk/nextjs";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Channel, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

const ChatLog = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();

  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const { channel, isChannelLoading } = useGetChannelById(id);
  const { members, isMembersLoading } = useGetChannelMembers(id);
  // console.log(channel?.data?.own_capabilities)

  if (!isLoaded || isCallLoading || isChannelLoading || isMembersLoading) return <Loader />;

  return (
    <section className=" size-full text-white">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-3">
          Chat History
        </h1>
        <Button
          onClick={() => router.back()}
          className="border-2 border-blue-1 text-blue-1 hover:bg-blue-1 hover:text-black text-lg gap-2"
        >
          Go Back
          <Undo2 width={20} height={20} />
        </Button>
      </div>

      <div className="flex-grow border-t border-gray-700 mb-10"></div>

      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="flex flex-col gap-4 px-6 py-8 bg-dark-1 rounded-[14px] sm:ml-auto h-full">
          <h1 className="text-2xl font-bold">
            {call?.state?.custom?.description?.substring(0, 26) || "Personal Meeting"}
          </h1>
          <p className="text-xl">{call?.state?.startsAt?.toLocaleString()}</p>
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-semibold">Host:</h2>
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <Image
                    src={call?.state?.createdBy?.image!}
                    alt="host profile picture"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-purple-1 font-semibold">
                  {(user?.id === call?.state?.createdBy?.id) ? `${call?.state?.createdBy?.name} (you)` : call?.state?.createdBy?.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="w-full sm:min-w-[350px] sm:w-[700px] mx-auto max-h-screen h-screen sm:h-[75vh] outline outline-[6px] outline-dark-1 rounded-[14px]">
          <Channel channel={channel!}>
            <Window>
              <MessageList />
            </Window>
            <Thread />
          </Channel>
        </div>

        <div className="flex flex-col gap-4 px-6 py-8 bg-dark-1 rounded-[14px] sm:mr-auto h-full">
          <h2 className="text-xl font-semibold">Members:</h2>
          <div className="flex flex-row flex-wrap gap-2">
            {(members && members.length > 0)
              ? members.map((member) => {
                let memberData = JSON.parse(JSON.stringify(member.user));
                return (
                  <TooltipProvider key={member.user_id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={memberData.image}
                          alt="member profile picture"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-4 font-semibold">
                        {(user?.id === member.user_id) ? `${memberData.name} (you)` : memberData.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })
              : "No Meeting Members"
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatLog;