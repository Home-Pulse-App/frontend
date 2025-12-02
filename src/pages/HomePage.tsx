import Footer from '@/components/blocks/footer/Footer';
import Hero from '@/components/blocks/hero/hero';
import { Process } from '@/components/Process';
import { Separator } from '@/components/ui/separator';
import '../App.css';
import Navbar from '@/components/Navbar';
import HomePulseLogo from '@/assets/HomePulseLogo.png';

export default function HomePage() {
  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <main className='flex-1 px-6 py-6'>
        <div className='mx-auto w-full max-w-7xl'>
          <section className='space-y-2'>
            <div className='flex items-center justify-center pt-10'>
              <img
                src={HomePulseLogo}
                alt='HomePulse Logo'
                className='h-64 w-auto'
              />
            </div>
            <div className='py-4'>
              <Hero />
            </div>

            <Separator />

            <div id='Process' className='py-6'>
              <Process />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
