import { LoginForm } from '@/components/login-form';
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar01
        logo={<img src={HomePulseLogo} alt="HomePulse Logo" className="h-15 w-auto" />}
        logoHref="/"
      />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <FooterSimple01 />
    </div>
  );
}
