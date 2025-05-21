import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StampDialog = ({ open, onClose, onSave, initialImage }) => {
  const { t } = useTranslation();
  const [stampImage, setStampImage] = useState(initialImage || '');

  const handleStampUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && typeof globalThis !== 'undefined' && globalThis.FileReader) {
      const reader = new globalThis.FileReader();
      reader.onload = (ev) => setStampImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && typeof globalThis !== 'undefined' && globalThis.FileReader) {
      const reader = new globalThis.FileReader();
      reader.onload = (ev) => setStampImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      style={{
        display: open ? 'block' : 'none',
        width: '100%',
        minHeight: 320,
        padding: '0 0 24px 0',
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        {t('Upload stamp image')}
      </div>
      <div
        style={{
          border: '2px solid #1976d2',
          borderRadius: 8,
          width: 480,
          height: 320,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          position: 'relative',
          maxWidth: '100%',
          cursor: 'pointer',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="stamp-upload-input"
          onChange={handleStampUpload}
        />
        {stampImage ? (
          <img
            src={stampImage}
            alt="stamp preview"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        ) : (
          <label
            htmlFor="stamp-upload-input"
            style={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i
              className="fa-solid fa-cloud-arrow-up"
              style={{ fontSize: 64, color: '#1976d2', marginBottom: 12 }}
            ></i>
            <span style={{ fontSize: 20, color: '#222', fontWeight: 500 }}>{t('Upload')}</span>
          </label>
        )}
      </div>
      {stampImage && (
        <button
          type="button"
          onClick={() => setStampImage('')}
          style={{
            color: '#e53935',
            background: 'none',
            border: 'none',
            fontSize: 16,
            cursor: 'pointer',
            marginBottom: 8,
          }}
        >
          {t('Remove')}
        </button>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#e3e8f0',
            color: '#222',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {t('Cancel')}
        </button>
        <button
          type="button"
          onClick={() => onSave && onSave(stampImage)}
          style={{
            background: 'linear-gradient(90deg,#1976d2 0%,#42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          disabled={!stampImage}
        >
          {t('Save')}
        </button>
      </div>
    </div>
  );
};

export default StampDialog;
