import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowRightToLine, LayoutList, MessagesSquare, Users} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import Channel from "./Channel";
import { Channel as ChannelTypes } from "stream-chat";


type CallLayoutType = "grid" | "speaker-left" | "speaker-right" | "speaker-top" | "speaker-bottom";

const MeetingRoom = ({ channel }: {channel: ChannelTypes}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("speaker-bottom");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    if (screenWidth <= 640) setLayout("speaker-bottom");

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [screenWidth]);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />
      case "speaker-bottom":
        return <SpeakerLayout participantsBarPosition="top" />
      default:
        return <SpeakerLayout participantsBarPosition="bottom" />
    }
  }

  return (
    <section className="relative sm:flex h-screen w-full overflow-hidden text-white">
      <div className="flex flex-col size-full items-center justify-center px-2">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className="flex w-full items-center justify-center gap-5 flex-wrap pb-2">
          <CallControls onLeave={() => router.push("/")} />

          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["Grid", "Speaker-Left", "Speaker-Right", "Speaker-Top", "Speaker-Bottom"].map((item, idx) => {
                if (screenWidth <= 640 && (item === "Speaker-Left" || item === "Speaker-Right")) {
                  return null;
                }
                return (
                  <div
                    key={idx}
                  >
                    <DropdownMenuItem 
                      onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                      className="cursor-pointer"
                    >
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-dark-1" />
                  </div>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => {
            setShowParticipants((prev) => !prev);
          }}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
          <button onClick={() => {
            setShowChat((prev) => !prev)
          }}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <MessagesSquare size={20} className="text-white" />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
      <div className={`absolute right-0 top-0 sm:static transition-all transform w-[100vw] sm:max-w-[350px] duration-700 ease-out ${(showParticipants || showChat) ? 
        "sm:w-[30vw] translate-x-0" :
        "sm:w-0 translate-x-[30vw]"
      }`}>
        <div className={`transform scale-0 ${(showParticipants && showChat)
          ? "h-[50vh] scale-100"
          : showParticipants
            ? "h-screen scale-100"
            : "h-0"
        } transition-all duration-500 ease-out`}>
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className={`relative transform scale-0 ${(showParticipants && showChat) 
          ? "h-[50vh] scale-100"
          : showChat
            ? "h-screen scale-100"
            : "h-0"
        } `}>
          <Channel channel={channel} />
          <button 
            onClick={() => setShowChat(false)}
            className="absolute top-1 left-1 cursor-pointer rounded-2xl p-2 text-black hover:bg-[#4c535b] hover:text-white"
          >
            <ArrowRightToLine size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom;