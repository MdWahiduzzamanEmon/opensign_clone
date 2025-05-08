import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Stack,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool } from 'lucide-react';
// import Parse from 'parse';
// import { SaveFileSize } from '../constant/saveFileSize';
import { useTranslation } from 'react-i18next';
import { getSecureUrl, toDataUrl } from '../../../constant/Utils';
import sanitizeFileName from '../../../primitives/sanitizeFileName';
import MainCard from 'ui-component/cards/MainCard';
import CButton from '../../../ui-component/CButton/CButton';
import { generateTitleFromFilename } from '../../../constant/constant';

const ManageSign = () => {
  const { t } = useTranslation();
  const [penColor, setPenColor] = useState('blue');
  const [initialPen, setInitialPen] = useState('blue');
  const [image, setImage] = useState('');
  const [signName, setSignName] = useState('');
  const [signature, setSignature] = useState('');
  const [warning, setWarning] = useState(false);
  const [isvalue, setIsValue] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(null);
  const [initials, setInitials] = useState('');
  const [imgInitials, setImgInitials] = useState('');
  const [isInitials, setIsInitials] = useState(false);
  const [id, setId] = useState('');

  const allColor = ['blue', 'red', 'black'];

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const initailsRef = useRef(null);
  const imgInitialsRef = useRef(null);

  // useEffect(() => {
  //   fetchUserSign();
  // }, []);

  // const fetchUserSign = async () => {
  //   const User = Parse.User.current();
  //   if (User) {
  //     try {
  //       const userId = {
  //         __type: 'Pointer',
  //         className: '_User',
  //         objectId: User.id,
  //       };
  //       const signQuery = new Parse.Query('contracts_Signature');
  //       signQuery.equalTo('UserId', userId);
  //       const signRes = await signQuery.first();
  //       if (signRes) {
  //         const res = signRes.toJSON();
  //         setId(res.objectId);
  //         if (res.SignatureName) {
  //           const name = sanitizeFileName(generateTitleFromFilename(res.SignatureName));
  //           setSignName(name);
  //         }
  //         if (res.ImageURL) setImage(res.ImageURL);
  //         if (res.Initials) {
  //           setImgInitials(res.Initials);
  //           setIsInitials(true);
  //         }
  //       } else if (User.get('name')) {
  //         const name = sanitizeFileName(generateTitleFromFilename(User.get('name')));
  //         setSignName(name);
  //       }
  //     } catch (err) {
  //       alert(err.message);
  //     } finally {
  //       setLoader(false);
  //     }
  //   }
  // };

  const base64StringtoFile = (base64String, filename) => {
    let [meta, content] = base64String.split(',');
    const mime = meta.match(/:(.*?);/)[1];
    const ext = mime.split('/').pop();
    const bstr = atob(content);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new File([u8arr], `${filename}.${ext}`, { type: mime });
  };

  const uploadFile = async (file) => {
    // try {
    //   const parseFile = new Parse.File(file.name, file);
    //   const response = await parseFile.save();
    //   const secure = await getSecureUrl(response?.url());
    //   if (secure?.url) {
    //     const tenantId = localStorage.getItem('TenantId');
    //     // SaveFileSize(file.size, secure.url, tenantId);
    //     return secure.url;
    //   }
    //   throw new Error(t('something-went-wrong-mssg'));
    // } catch (err) {
    //   setLoader(false);
    //   alert(err.message);
    //   return null;
    // }
  };

  const handleSignatureChange = () => {
    if (imageRef.current) imageRef.current.value = '';
    setImage('');
    setSignature(canvasRef.current.toDataURL());
    setIsValue(true);
  };

  const handleInitialsChange = () => {
    setInitials(initailsRef.current.toDataURL());
    setIsValue(true);
  };

  const handleClear = () => {
    canvasRef.current?.clear();
    imageRef.current.value = '';
    setImage('');
    setSignature('');
    setIsValue(false);
  };

  const handleClearInitials = () => {
    initailsRef.current?.clear();
    imgInitialsRef.current.value = '';
    setInitials('');
    setImgInitials('');
    setIsInitials(false);
    if (image) setIsValue(true);
  };

  const onImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      canvasRef.current?.clear();
      setSignature('');
      const base64 = await toDataUrl(file);
      setImage(base64);
      setIsValue(true);
    }
  };

  const onImgInitialsChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      initailsRef.current?.clear();
      setInitials('');
      const base64 = await toDataUrl(file);
      setImgInitials(base64);
      setIsValue(true);
    }
  };

  const handleSubmit = async () => {
    if (!isvalue) {
      setWarning(true);
      setTimeout(() => setWarning(false), 1000);
      return;
    }
    setLoader(true);
    const name = sanitizeFileName(generateTitleFromFilename(signName));
    let file = signature
      ? base64StringtoFile(signature, name)
      : image?.startsWith('data')
        ? base64StringtoFile(image, name)
        : null;
    let initialsFile = initials
      ? base64StringtoFile(initials, name)
      : imgInitials?.startsWith('data')
        ? base64StringtoFile(imgInitials, name)
        : null;

    const [imgUrl, initialsUrl] = await Promise.all([
      file ? uploadFile(file) : image,
      initialsFile ? uploadFile(initialsFile) : imgInitials,
    ]);

    // const obj = new Parse.Object('contracts_Signature');
    // if (id) obj.id = id;
    // obj.set('ImageURL', imgUrl);
    // obj.set('Initials', initialsUrl);
    // obj.set('SignatureName', name);
    // obj.set('UserId', {
    //   __type: 'Pointer',
    //   className: '_User',
    //   objectId: Parse.User.current().id,
    // });

    // try {
    //   await obj.save();
    //   setAlert({ type: 'success', message: t('signature-saved-alert') });
    // } catch (err) {
    //   setAlert({ type: 'error', message: err.message });
    // } finally {
    //   setLoader(false);
    //   setTimeout(() => setAlert(null), 3000);
    // }
  };

  return (
    <MainCard title={t('my-signature')}>
      {/* <Typography variant="h5" gutterBottom>
        {t('my-signature')}
      </Typography> */}
      {loader && <CircularProgress />}
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}

      <Grid
        container
        spacing={3}
        sx={{
          width: {
            xs: '100%',
            md: '80%',
          },
        }}
      >
        {/* Signature */}
        <Grid item xs={12} md={8}>
          <Box display="flex" gap={1} justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{t('signature')}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              {!image && (
                <Stack direction="row" spacing={1}>
                  {allColor?.map((color, index) => (
                    <IconButton
                      key={color}
                      onClick={() => setPenColor(color)}
                      sx={{
                        borderBottom:
                          penColor === color ? `2px solid ${color}` : '2px solid transparent',
                        color: color,
                      }}
                    >
                      <PenTool size={15} />
                    </IconButton>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
          <input type="file" hidden ref={imageRef} accept="image/*" onChange={onImageChange} />
          {image ? (
            <Box border={1} p={1} mt={1}>
              <img src={image} alt="signature" style={{ width: '100%' }} />
            </Box>
          ) : (
            <>
              <SignatureCanvas
                ref={canvasRef}
                penColor={penColor}
                canvasProps={{ className: 'sigCanvas' }}
                onEnd={handleSignatureChange}
                dotSize={1}
              />
            </>
          )}
          <Box display="flex" gap={1} justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={1}>
              <IconButton onClick={() => imageRef.current.click()}>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  Upload
                </Typography>
              </IconButton>
              <IconButton onClick={handleClear} color="error">
                {/* <DeleteIcon fontSize="small" /> */}
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  Clear
                </Typography>
              </IconButton>
            </Box>
          </Box>
          {warning && <Alert severity="warning">{t('upload-signature/Image')}</Alert>}
        </Grid>

        {/* Initials */}
        <Grid item xs={10} md={4}>
          <Box display="flex" gap={1} justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{t('initials')}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              {!imgInitials && (
                <Stack direction="row" spacing={1}>
                  {allColor?.map((color, index) => (
                    <IconButton
                      key={color}
                      onClick={() => setInitialPen(color)}
                      sx={{
                        borderBottom:
                          initialPen === color ? `2px solid ${color}` : '2px solid transparent',
                        color: color,
                      }}
                    >
                      <PenTool size={15} />
                    </IconButton>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
          <input
            type="file"
            hidden
            ref={imgInitialsRef}
            accept="image/*"
            onChange={onImgInitialsChange}
          />
          {imgInitials ? (
            <Box border={1} p={1} mt={1}>
              <img src={imgInitials} alt="initials" style={{ width: '100%' }} />
            </Box>
          ) : (
            <SignatureCanvas
              ref={initailsRef}
              penColor={initialPen}
              canvasProps={{ className: 'sigCanvas' }}
              onEnd={handleInitialsChange}
              dotSize={1}
            />
          )}
          <Box display="flex" gap={1} justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={1}>
              <IconButton onClick={() => imgInitialsRef.current.click()}>
                {/* <UploadFileIcon fontSize="small" /> */}
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  Upload
                </Typography>
              </IconButton>
              <IconButton onClick={handleClearInitials} color="error">
                {/* <DeleteIcon fontSize="small" /> */}
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  Clear
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box mt={3}>
        {/* <Button variant="contained" size="small" color="secondary" onClick={handleSubmit}>
          {t('save')}
        </Button> */}
        <CButton label={t('save')} onClick={handleSubmit} />
      </Box>
    </MainCard>
  );
};

export default ManageSign;
