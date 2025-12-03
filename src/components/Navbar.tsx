import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import { authService } from '@/services/authService';

export default function Navbar() {
  const isAuthenticated = authService.isAuthenticated();
  return (
    <>
      {isAuthenticated ? (
        <Navbar01
          logo={<img src={HomePulseLogo} alt='HomePulse Logo' className='h-15 w-auto' />}
          logoHref='/'
          navigationLinks={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Homes', href: '/homes' },
            { label: 'Devices', href: '/devices' },
            { label: 'Getting Started', href: '/getting-started' },
          ]}
        />
      ) : (
        <Navbar01
          logo={<img src={HomePulseLogo} alt='HomePulse Logo' className='h-15 w-auto' />}
          logoHref='/'
          navigationLinks={[{ label: 'Getting Started', href: '/getting-started' }]}
        />
      )}
      ;
    </>
  );
}
