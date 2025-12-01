import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import FormPatterns2 from '@/components/examples/form/patterns/form-patterns-2';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: 'url(/images/iotBackground_Gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Navbar />
      {/* Hero Section with Registration Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="bg-white">
            <CardContent>
              <FormPatterns2 />
            </CardContent>
          </Card>
        </div>
      </main>
      <FooterSimple01 />
    </div>
  );
}