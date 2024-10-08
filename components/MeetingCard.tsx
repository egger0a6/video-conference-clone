"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Loader from "./Loader";
import { useGetChannelMembers } from "@/hooks/useGetChannelMembers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";

interface MeetingCardProps {
  id: string;
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  hostImg: string;
  hostName: string;
  userId: string;
}

const MeetingCard = ({ id, title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link, hostImg, hostName, userId }: MeetingCardProps) => {
  const router = useRouter();
  const { members, isMembersLoading, memberCount } = useGetChannelMembers(id);

  if (isMembersLoading) return <Loader />;

  return (
    <section className="px-6 py-8 flex flex-col justify-between w-full bg-dark-1 rounded-[14px] min-h-[258px] xl:max-w-[568px]">
      <article className="flex flex-col gap-5 mb-3">
        <Image
          src={icon}
          alt="meeting type"
          width={28}
          height={28}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold">Host:</h2>
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <Image
                    src={hostImg}
                    alt="host profile picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-purple-1 font-semibold">
                  {hostName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button 
            onClick={() => router.push(`/chat/logs/${id}`)}
            className="border border-blue-1 text-blue-1 hover:bg-blue-1 hover:text-black"
          >
            <MessageSquareText width={20} height={20} className="mr-2" />
            <h2 className="font-semibold">Chat Log</h2>
          </Button>
        </div>
      </article>
      <div className="flex-grow border-t border-gray-700 mb-3"></div>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full">
          {(members && members.length > 0)
            ? members.map((member, idx) => {
              let user = JSON.parse(JSON.stringify(member.user));
              return (
                <TooltipProvider key={member.user_id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        src={user.image}
                        alt="member profile picture"
                        width={40}
                        height={40}
                        className={cn("rounded-full", { absolute: idx > 0 })}
                        style={{ top: 0, left: idx * 28 }}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-purple-4 font-semibold">
                      {(userId === member.user_id) ? `${user.name} (you)` : user.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })
            : "No Meeting Members"
          }
          {(memberCount > 6) && (
            <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
              +{memberCount - 6}
            </div>
          )}
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-purple-1 px-6"
            >
              {buttonIcon1 && (
                <Image
                  src={buttonIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                />
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied"
                });
              }}
              className="bg-purple-3 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}

export default MeetingCard;