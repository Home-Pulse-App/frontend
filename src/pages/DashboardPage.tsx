import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import Navbar from '@/components/Navbar';
import { authService } from '@/services/authService';

export default function DashboardPage() {
  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      {/* Fixed Background */}
      <div
        className='fixed inset-0 w-full h-full -z-10'
        style={{
          backgroundImage: 'url(/images/iotBackground_Gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Navbar />
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          <h1>Dashboard</h1>
          Future dashboard
          {authService.isAuthenticated() ? (
            <p>You are logged in</p>
          ) : (
            <p>You are not logged in</p>
          )}
        </div>
      </main>
      <FooterSimple01 />
    </div>
  );
}
