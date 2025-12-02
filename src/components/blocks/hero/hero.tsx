'use client';
import { useEffect, useRef } from 'react';
import {
  Announcement,
  AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';
import { Button } from '@/components/ui/button';
import {
  VideoPlayer,
  VideoPlayerContent,
  // VideoPlayerControlBar,
  // VideoPlayerMuteButton,
  // VideoPlayerPlayButton,
  // VideoPlayerSeekBackwardButton,
  // VideoPlayerSeekForwardButton,
  // VideoPlayerTimeDisplay,
  // VideoPlayerTimeRange,
  // VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';
import { HashLink } from 'react-router-hash-link';

const Example = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //* Video is in view, play it
            videoElement.play().catch((error) => {
              console.log('Auto-play prevented:', error);
            });
          } else {
            //* Video is out of view, pause it
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.9,
      },
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='flex flex-col gap-16 px-8 pt-0 py-9 text-center'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <HashLink
          smooth
          to='#hero-video'
          scroll={(el) => {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 75;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }}
        >
          <Announcement>
            <AnnouncementTitle>Introducing Home Pulse</AnnouncementTitle>
          </Announcement>
        </HashLink>
        <h1 className='mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]'>
          Your home's health, at a glance 🩺
        </h1>
        <p className='mt-0 mb-0 text-balance text-lg text-muted-foreground'>
          Home Pulse unifies your rooms and smart devices to deliver clear, real-time insights.
          <br />
          Simple, seamless, effortless.
        </p>

        <div className='flex items-center gap-2'>
          <Button asChild>
            <HashLink smooth to='#Process'>
              Learn more
            </HashLink>
          </Button>
        </div>
      </div>

      <VideoPlayer id='hero-video' className='overflow-hidden rounded-lg border'>
        <VideoPlayerContent
          ref={videoRef}
          crossOrigin=''
          muted
          preload='auto'
          slot='media'
          src='/videos/HeroVideo.mp4'
        />
        {/* <VideoPlayerControlBar>
          <VideoPlayerPlayButton />
          <VideoPlayerSeekBackwardButton />
          <VideoPlayerSeekForwardButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay showDuration />
          <VideoPlayerMuteButton />
          <VideoPlayerVolumeRange />
        </VideoPlayerControlBar> */}
      </VideoPlayer>
    </div>
  );
};

export default Example;
