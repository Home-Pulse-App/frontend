import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';

export default function Navbar() {
  return (
    <>
      <Navbar01
        logo={<img src={HomePulseLogo} alt="HomePulse Logo" className="h-15 w-auto" />}
        logoHref="/"
        navigationLinks={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Homes', href: '/homes' },
          { label: 'About', href: '/about' },
        ]}
      />
      ;
    </>
  );
}
