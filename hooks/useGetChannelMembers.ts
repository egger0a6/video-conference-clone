import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { ChannelMemberResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";
import { useGetChannelById } from "./useGetChannelById";

export const useGetChannelMembers = (id: string) => {
  const [members, setMembers] = useState<ChannelMemberResponse[]>([]);
  const [isMembersLoading, setIsMembersLoading] = useState(true);
  const [memberCount, setMemberCount] = useState<number>(0);

  const { user } = useUser();
  const { client } = useChatContext();
  const { channel } = useGetChannelById(id);

  useEffect(() => {
    if (!client || !user?.id || !channel) return;

    const loadMembers = async () => {
      if (channel) {
        if (channel.data?.member_count === 0) return;
        let {members} = await channel.queryMembers({});
        members = members.filter((member) => member.user_id !== user?.id).slice(0, 6);
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
  }, [client, user, id, channel]);

  return {members, isMembersLoading, memberCount};
}