"use client";
import React, { useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useInviteTokenStore } from "@/zustand";
import { Account, JoinGroup, CreateGroup, LeaveGroup, Invite } from ".";
import { useAuth, useSocket } from "@/context";
import { ZegoEngine } from "@/lib/zegocloud";
import ZegoLocalStream from "zego-express-engine-webrtc/sdk/code/zh/ZegoLocalStream.web";
import { User } from "firebase/auth";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import GoogleSignIn from "./signIn";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MessageCircleMore } from "lucide-react";
import ChatSection from "../chat/chat";
export default function Navbar() {
  const path = usePathname().trim();
  const socket = useSocket();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("id") as string;
  const { token } = useInviteTokenStore();
  const { user } = useAuth();
  const zg = ZegoEngine();
  const [localStream, SetLocalStream] = useState<ZegoLocalStream | null>(null);
  const { toast } = useToast();
  const Join = useCallback(
    async (groupId: string, user: User | null, token: string) => {
      if (zg && groupId && user) {
        try {
          await zg.loginRoom(groupId, token, {
            userID: user?.uid as string,
            userName: user?.email as string,
          });
          const localStream = await zg.createZegoStream({
            camera: { audio: true, video: false },
            audioBitrate: 192,
          });
          SetLocalStream(localStream);
          zg.startPublishingStream(`${user?.uid}_stream`, localStream);

          socket?.emit("joinGroup", groupId, user);
        } catch (err) {
          toast({
            variant: "destructive",
            title: JSON.stringify(err),
            description: "Please return home page manually",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      }
    },
    [groupId, zg, groupId]
  );
  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full h-[10vh]">
      <nav
        className="relative max-w-7xl w-full flex flex-wrap justify-around basis-full items-center px-4 md:px-6 mx-auto"
        aria-label="Global"
      >
        <div className="md:col-span-3">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            SyncCode
          </h1>
        </div>
        <div className="flex items-center gap-x-2 py-1 ms-auto md:ps-6 md:order-3 md:col-span-3">
          {!user ? (
            <GoogleSignIn />
          ) : (
            <>
              {path !== "/group" && <JoinGroup Join={Join} />}
              {path === "/group" ? (
                <>
                  <Invite />
                  <LeaveGroup localStream={localStream} />
                  <div className="block lg:hidden">
                    <Menubar>
                      <MenubarMenu>
                        <MenubarTrigger className="bg-sky-700 text-white rounded-full hover:bg-sky-500 hover:text-white">
                          <MessageCircleMore className="w-8 h-8" />
                        </MenubarTrigger>
                        <MenubarContent className="w-[350px]">
                          <ChatSection/>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </div>
                </>
              ) : (
                <CreateGroup groupId={token} Join={Join} />
              )}
              <Account />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
