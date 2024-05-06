import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }
  
  useEffect(() => {
    const checkCameraDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        const microphones = devices.filter(device => device.kind === "audioinput");
        if (cameras.length > 0 && !isMicCamToggledOn) call?.camera.enable();
        if (microphones.length > 0 && !isMicCamToggledOn) call?.microphone.enable();
        setCameras(cameras);
        setMicrophones(microphones);
      } catch (error) {
        console.log(error);
      }
    }
    checkCameraDevices();
    
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      if (cameras.length > 0) call?.camera.enable();
      // call?.camera.enable();
      if (microphones.length > 0) call?.microphone.enable();
      // call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview className="max-w-[98vw]" />
      <div className="flex h-16 items-center justify-center gap-3 flex-wrap">
        <label className="flex items-center justify-center gap-2 font-medium ">
          <input 
            type="checkbox" 
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
        <Button 
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
          className="rounded-md bg-green-500 px-4 py-5"
        >
          Join Meeting
        </Button>
      </div>
    </div>
  )
}

export default MeetingSetup;