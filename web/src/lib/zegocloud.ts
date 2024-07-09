"use client";
import { useEffect, useState } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
const AppId = process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID;
const Server = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER as string;
export const ZegoEngine = () => {
  const [zegoEngine, setZegoEngine] = useState<ZegoExpressEngine | null>(null);
  useEffect(() => {
    const zg = new ZegoExpressEngine(Number(AppId), Server);
    setZegoEngine(zg);
    zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
      if (updateType === "ADD") {
        const remoteStream = await zg.startPlayingStream(
          streamList[0].streamID
        );
        const remoteVideo = document.createElement("video");
        remoteVideo.srcObject = remoteStream;
        remoteVideo.play();
      }
    });
  }, []);
  return zegoEngine;
};
