import React, { useEffect, useState } from 'react';
// import ModalUi from '../../primitives/ModalUi';
// import '../../assets/css/AddUser.css';
import RegexParser from 'regex-parser';
// import { textInputWidget, textWidget } from '../../constant/Utils';
// import { fontColorArr, fontsizeArr } from '../../constant/Utils';
import { useTranslation } from 'react-i18next';
import { fontColorArr, fontsizeArr, textInputWidget, textWidget } from '../../../config';
import { signatureTypes } from '../../../constant/constant';
import ModalUi from '../../../ui-component/ModalUi';
import SignatureDialog from './Dialogs/SignatureDialog';
import CheckboxDialog from './Dialogs/CheckboxDialog';
import StampDialog from './Dialogs/StampDialog';
import ImageDialog from './Dialogs/ImageDialog';
import { useSelector } from 'react-redux';

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
  const [stampImage, setStampImage] = useState('');

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

  const signatureRedux = useSelector((state) => state.signature.signature);
  const signatureTypeRedux = useSelector((state) => state.signature.signatureType);

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
          props.handleData(data, signatureRedux, signatureTypeRedux);
        }
      } else {
        setNotification('');
        props.handleData(formdata, signatureRedux, signatureTypeRedux);
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

  const handleStampUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      let FileReaderClass = null;
      if (typeof globalThis !== 'undefined' && globalThis.FileReader) {
        FileReaderClass = globalThis.FileReader;
      }
      if (FileReaderClass) {
        const reader = new FileReaderClass();
        reader.onload = (ev) => setStampImage(ev.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <ModalUi
      isOpen={props.isOpen}
      reduceWidth={'420px'}
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
          //   padding: 24,
          //   maxWidth: 420,
          //   margin: '0 auto',
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
        {/* Render SignatureDialog for signature/initials, else render the form */}
        {props.defaultdata?.type === 'signature' || props.defaultdata?.type === 'initials' ? (
          <SignatureDialog
            open={props.isOpen}
            onClose={props.handleClose}
            onSave={(value) => {
              // Always pass type and value to parent for clarity
              props.handleData &&
                props.handleData(
                  { type: props.defaultdata?.type, value },
                  signatureRedux,
                  signatureTypeRedux,
                );
            }}
          />
        ) : props.defaultdata?.type === 'checkbox' ? (
          <CheckboxDialog
            open={props.isOpen}
            onClose={props.handleClose}
            onSave={(formdata) => {
              props.handleData && props.handleData(formdata, signatureRedux, signatureTypeRedux);
            }}
            initialData={props.defaultdata?.options || {}}
            fontSize={props.fontSize}
            setFontSize={props.setFontSize}
            fontColor={props.fontColor}
            setFontColor={props.setFontColor}
          />
        ) : props.defaultdata?.type === 'stamp' ? (
          <StampDialog
            open={props.isOpen}
            onClose={props.handleClose}
            onSave={(img) => {
              if (props.handleData) {
                props.handleData(
                  { ...formdata, stampImage: img },
                  signatureRedux,
                  signatureTypeRedux,
                );
              }
            }}
            initialImage={formdata.stampImage}
          />
        ) : props.defaultdata?.type === 'image' ? (
          <ImageDialog
            open={props.isOpen}
            onClose={props.handleClose}
            onSave={(img) => {
              if (props.handleData) {
                props.handleData({ ...formdata, image: img }, signatureRedux, signatureTypeRedux);
              }
            }}
            initialImage={formdata.image}
          />
        ) : (
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
                    <ImageDialog
                      open={props.isOpen}
                      onClose={props.handleClose}
                      onSave={(img) => {
                        if (props.handleData) {
                          props.handleData(
                            { ...formdata, image: img },
                            signatureRedux,
                            signatureTypeRedux,
                          );
                        }
                      }}
                      initialImage={formdata.image}
                    />
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
                case 'stamp':
                  return (
                    <StampDialog
                      open={props.isOpen}
                      onClose={props.handleClose}
                      onSave={(img) => {
                        if (props.handleData) {
                          props.handleData(
                            { ...formdata, stampImage: img },
                            signatureRedux,
                            signatureTypeRedux,
                          );
                        }
                      }}
                      initialImage={formdata.stampImage}
                    />
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
        )}
      </div>
    </ModalUi>
  );
};

export default WidgetNameModal;
