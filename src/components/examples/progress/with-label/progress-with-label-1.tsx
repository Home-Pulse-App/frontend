import { Progress } from '@/components/ui/Progress';

export const title = 'With Percentage';

const Example = () => {
  const value = 65;
  return (
    <div className='w-full mx-auto space-y-2'>
      <div className='flex justify-between text-sm'>
        <span className='text-muted-foreground'>Progress...</span>
        <span className='font-medium'>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
};

export default Example;
