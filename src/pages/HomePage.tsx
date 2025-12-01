import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import Hero from '@/components/blocks/hero/hero';
import { Process1 } from '@/components/process1';
import { Separator } from '@/components/ui/separator';
import '../App.css';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar01
        logo={
          <img
            src={HomePulseLogo}
            alt="HomePulse Logo"
            className="h-15 w-auto"
          />
        }
        logoHref="/"
        navigationLinks={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Immersive View', href: '/ImmersiveView' },
        ]}
      />
      <main className="flex-1 px-6 py-6 mt-10">
        <div className="mx-auto w-full max-w-7xl">
          <section className="space-y-2">
            <div className="flex items-center justify-center pt-10">
              <img
                src={HomePulseLogo}
                alt="HomePulse Logo"
                className="h-64 w-auto"
              />
            </div>
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
