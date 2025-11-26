'use client';
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from '@/components/ui/shadcn-io/announcement';
import { Button } from '@/components/ui/button';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';
import { Link } from 'react-router-dom';

const Example = () => (
  <div className="flex flex-col gap-16 px-8 py-24 text-center">
    <div className="flex flex-col items-center justify-center gap-8">
      <Link href="#">
        <Announcement>
          <AnnouncementTag>codeworks students</AnnouncementTag>
          <AnnouncementTitle>Introducing Home Pulse</AnnouncementTitle>
        </Announcement>
      </Link>
      <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
        The best way to manage & track your devices
      </h1>
      <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
        Offering an intuitive way to navigate and control your smart
        home devices from your own 3D space,
        <br />
        or choose and explore one of our preset modelled rooms.
      </p>

      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="#">Get started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link className="no-underline" href="#">
            Learn more
          </Link>
        </Button>
      </div>
    </div>

    <VideoPlayer className="overflow-hidden rounded-lg border">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        slot="media"
        src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer>
  </div>
);

export default Example;
