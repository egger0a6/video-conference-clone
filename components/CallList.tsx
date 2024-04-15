"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CallList = ({ type }: {type: "ended" | "upcoming" | "recordings"}) => {
  const router = useRouter();

  const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  }

  return (
    <div className="grid">

    </div>
  )
}

export default CallList;