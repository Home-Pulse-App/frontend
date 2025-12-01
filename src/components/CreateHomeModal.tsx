import { useState } from 'react';

interface CreateHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (homeName: string) => void;
}

export default function CreateHomeModal({ isOpen, onClose, onCreate }: CreateHomeModalProps) {
  const [homeName, setHomeName] = useState('');

  if (!isOpen) return null;

  function handleCreate() {
    if (!homeName.trim()) return;
    onCreate(homeName.trim());
    setHomeName('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Create a New Home</h3>
        <input
          type="text"
          placeholder="Home Name"
          value={homeName}
          onChange={(e) => setHomeName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
            onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
