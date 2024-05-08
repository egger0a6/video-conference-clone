import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { ChannelMemberResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";

export const useGetChannelMembers = (id: string) => {
  const [members, setMembers] = useState<ChannelMemberResponse[]>([]);
  const [isMembersLoading, setIsMembersLoading] = useState(true);
  const [memberCount, setMemberCount] = useState<number>(0);

  const { user } = useUser();
  const { client } = useChatContext();
  useEffect(() => {
    if (!client) return;

    const loadMembers = async () => {
      const channels = await client.queryChannels({
        id: id,
      });

      if (channels.length > 0) {
        if (channels[0].data?.member_count === 0) return;
        let {members} = await channels[0].queryMembers({});
        members = members.filter((member) => member.user_id !== user?.id).slice(0, 6);
        console.log(members)
        if (members.length > 6) {
          setMemberCount(members.length - 6);
        } else {
          setMemberCount(members.length);
        }
        if (members.length > 0) {
          setMembers(members);
        }
      }

      setIsMembersLoading(false);
    }
    
    loadMembers();
  }, [client, user, id]);

  return {members, isMembersLoading, memberCount};
}