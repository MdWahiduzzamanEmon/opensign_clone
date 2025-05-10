// SignatureModal.tsx
import React, { useState } from 'react';

const SignatureModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}) => {
  const [signature, setSignature] = useState('');

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        left: '30%',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid black',
      }}
    >
      <h3>Enter Signature</h3>
      <input type="text" value={signature} onChange={(e) => setSignature(e.target.value)} />
      <button
        onClick={() => {
          onSave(signature);
          onClose();
        }}
      >
        Save
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SignatureModal;
