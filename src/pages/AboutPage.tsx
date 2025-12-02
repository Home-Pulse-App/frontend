import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import Navbar from '@/components/Navbar';
import DeveloperInstructions from '@/components/DeveloperInstructions';

export default function AboutPage() {
  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      {/* Fixed Background */}
      <div
        className='fixed inset-0 w-full h-full -z-10'
        style={{
          backgroundImage: 'url(/images/iotBackground_Gradient3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Navbar />
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <DeveloperInstructions />
      </main>
      <FooterSimple01 />
    </div>
  );
}
