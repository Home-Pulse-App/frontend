import { Asterisk, CornerDownRight } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const Process1 = () => {
  const process = [
    {
      step: '01',
      title: 'Discover & Research',
      description:
        'We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.',
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description:
        'Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.',
    },
    {
      step: '03',
      title: 'Execute & Develop',
      description:
        'We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.',
    },
    {
      step: '04',
      title: 'Optimize & Improve',
      description:
        'We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.',
    },
  ];

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <div className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
              {' '}
              <h1 className="w-fit">Our Process</h1>
              <Asterisk className="absolute -right-2 -top-2 size-5 text-orange-500 md:size-10 lg:-right-14" />
            </div>
            <p className="text-foreground/50 text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus ut laborum
              laboriosam debitis.
            </p>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <CornerDownRight className="text-orange-500" />
              Get in touch
            </Button>
          </div>
          <ul className="lg:pl-22 relative col-span-4 w-full">
            {process.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10"
              >
                <Illustration className="absolute right-0 top-4" />

                <div className="bg-muted flex size-12 items-center justify-center px-4 py-1 tracking-tighter">
                  0{index + 1}
                </div>
                <div className="">
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process1 };

const Illustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="#FF0000"
        strokeWidth="4"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="#FF0000"
        strokeWidth="4"
      />
    </svg>
  );
};
