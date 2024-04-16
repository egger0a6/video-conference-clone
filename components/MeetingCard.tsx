import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { avatarImages } from "@/constants";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({ title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link }: MeetingCardProps) => {
  return (
    <section className="px-6 py-8 flex flex-col justify-between w-full bg-dark-1 rounded-[14px] min-h-[258px] xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image 
          src={icon}
          alt="meeting type"
          width={28}
          height={28}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, idx) => (
            <Image 
              key={idx}
              src={img}
              alt="participants"
              width={40}
              height={40}
              className={cn("rounded-full", {absolute: idx > 0})}
              style={{top: 0, left: idx * 28}}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={handleClick}
              className="rounded bg-blue-1 px-6"
            >
              {buttonIcon1 && (
                <Image 
                  src={buttonIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied"
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image 
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}

export default MeetingCard;