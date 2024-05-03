"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";

const Home = () => {
  const now = new Date();
  const [time, setTime] = useState(now.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"}));
  const [date, setDate] = useState((new Intl.DateTimeFormat("en-US", {dateStyle: "full"})).format(now));

  // const client = useChatContext();
  
  // useEffect(() => {
  //   const getChannels = async () => {
  //       const channels = await client.client.queryChannels({type: "livestream"}, {}, {limit: 30})
  //         try {
  //           console.log(channels ? channels : "no channels")
  //           channels?.forEach(async (channel) => {
  //             try {
  //               // const response = await client.client.deleteChannels([channel?.cid], {hard_delete: true})
  //               // console.log(response.result)
  //               const destroy = channel?.delete();
  //               console.log(destroy)
  //             } catch (error) {
                
  //             }
  //           })
  //         } catch (error) {
  //           console.log(error)
  //         }
  //   }

  //   getChannels();
    
  // }, [])

  // Variables used if not implementing clock that updates in realtime:
  // const time = now.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"});
  // const date = (new Intl.DateTimeFormat("en-US", {dateStyle: "full"})).format(now);
  
  // Another way to formate the date:
  // const date = now.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"});

  useEffect(() => {
    let tick = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"}));
      setDate((new Intl.DateTimeFormat("en-US", {dateStyle: "full"})).format(now));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between px-5 py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home;