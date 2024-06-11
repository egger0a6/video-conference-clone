import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/MovingBorder";

interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <Button 
      borderRadius="14px"
      duration={Math.floor(Math.random() * 10000) + 10000}
    >
      <div
        onClick={handleClick}
        className={cn(`px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[14px]`, className)}
      >
        <div className="flex-center glassmorphism size-14 rounded-[10px]">
          <Image
            src={img}
            alt="meeting"
            width={37}
            height={37}
          />
        </div>

        <div className="flex flex-col gap-2 text-start">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg font-normal">{description}</p>
        </div>
      </div>
    </Button>
  )
}

export default HomeCard;