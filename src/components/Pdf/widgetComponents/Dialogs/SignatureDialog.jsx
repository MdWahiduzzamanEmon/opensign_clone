// Use globalThis for setTimeout/clearTimeout to avoid SSR/test errors
const setTimeoutFn =
  typeof globalThis.setTimeout !== 'undefined' ? globalThis.setTimeout : (fn, ms) => fn();
const clearTimeoutFn =
  typeof globalThis.clearTimeout !== 'undefined' ? globalThis.clearTimeout : () => {};

// ...existing code from previous SignatureDialog.jsx...
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, Typography, IconButton, Stack } from '@mui/material';
import { PenTool } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSignature as setSignatureRedux } from '../../../../store/signatureSlice';

if (!globalThis.FileReader) {
  globalThis.FileReader = class {
    readAsDataURL() {}
    set onload(_) {}
    set onerror(_) {}
  };
}

const allColor = ['blue', 'red', 'black'];

const SignatureDialog = ({ open, onClose, onSave }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('draw');
  const [penColor, setPenColor] = useState('blue');
  const [signature, setSignature] = useState('');
  const [image, setImage] = useState('');
  const [typed, setTyped] = useState('');
  const [pendingClose, setPendingClose] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Ensure signature preview updates on tab change
  const handleTabChange = (t) => {
    setTab(t);
    if (t !== 'draw') setSignature('');
    if (t !== 'upload') setImage('');
    if (t !== 'type') setTyped('');
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    setSignature('');
  };

  const handleSave = () => {
    if (tab === 'draw') {
      const dataUrl = canvasRef.current?.toDataURL();
      setSignature(dataUrl);
      dispatch(setSignatureRedux({ signature: dataUrl, signatureType: 'draw' }));
      onSave && onSave({ value: dataUrl, type: 'draw' });
      setPendingClose(true);
      return;
    } else if (tab === 'upload') {
      dispatch(setSignatureRedux({ signature: image, signatureType: 'upload' }));
      onSave && onSave({ value: image, type: 'upload' });
      setPendingClose(true);
      return;
    } else if (tab === 'type') {
      dispatch(setSignatureRedux({ signature: typed, signatureType: 'type' }));
      onSave && onSave({ value: typed, type: 'type' });
      setPendingClose(true);
      return;
    }
    onClose();
  };

  const onImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new globalThis.FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Close dialog only after user confirms or after a short delay
  React.useEffect(() => {
    if (pendingClose) {
      const timer = setTimeoutFn(() => {
        setPendingClose(false);
        onClose();
      }, 800);
      return () => clearTimeoutFn(timer);
    }
  }, [pendingClose, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.18)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: 'white',
          borderRadius: 4,
          minWidth: 400,
          maxWidth: 540,
          width: '90vw',
          p: 3,
          boxShadow: 6,
          position: 'relative',
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 12, right: 12 }}
          aria-label="Close"
        >
          ×
        </IconButton>
        {/* Tabs */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2, borderBottom: '1.5px solid #1e293b' }}>
          {['draw', 'upload', 'type'].map((t) => (
            <Typography
              key={t}
              onClick={() => handleTabChange(t)}
              sx={{
                fontWeight: 600,
                fontSize: 20,
                color: tab === t ? '#0a2a5c' : '#222',
                borderBottom: tab === t ? '2.5px solid #1e293b' : 'none',
                cursor: 'pointer',
                px: 1.5,
                pb: 0.5,
                transition: 'border 0.2s',
              }}
            >
              {t === 'draw' ? 'Draw' : t === 'upload' ? 'Upload image' : 'Type'}
            </Typography>
          ))}
        </Box>
        {/* Tab content */}
        {tab === 'draw' && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                border: '2px solid #1976d2',
                borderRadius: 2,
                width: '100%',
                height: 180,
                background: '#fff',
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SignatureCanvas
                ref={canvasRef}
                penColor={penColor}
                canvasProps={{
                  width: 420,
                  height: 160,
                  className: 'signatureCanvas',
                  style: { width: '100%', height: 160, background: 'white', borderRadius: 8 },
                }}
                onEnd={() => {
                  const dataUrl = canvasRef.current?.toDataURL();
                  setSignature(dataUrl);
                }}
                dotSize={1}
              />
            </Box>
            {/* Preview for drawn signature */}
            {signature && (
              <Box border={1} p={1} mt={1} sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                  Preview:
                </Typography>
                <img
                  src={signature}
                  alt="signature preview"
                  style={{ width: 220, maxHeight: 120 }}
                />
              </Box>
            )}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              {allColor.map((color) => (
                <IconButton
                  key={color}
                  onClick={() => setPenColor(color)}
                  sx={{
                    borderBottom:
                      penColor === color ? `2px solid ${color}` : '2px solid transparent',
                    color: color,
                  }}
                >
                  <PenTool size={18} />
                </IconButton>
              ))}
              <Button onClick={handleClear} color="error" sx={{ ml: 2 }}>
                Clear
              </Button>
            </Stack>
          </Box>
        )}
        {tab === 'upload' && (
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Preview for uploaded image */}
            {image && (
              <Box border={1} p={1} mt={1} sx={{ textAlign: 'center' }}>
                <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                  Preview:
                </Typography>
                <img
                  src={image}
                  alt="signature upload preview"
                  style={{ width: 220, maxHeight: 120 }}
                />
              </Box>
            )}
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              style={{ display: 'none' }}
              onChange={onImageChange}
            />
            <Button
              variant="outlined"
              onClick={() => imageRef.current.click()}
              sx={{ mb: 2, mt: 2 }}
            >
              Upload
            </Button>
          </Box>
        )}
        {tab === 'type' && (
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Signature:</Typography>
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              style={{
                fontFamily:
                  'Fasthand, Dancing Script, Delicious Handrawn, Cedarville Cursive, cursive',
                fontSize: 28,
                border: '1.5px solid #b0b8d1',
                borderRadius: 8,
                padding: '10px 14px',
                width: 260,
                textAlign: 'center',
                outline: 'none',
                marginBottom: 8,
              }}
              placeholder="Type your signature"
            />
            {/* Example font preview list */}
            <Box sx={{ width: '100%', mt: 1 }}>
              {[typed, ...[typed, typed, typed]].map((val, idx) => (
                <Box
                  key={idx}
                  sx={{
                    fontFamily: [
                      'Fasthand',
                      'Dancing Script',
                      'Delicious Handrawn',
                      'Cedarville Cursive',
                      'cursive',
                    ][idx % 4],
                    fontSize: 28,
                    color: '#1976d2',
                    mb: 0.5,
                    px: 1,
                  }}
                >
                  {val}
                </Box>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              tab === 'draw' && !signature && (!canvasRef.current || canvasRef.current.isEmpty())
            }
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SignatureDialog;
