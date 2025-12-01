import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import FormPatterns2 from '@/components/examples/form/patterns/form-patterns-2';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar01
        logo={<img src={HomePulseLogo} alt="HomePulse Logo" className="h-15 w-auto" />}
        logoHref="/"
        navigationLinks={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Immersive View', href: '/ImmersiveView' },
        ]}
        signInHref="/login"
        ctaHref="/register"
        signInText="Sign In"
        ctaText="Get Started"
      />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <FormPatterns2 />
        </div>
      </main>
      <FooterSimple01 />
    </div>
  );
}

