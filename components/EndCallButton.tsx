import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useGetChannelById } from "@/hooks/useGetChannelById";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const {channel} = useGetChannelById(call?.id!);

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && 
    call?.state.createdBy && 
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button 
      onClick={async () => {
        await channel!.stopWatching();
        if (channel) {
          try {
            channel.update(
              {frozen: true},
              {text: "Call has ended"},
            );
          } catch (error) {
            console.log(error);
          }
        }

        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500"
    >
      End call for everyone
    </Button>
  )
}

export default EndCallButton;