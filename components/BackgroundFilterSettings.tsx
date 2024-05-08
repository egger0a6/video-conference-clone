import { useBackgroundFilters } from '@stream-io/video-react-sdk'
import React from 'react'
import Loader from './Loader';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sparkles } from 'lucide-react';

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
    return <div>Background filters are not supported on this device.</div>
  }

  if (!isReady) {
    return <Loader />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default BackgroundFilterSettings;