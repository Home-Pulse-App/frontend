import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import Hero from '@/components/blocks/hero/hero';
import { Process1 } from '@/components/process1';
import { Separator } from '@/components/ui/separator';
import '../App.css';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar />

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto w-full max-w-7xl">
          <section className="space-y-2">
            <div className="py-4">
              <Hero />
            </div>

            <Separator />

            <div id="Process" className="py-6">
              <Process1 />
            </div>
          </section>
        </div>
      </main>

      <FooterSimple01 />
    </div>
  );
}
