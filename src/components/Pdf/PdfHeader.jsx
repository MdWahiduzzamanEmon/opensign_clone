import React, { useRef, useState } from 'react';
import '../../assets/css/signature.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useTranslation } from 'react-i18next';
import { PDFDocument } from 'pdf-lib';
import { base64ToArrayBuffer, deletePdfPage, handleRemoveWidgets } from '../../constant/constant';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import PrevNext from './PrevNext';
import { isMobile, maxFileSize } from '../../config';
import CButton from '../../ui-component/CButton/CButton';
import {
  Award,
  AwardIcon,
  Delete,
  DownloadIcon,
  PrinterIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';
import {
  Add,
  ArrowBack,
  Email,
  MoreVert,
  Print,
  RotateLeft,
  RotateRight,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

function Header(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const filterPrefill =
    props?.signerPos && props?.signerPos?.filter((data) => data.Role !== 'prefill');
  const [isDownloading, setIsDownloading] = useState('');
  const [isDeletePage, setIsDeletePage] = useState(false);
  const mergePdfInputRef = useRef(null);
  const enabledBackBtn = props?.disabledBackBtn === true ? false : true;
  //function for show decline alert
  const handleDeclinePdfAlert = async () => {
    const currentDecline = { currnt: 'Sure', isDeclined: true };
    props?.setIsDecline(currentDecline);
  };
  const handleDetelePage = async () => {
    props?.setIsUploadPdf && props?.setIsUploadPdf(true);
    const pdfupdatedData = await deletePdfPage(props?.pdfArrayBuffer, props?.pageNumber);
    if (pdfupdatedData?.totalPages === 1) {
      alert(t('delete-alert'));
    } else {
      props?.setPdfBase64Url(pdfupdatedData.base64);
      props?.setPdfArrayBuffer(pdfupdatedData.arrayBuffer);
      setIsDeletePage(false);
      handleRemoveWidgets(props?.setSignerPos, props?.signerPos, props?.pageNumber);
    }
  };

  // `removeFile` is used to  remove file if exists
  const removeFile = (e) => {
    if (e) {
      e.target.value = '';
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Please upload a valid PDF file.');
      return;
    }
    if (!file.type.includes('pdf')) {
      alert('Only PDF files are allowed.');
      return;
    }

    const mb = Math.round(file?.size / Math.pow(1024, 2));
    if (mb > maxFileSize) {
      alert(`${t('file-alert-1')} ${maxFileSize} MB`);
      removeFile(e);
      return;
    }
    try {
      const uploadedPdfBytes = await file.arrayBuffer();
      const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes, {
        ignoreEncryption: true,
      });
      const basePdfDoc = await PDFDocument.load(props.pdfArrayBuffer);

      // Copy pages from the uploaded PDF to the base PDF
      const uploadedPdfPages = await basePdfDoc.copyPages(
        uploadedPdfDoc,
        uploadedPdfDoc.getPageIndices(),
      );
      uploadedPdfPages.forEach((page) => basePdfDoc.addPage(page));
      // Save the updated PDF
      const pdfBase64 = await basePdfDoc.saveAsBase64({
        useObjectStreams: false,
      });
      const pdfBuffer = base64ToArrayBuffer(pdfBase64);
      props.setPdfArrayBuffer(pdfBuffer);
      props.setPdfBase64Url(pdfBase64);
      props.setIsUploadPdf && props.setIsUploadPdf(true);
      mergePdfInputRef.current.value = '';
    } catch (error) {
      mergePdfInputRef.current.value = '';
      console.error('Error merging PDF:', error);
    }
  };

  // console.log('props', isMobile && props?.isShowHeader);

  return (
    <Box mb={2} px={1}>
      {isMobile && props?.isShowHeader ? (
        <Box id="navbar">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px 10px',
            }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>

            {/* Replace with your component */}
            <PrevNext
              pageNumber={props?.pageNumber}
              allPages={props?.allPages}
              changePage={props?.changePage}
            />

            <IconButton onClick={openMenu}>
              <MoreVert />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <MenuItem
                onClick={() => {
                  /* handleDownload */
                }}
              >
                <DownloadIcon sx={{ mr: 1 }} />
                Download
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* handleToPrint */
                }}
              >
                <Print sx={{ mr: 1 }} />
                Print
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* props?.setIsEmail(true) */
                }}
              >
                <Email sx={{ mr: 1 }} />
                Email
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* rotate */
                }}
              >
                <RotateRight sx={{ mr: 1 }} />
                Rotate Right
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* rotate */
                }}
              >
                <RotateLeft sx={{ mr: 1 }} />
                Rotate Left
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* zoom in */
                }}
              >
                <ZoomInIcon sx={{ mr: 1 }} />
                Zoom In
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* zoom out */
                }}
              >
                <ZoomOutIcon sx={{ mr: 1 }} />
                Zoom Out
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* add pages */
                }}
              >
                <Add sx={{ mr: 1 }} />
                Add Pages
              </MenuItem>
              <MenuItem
                onClick={() => {
                  /* delete page */
                }}
              >
                <Delete sx={{ mr: 1 }} />
                Delete Page
              </MenuItem>
              {props?.isCompleted && (
                <MenuItem
                  onClick={() => {
                    /* certificate download */
                  }}
                >
                  <Award sx={{ mr: 1 }} />
                  Certificate
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 1,
          }}
        >
          <PrevNext
            pageNumber={props?.pageNumber}
            allPages={props?.allPages}
            changePage={props?.changePage}
          />

          {props?.isCompleted ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <CButton
                variant="contained"
                color="secondary"
                onClick={() => {
                  /* download cert */
                }}
                startIcon={<AwardIcon />}
              >
                Certificate
              </CButton>
              <CButton
                variant="outlined"
                onClick={() => {
                  /* print */
                }}
                startIcon={<PrinterIcon />}
              >
                Print
              </CButton>
              <CButton
                variant="contained"
                color="primary"
                onClick={() => {
                  /* download */
                }}
                startIcon={<DownloadIcon />}
              >
                Download
              </CButton>
              <CButton
                variant="contained"
                color="info"
                onClick={() => {
                  /* email */
                }}
                startIcon={<Email />}
              >
                Mail
              </CButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <CButton
                variant="outlined"
                size="small"
                onClick={() => {
                  navigate(-1);
                  props?.setIsDecline(false);
                }}
                label={t('back')}
              />
              <CButton
                variant="contained"
                size="small"
                color="primary"
                onClick={() => props?.embedWidgetsData()}
                label={'next'}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Header;
