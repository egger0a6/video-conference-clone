import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

const Loader = ({ isCallEnded = false }: {isCallEnded?: boolean}) => {
  const router = useRouter()

  return (
    <div className="flex-center h-screen w-full">
      {isCallEnded
        ? (
          <div className="flex-center flex-col">
            <h1 className="text-white text-2xl font-bold">Call Ended</h1>
            <Button 
              onClick={() => router.push("/")}
              className="bg-purple-1 text-white text-lg font-semibold mt-4"
            >
              Return Home
              <ArrowUpRight width={22} height={22} className="ml-2" />
            </Button>
          </div>
        )
        : (
          <Image 
        src="/icons/loading-circle.svg"
        alt="loading"
        width={50}
        height={50}
      />
        )
      }
      
    </div>
  )
}

export default Loader;