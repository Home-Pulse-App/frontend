import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import FormPatterns2 from '@/components/examples/form/patterns/form-patterns-2';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <FormPatterns2 />
        </div>
      </main>
      <FooterSimple01 />
    </div>
  );
}
