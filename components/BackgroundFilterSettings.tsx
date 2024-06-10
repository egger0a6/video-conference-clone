import { useBackgroundFilters } from '@stream-io/video-react-sdk'
import React from 'react'
import Loader from './Loader';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Image as ImageIcon, ImageOff, Sparkles } from 'lucide-react';
import Image from "next/image";
import { callBackgroundImageInfo } from '@/constants';

const BackgroundFilterSettings = () => {
  const {
    isSupported,
    isReady,
    disableBackgroundFilter,
    applyBackgroundBlurFilter,
    applyBackgroundImageFilter,
    backgroundImages,
  } = useBackgroundFilters();

  if (!isSupported) {
    return <div>Background filters are not supported on this device.</div>;
  }

  if (!isReady) {
    return <Loader />;
  }

  return (
    <div className=''>
      <DropdownMenu>
        <div className='flex items-center'>
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Sparkles size={20} className='text-white' />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
          <DropdownMenuItem
            onClick={disableBackgroundFilter}
            className='cursor-pointer'
          >
            Disable Blur
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-dark-1" />

          <DropdownMenuItem
            onClick={() => applyBackgroundBlurFilter("high")}
            className='cursor-pointer'
          >
            High Blur
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-dark-1" />

          <DropdownMenuItem
            onClick={() => applyBackgroundBlurFilter("medium")}
            className='cursor-pointer'
          >
            Medium Blur
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-dark-1" />

          <DropdownMenuItem
            onClick={() => applyBackgroundBlurFilter("low")}
            className='cursor-pointer'
          >
            Low Blur
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-dark-1" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ImageIcon className='mr-2 h-4 w-4' />
              <span>Background Images</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='border-dark-1 bg-dark-1 text-white'>
                {backgroundImages?.map((image, idx) => (
                  <DropdownMenuItem 
                    key={callBackgroundImageInfo[idx].id}
                    onClick={() => applyBackgroundImageFilter(image)}
                    className='cursor-pointer flex gap-2'
                  >
                    <Image 
                      src={image}
                      alt={callBackgroundImageInfo[idx].title}
                      width={28}
                      height={16}
                    />
                    {callBackgroundImageInfo[idx].title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={disableBackgroundFilter}
                >
                  <ImageOff className='mr-2 h-4 w-4' />
                  <span>None</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default BackgroundFilterSettings;