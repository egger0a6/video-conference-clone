"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Loader from "./Loader";
import { useGetChannelMembers } from "@/hooks/useGetChannelMembers";

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
}

const MeetingCard = ({ id, title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link, hostImg }: MeetingCardProps) => {
  const {members, isMembersLoading, memberCount} = useGetChannelMembers(id);
  console.log(memberCount)

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
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-semibold">Host:</h2>
          <Image 
            src={hostImg}
            alt="host profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </article>
      <div className="flex-grow border-t border-gray-700 mb-3"></div>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative sm:flex w-full hidden">
          {(members && members.length > 0) 
            ? members.map((member, idx) => {
              let user = JSON.parse(JSON.stringify(member.user));
              return (
                <Image 
                  key={member.user_id}
                  src={user.image}
                  alt="member profile picture"
                  width={40}
                  height={40}
                  className={cn("rounded-full", {absolute: idx > 0})}
                  style={{top: 0, left: idx * 28}}
                />
              )
            })
            : "No Meeting Members"
          }
          {(memberCount > 0) && (
            <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
              +{memberCount}
            </div>
          )}
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-blue-1 px-6"
            >
              {buttonIcon1 && (
                <Image 
                  src={buttonIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied"
                });
              }}
              className="bg-dark-4 px-6"
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