import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import { authService } from '@/services/authService';

export default function Navbar() {
  const auth = authService.isAuthenticated();
  return (
    <>
      {auth ?
        <Navbar01
          logo={<img src={HomePulseLogo} alt='HomePulse Logo' className='h-15 w-auto' />}
          logoHref='/'
          navigationLinks={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Immersive View', href: '/ImmersiveView' },
            { label: 'Homes', href: '/homes' },
            { label: 'Getting Started', href: '/getting-started' },
          ]}
        />
        :
        <Navbar01
          logo={<img src={HomePulseLogo} alt='HomePulse Logo' className='h-15 w-auto' />}
          logoHref='/'
          navigationLinks={[
            { label: 'Getting Started', href: '/getting-started' },
          ]}
        />};
    </>
  );
}
