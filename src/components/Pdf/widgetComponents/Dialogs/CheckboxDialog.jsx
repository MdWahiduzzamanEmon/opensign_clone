import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CheckboxDialog = ({
  open,
  onClose,
  onSave,
  initialData = {},
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
}) => {
  const { t } = useTranslation();
  const [formdata, setFormdata] = useState({
    name: initialData.name || '',
    options: initialData.options || [''],
    hideLabels: initialData.hideLabels || false,
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: open ? 'block' : 'none',
        maxWidth: 600, // increased max width for the dialog
        width: '100%',
        margin: '0 auto',
        padding: 16, // add a bit of padding to the dialog container
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>{t('Checkbox')}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="name" style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>
          {t('Name')} <span style={{ color: '#e53935' }}>*</span>
        </label>
        <input
          style={{
            border: '1.5px solid #b0b8d1',
            borderRadius: 8,
            padding: '6px 10px', // reduced padding
            fontSize: 15,
            background: '#fff',
            outline: 'none',
            transition: 'border 0.2s',
          }}
          className="focus:border-[#1976d2] hover:border-[#1976d2]"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ fontWeight: 500, fontSize: 15, margin: '12px 0 6px 0' }}>{t('Options')}</div>
      {(formdata.options || []).map((opt, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <input
            style={{
              border: '1.5px solid #b0b8d1',
              borderRadius: 20,
              padding: '6px 10px', // reduced padding
              fontSize: 15,
              background: '#fff',
              outline: 'none',
              flex: 1,
            }}
            value={opt}
            onChange={(e) => {
              const newOptions = [...formdata.options];
              newOptions[idx] = e.target.value;
              setFormdata({ ...formdata, options: newOptions });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newOptions = formdata.options.filter((_, i) => i !== idx);
              setFormdata({ ...formdata, options: newOptions });
            }}
            style={{
              color: '#e53935',
              border: 'none',
              background: 'none',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setFormdata({ ...formdata, options: [...(formdata.options || []), ''] })}
        style={{
          border: '1.5px solid #1976d2',
          borderRadius: 8,
          background: '#fff',
          color: '#1976d2',
          fontSize: 22,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        +
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0' }}>
        <div>
          <label style={{ fontWeight: 500 }}>{t('Font size')} :</label>
          <select
            value={fontSize || 12}
            onChange={(e) => setFontSize && setFontSize(Number(e.target.value))}
            style={{ marginLeft: 6 }}
          >
            {[10, 12, 14, 16, 18, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontWeight: 500 }}>{t('color')} :</label>
          <select
            value={fontColor || 'black'}
            onChange={(e) => setFontColor && setFontColor(e.target.value)}
            style={{ marginLeft: 6 }}
          >
            {['black', 'red', 'blue', 'green'].map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <span
            style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              background: fontColor || 'black',
              border: '1px solid #b0b8d1',
              borderRadius: 4,
              marginLeft: 6,
            }}
          />
        </div>
      </div>
      <div style={{ margin: '8px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={formdata.hideLabels || false}
            onChange={(e) => setFormdata({ ...formdata, hideLabels: e.target.checked })}
          />
          {t('Hide labels')}
        </label>
      </div>
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
          onClick={() => onSave && onSave(formdata)}
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
        >
          {t('Save')}
        </button>
      </div>
    </div>
  );
};

export default CheckboxDialog;
