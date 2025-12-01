import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import FormPatterns2 from '@/components/examples/form/patterns/form-patterns-2';
import { DeveloperInstructions } from '@/components/DeveloperInstructions';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      {/* Fixed Navbar */}
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

      <main
        className="flex-1 flex flex-col items-center pt-20 pb-12 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/iotBackground_Gradient.png)' }}
      >
        <div className="w-full max-w-md mb-12">
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="pt-6">
              <FormPatterns2 />
            </CardContent>
          </Card>
        </div>

        <DeveloperInstructions />
      </main>

      <FooterSimple01 />
    </div>
  );
}
