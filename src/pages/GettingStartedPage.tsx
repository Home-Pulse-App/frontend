import FooterSimple01 from '@/components/blocks/footer/footer-simple-01';
import Navbar from '@/components/Navbar';
import DeveloperInstructions from '@/components/DeveloperInstructions';

import { motion } from 'framer-motion';

export default function GettingStartedPage() {
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
      <main className='flex-1 flex items-center justify-center px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className='w-full'
        >
          <DeveloperInstructions cardOpacity={100} />
        </motion.div>
      </main>
      <FooterSimple01 />
    </div>
  );
}
