"use client"

import Navbar from "@/components/Navbar";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import { motion, spring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="relative">
      <Navbar />
      <section className="flex-center min-h-screen w-full px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
        <div className="flex-center flex-col">
          <motion.div
            animate={{y: [0, -50, 10, -10, 5, 0, 2, 0]}}
            transition={{duration: 2.2, ease: "easeInOut", type: spring, repeat: Infinity, repeatDelay: 0.5}}
          >
            <CircleAlert height={80} width={80} className="text-green-1" />
          </motion.div>
          <p className="text-2xl text-white mt-6">404 | This page could not be found.</p>
          <Button 
              onClick={() => router.push("/")}
              className="border-2 border-green-1 text-green-1 text-lg font-semibold mt-4 hover:bg-green-1 hover:text-black"
            >
              Return Home
              <ArrowUpRight width={22} height={22} className="ml-2" />
            </Button>
        </div>
      </section>
    </main>
  )
}

export default NotFound;