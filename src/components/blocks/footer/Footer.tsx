'use client';

import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const YEAR = new Date().getFullYear();

// export const title = 'Simple Footer';

export default function Footer() {
  return (
    <footer className='w-full border-t pb-8 pt-8 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-2 md:justify-between'>
          <p className='text-foreground text-center text-sm font-medium'>
            Home Pulse. {YEAR}
          </p>
          <div className='flex gap-1'>
            <Button asChild variant='ghost' size='icon' className='h-8 w-8'>
              <a
                href='https://github.com/Home-Pulse-App'
                aria-label='GitHub'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub className='h-8 w-8' />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
