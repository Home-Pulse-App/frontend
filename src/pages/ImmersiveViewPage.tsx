import FileUpload from '../components/FileUpload';

function ImmersiveViewPage() {

  return (
    <>
      <div className='w-full h-screen min-h-[600px] fixed z-20 flex flex-col items-center justify-between py-[10vh] pointer-events-none'>

        <div className='pointer-events-auto shrink-0'>
          <FileUpload/>
        </div>
      </div>

      <div className='w-full h-screen fixed inset-0 z-0 bg-gray-400 dark:bg-[rgb(43,41,40)]'>

      </div>
    </>
  );
}

export default ImmersiveViewPage;