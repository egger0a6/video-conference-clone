import { UserResource } from "@clerk/types";
import { useEffect, useState } from "react";
import { Channel } from "stream-chat";

export const useAddChatMember = (user: UserResource | null | undefined, channel: Channel | undefined) => {
  const [isAddingChatMember, setIsAddingMember] = useState(true);

  useEffect(() => {
    const addMember = async () => {
      const query = await channel?.queryMembers({ id: user?.id});
      if (!query?.members.length) {
        await channel?.addMembers([{ user_id: user?.id!, channel_role: "channel_member" }]);
      }
      
      setIsAddingMember(false);
    }
    addMember();
  }, [user, channel]);

  return isAddingChatMember;
}