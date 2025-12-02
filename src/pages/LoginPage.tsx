import { LoginForm } from '@/components/forms/login-form';
import Footer from '@/components/blocks/footer/Footer';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      {/* Fixed Background */}
      <div
        className='fixed inset-0 w-full h-full -z-10'
        style={{
          backgroundImage: 'url(/images/iotBackground_Gradient2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Navbar />
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
