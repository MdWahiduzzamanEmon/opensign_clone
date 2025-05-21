import React, { useEffect, useState } from 'react';
// import ModalUi from '../../primitives/ModalUi';
import '../../assets/css/AddUser.css';
import RegexParser from 'regex-parser';
// import { textInputWidget, textWidget } from '../../constant/Utils';
// import { fontColorArr, fontsizeArr } from '../../constant/Utils';
import { useTranslation } from 'react-i18next';
import { fontColorArr, fontsizeArr, textInputWidget, textWidget } from '../../../config';
import { signatureTypes } from '../../../constant/constant';
import ModalUi from '../../../ui-component/ModalUi';

// Remove legacy modal/dialog files after migration
// These files are now modularized and imported from their new locations.
// Safe to delete.

const WidgetNameModal = (props) => {
  const { t } = useTranslation();
  const signTypes = props?.signatureType || signatureTypes;
  const [formdata, setFormdata] = useState({
    name: '',
    defaultValue: '',
    status: 'required',
    hint: '',
    textvalidate: '',
    isReadOnly: false,
  });
  const [isValid, setIsValid] = useState(true);
  const statusArr = ['Required', 'Optional'];
  const [signatureType, setSignatureType] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (props.defaultdata) {
      setFormdata({
        name: props.defaultdata?.options?.name || '',
        defaultValue: props.defaultdata?.options?.defaultValue || '',
        status: props.defaultdata?.options?.status || 'required',
        hint:
          props.defaultdata?.options?.hint ||
          (props.defaultdata?.type === textInputWidget
            ? 'Enter text'
            : `Enter ${props.defaultdata?.options?.name}`),
        textvalidate:
          props.defaultdata?.options?.validation?.type === 'regex'
            ? props.defaultdata?.options?.validation?.pattern
            : props.defaultdata?.options?.validation?.type || '',
        isReadOnly: props.defaultdata?.options?.isReadOnly || false,
      });
    } else {
      setFormdata({
        ...formdata,
        name: props.defaultdata?.options?.name || '',
      });
    }

    if (signTypes.length > 0) {
      const defaultSignatureType = signTypes || [];
      setSignatureType(defaultSignatureType);
    }
    // eslint-disable-next-line
  }, [props.defaultdata]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.handleData) {
      if (['signature', 'initials'].includes(props.defaultdata?.type)) {
        const enabledSignTypes = signatureType?.filter((x) => x.enabled);
        const isDefaultSignTypeOnly =
          enabledSignTypes?.length === 1 && enabledSignTypes[0]?.name === 'default';
        if (enabledSignTypes.length === 0) {
          setNotification(t('at-least-one-signature-type'));
          return;
        } else if (isDefaultSignTypeOnly) {
          setNotification(t('expect-default-one-more-signature-type'));
          return;
        } else {
          setNotification('');
          const data = { ...formdata, signatureType };
          props.handleData(data, props.defaultdata?.type);
        }
      } else {
        setNotification('');
        props.handleData(formdata);
      }
      setFormdata({
        isReadOnly: false,
        name: '',
        defaultValue: '',
        status: 'required',
        hint: '',
        textvalidate: '',
      });
      setSignatureType(signTypes);
    }
  };
  const handleChange = (e) => {
    if (e) {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    } else {
      setFormdata({ ...formdata, textvalidate: '' });
    }
  };

  const handledefaultChange = (e) => {
    if (formdata.textvalidate) {
      const regexObject = RegexParser(handleValidation(formdata.textvalidate));
      const isValidate = regexObject?.test(e.target.value);
      setIsValid(isValidate);
    } else {
      setIsValid(true);
    }
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  function handleValidation(type) {
    switch (type) {
      case 'email':
        return '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/';
      case 'number':
        return '/^\\d+$/';
      case 'text':
        return '/^[a-zA-Zs]+$/';
      default:
        return type;
    }
  }

  const handleCheckboxChange = (index) => {
    // Update the state with the modified array
    setSignatureType((prev) =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item)),
    );
  };
  return (
    <ModalUi
      isOpen={props.isOpen}
      handleClose={props.handleClose && props.handleClose}
      title={
        ['signature', 'initials'].includes(props.defaultdata?.type)
          ? t('signature-setting')
          : t('widget-info')
      }
    >
      <div
        style={{
          background: '#f8fafc',
          borderRadius: 16,
          boxShadow: '0 2px 16px 0 rgba(16,32,72,0.08)',
          padding: 24,
          maxWidth: 420,
          margin: '0 auto',
        }}
      >
        {notification && (
          <div
            style={{
              background: '#e3f2fd',
              color: '#0d47a1',
              padding: '12px 18px',
              borderRadius: '8px',
              marginBottom: '18px',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: 15,
              boxShadow: '0 1px 4px 0 #90caf9',
            }}
          >
            {notification}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Render different UI for each widget type */}
          {(() => {
            switch (props.defaultdata?.type) {
              case 'signature':
              case 'initials':
                return (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 18,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg,#1976d2 0%,#42a5f5 100%)',
                          color: '#fff',
                          fontSize: 22,
                          boxShadow: '0 2px 8px 0 rgba(25,118,210,0.10)',
                        }}
                      >
                        <i className="fas fa-pen-nib" aria-hidden="true" />
                      </span>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 20,
                          color: '#222',
                        }}
                      >
                        {props.defaultdata?.type === 'signature'
                          ? t('Signature Field')
                          : t('Initials Field')}
                      </div>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: 15,
                          marginBottom: 8,
                        }}
                      >
                        {t('Allowed Signature Types')}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {signatureType.map((type, idx) => (
                          <button
                            key={type.name}
                            type="button"
                            onClick={() => handleCheckboxChange(idx)}
                            style={{
                              border: 'none',
                              outline: 'none',
                              borderRadius: 20,
                              padding: '8px 18px',
                              fontWeight: 600,
                              fontSize: 15,
                              background: type.enabled
                                ? 'linear-gradient(90deg,#1976d2 0%,#42a5f5 100%)'
                                : '#e3e8f0',
                              color: type.enabled ? '#fff' : '#222',
                              boxShadow: type.enabled
                                ? '0 2px 8px 0 rgba(25,118,210,0.10)'
                                : 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                            }}
                            aria-pressed={type.enabled}
                          >
                            {t(type.label || type.name)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{
                          fontWeight: 500,
                          fontSize: 14,
                          marginBottom: 4,
                        }}
                      >
                        {t('Field Label')} <span style={{ color: '#e53935' }}>*</span>
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                  </>
                );
              case 'text':
              case 'text_input':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('name')} <span style={{ color: '#e53935' }}>*</span>
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('default-value')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                      />
                    </div>
                  </>
                );
              case 'checkbox':
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label
                      htmlFor="name"
                      style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                    >
                      {t('Checkbox Label')}
                    </label>
                    <input
                      style={{
                        border: '1.5px solid #b0b8d1',
                        borderRadius: 8,
                        padding: '10px 14px',
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
                );
              case 'dropdown':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Dropdown Label')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Dropdown Options (comma separated)')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                      />
                    </div>
                  </>
                );
              case 'radio_button':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Radio Group Label')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Radio Options (comma separated)')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                      />
                    </div>
                  </>
                );
              case 'date':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Date Label')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Date Format')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                      />
                    </div>
                  </>
                );
              case 'image':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Image Label')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Image URL')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                      />
                    </div>
                  </>
                );
              case 'email':
                return (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="name"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Email Label')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label
                        htmlFor="defaultValue"
                        style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                      >
                        {t('Email')}
                      </label>
                      <input
                        style={{
                          border: '1.5px solid #b0b8d1',
                          borderRadius: 8,
                          padding: '10px 14px',
                          fontSize: 15,
                          background: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        className="focus:border-[#1976d2] hover:border-[#1976d2]"
                        name="defaultValue"
                        value={formdata.defaultValue}
                        onChange={handledefaultChange}
                        autoComplete="off"
                        type="email"
                      />
                    </div>
                  </>
                );
              default:
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label
                      htmlFor="name"
                      style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}
                    >
                      {t('name')} <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <input
                      style={{
                        border: '1.5px solid #b0b8d1',
                        borderRadius: 8,
                        padding: '10px 14px',
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
                );
            }
          })()}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,#1976d2 0%,#42a5f5 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontWeight: 700,
              fontSize: 16,
              marginTop: 8,
              boxShadow: '0 2px 8px 0 rgba(25,118,210,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {t('save')}
          </button>
        </form>
      </div>
    </ModalUi>
  );
};

export default WidgetNameModal;
