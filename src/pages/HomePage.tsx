import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import Hero from "@/components/blocks/hero/hero"

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
      />

      {/* Main content grows to fill space */}
      <main className="flex-1 p-6">
        <Hero />
      </main>

      <FooterSimple01 />
    </div>
  );
}
