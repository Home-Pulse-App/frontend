import React from 'react';
import { FaEye, FaArrowRight, FaHome, FaPeopleCarry, FaLightbulb } from 'react-icons/fa';

const Process = () => {
  const process = [
    {
      step: '01',
      title: 'A Shared Vision',
      icon: <FaEye />,
      description:
        'Home Pulse began as a shared vision from four developers: Adam Koep, Artak Navoyan, Miguel Ángel Torrubia Moya, and Alfredo Chávez Romero. We discovered that we shared a passion for bridging the digital and physical worlds in meaningful, interactive ways.',
    },
    {
      step: '02',
      title: 'Common Interests, One Direction',
      icon: <FaArrowRight />,
      description:
        'We were all drawn to similar themes: real-time data streaming, IoT-driven experiences, rich 3D visualisation, and intuitive data-driven interfaces. These overlapping interests naturally guided our brainstorming sessions and sparked the idea of building something that lived at the intersection of all of them.',
    },
    {
      step: '03',
      title: 'From Ideas to an IoT Platform',
      icon: <FaHome />,
      description:
        'What started as loose discussions quickly solidified into the vision for Home Pulse, a smart home platform designed to connect physical devices with immersive digital experiences. By combining ESP32-powered sensors, modern web technologies, and interactive 3D environments, we aimed to make home monitoring both practical and engaging.',
    },
    {
      step: '04',
      title: 'Built Open Source, Built Together',
      icon: <FaPeopleCarry />,
      description:
        'As a collaborative team, we embraced open-source principles from the start. Every part of Home Pulse, from the frontend and backend to the infrastructure and documentation, is developed openly, inviting others to learn from, use, and contribute to the project.',
    },
    {
      step: '05',
      title: 'A Foundation for Future Innovation',
      icon: <FaLightbulb />,
      description:
        'Home Pulse is a reflection of our shared curiosity and a foundation we hope others can build upon. The platform continues to evolve, driven by our commitment to creating technology that connects, informs, and empowers users.',
    },
  ];

  return (
    <section className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20'>
          <div className='top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky'>
            <div className='relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl'>
              {' '}
              <h1 className='w-fit'>The Home Pulse Journey</h1>
            </div>
            <p className='text-foreground/50 text-base text-justify'>
              Home Pulse is the result of curiosity, collaboration,
              and a shared fascination with connecting the digital and physical worlds.
              <br />
              <br />
              What started as a shared vision from four developers, quickly evolved into an open-source smart home platform,
              combining real-time data, IoT devices, and immersive 3D visualizations.
              <br />
              <br />
              This journey reflects both our technical ambitions and our desire to create something meaningful that others can explore,
              learn from, and contribute to.
            </p>

          </div>
          <ul className='lg:pl-22 relative col-span-4 w-full'>
            {process.map((step, index) => (
              <li
                key={index}
                className='relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10'
              >
                <Illustration className='absolute right-0 top-4' />

                <div className='bg-muted flex size-12 items-center justify-center px-4 py-1 tracking-tighter'>
                  0{index + 1}
                </div>
                <div className=''>
                  <h3 className='flex items-center gap-2 mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl'>
                    {step.title}
                    {step.icon}
                  </h3>
                  <p className='text-foreground/50'>{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process };

const Illustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='22'
      height='20'
      viewBox='0 0 22 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <line
        x1='0.607422'
        y1='2.57422'
        x2='21.5762'
        y2='2.57422'
        stroke='#FF0000'
        strokeWidth='4'
      />
      <line
        x1='19.5762'
        y1='19.624'
        x2='19.5762'
        y2='4.57422'
        stroke='#FF0000'
        strokeWidth='4'
      />
    </svg>
  );
};
