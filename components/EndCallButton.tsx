import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useChatContext } from "stream-chat-react";

const EndCallButton = () => {
  const call = useCall();
  console.log(call)
  const router = useRouter();
  const {client: chatClient} = useChatContext();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && 
    call?.state.createdBy && 
    localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

  return (
    <Button 
      onClick={async () => {
        const chatChannels = await chatClient.queryChannels({id: call.id});
        if (chatChannels.length > 0) {
          try {
            // TODO change to truncate channel maybe?
            chatChannels[0].delete();
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