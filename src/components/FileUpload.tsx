import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import Folder from '../components/ui/Folder';
// import { mockServer } from '../services/localDBService';
import { useRoomStore } from '@/store/roomStore';

type FileUploadProps = {
  onFileUpload?: (fileData: FileData) => void;
  roomId: string;
};

export interface FileData {
  name: string;
  type: string;
  size: number;
  url: string;
}

function FileUpload({ onFileUpload, roomId }: FileUploadProps) {
  //* Trick to avoid unused variables
  const [, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { updateRoom } = useRoomStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
    else {
      setIsDragging(false);
    }
  };

  const processFile = (file: File) => {

    const fileURL = URL.createObjectURL(file);

    const fileData: FileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      url: fileURL,
    };

    if (onFileUpload) {
      onFileUpload(fileData);
    }

    //TODO: Check what is the best way to do this when connecting to the backend
    //* Convert to base64 and save
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      console.log('[FileUpload] File read complete, base64 length:', base64Data.length);
      // await mockServer.saveSplatData('default-user', base64Data);
      const response = await updateRoom(roomId, { viewSplat: base64Data });
      console.log(response);
      console.log('[FileUpload] Save complete, navigating...');
      //* Navigate ONLY after saving is complete
      navigate('/viewer', { state: { file: fileData } });
    };
    reader.onerror = (error) => {
      console.error('[FileUpload] FileReader error:', error);
    };
    console.log('[FileUpload] Starting to read file:', file.name);
    reader.readAsDataURL(file);

  };

  const handleFileDialog = () => {
    setIsDragging(true);

    const handleFocus = () => {
      setTimeout(() => {
        if (!fileInputRef.current?.files?.length) {
          setIsDragging(false);
        }
        window.removeEventListener('focus', handleFocus);
      }, 200);
    };

    window.addEventListener('focus', handleFocus);
    fileInputRef.current?.click();
  };

  return (
    <div className='w-30 h-30'>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileDialog}
        className='cursor-pointer'
      >
        <input
          ref={fileInputRef}
          type='file'
          onChange={handleFileInput}
          className='hidden'
          accept='*/*'
        />

        <div className='flex flex-col items-center'>
          <div>
            <Folder size={1} onFileUpload={processFile} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default FileUpload;