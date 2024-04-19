import ChatClientProvider from "@/providers/ChatClientProvider";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode}) => {
  return (
    <main>
      <ChatClientProvider>
        <StreamVideoProvider>
          {children}
        </StreamVideoProvider>
      </ChatClientProvider>
    </main>
  )
}

export default RootLayout;