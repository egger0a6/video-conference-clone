import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const ChatLogLayout = ({ children }: { children: ReactNode}) => {
  return (
    <main className="relative">
      <Navbar />
      <section className="flex flex-1 min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
        {children}
      </section>
    </main>
  )
}

export default ChatLogLayout;