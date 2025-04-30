import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page } from 'react-pdf';
// import { useSelector } from 'react-redux';
import { PDFDocument } from 'pdf-lib';

import { Box, Typography, Divider, Button, useTheme, Paper, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { base64ToArrayBuffer } from '../../../constant/constant';
import { maxFileSize } from '../../../config';

function RenderAllPdfPage(props) {
  const { t } = useTranslation();
  const pageContainer = useRef();
  const mergePdfInputRef = useRef(null);
  const [signPageNumber, setSignPageNumber] = useState([]);
  const [bookmarkColor, setBookmarkColor] = useState('');
  //   const isHeader = useSelector((state) => state.showHeader);
  const [pageWidth, setPageWidth] = useState('');
  const theme = useTheme();

  function onDocumentLoad({ numPages }) {
    props?.setAllPages(numPages);
    if (props?.signerPos) {
      const checkUser = props?.signerPos.filter((data) => data.Id === props?.id);
      setBookmarkColor(checkUser[0]?.blockColor);
      let pageNumberArr = [];
      if (checkUser?.length > 0) {
        checkUser[0]?.placeHolder?.forEach((data) => {
          pageNumberArr.push(data?.pageNumber);
        });
        setSignPageNumber(pageNumberArr);
      }
    }
  }

  useEffect(() => {
    const updateSize = () => {
      if (pageContainer.current) {
        setPageWidth(pageContainer.current.offsetWidth);
      }
    };
    const timer = setTimeout(updateSize, 100);
    return () => clearTimeout(timer);
  }, [props?.containerWH]);

  const addSignatureBookmark = (index) => {
    const isPageNumber = signPageNumber.includes(index + 1);
    return (
      isPageNumber && (
        <BookmarkIcon
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: bookmarkColor || theme.palette.error.main,
            zIndex: 10,
          }}
        />
      )
    );
  };

  const removeFile = (e) => {
    if (e) e.target.value = '';
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert('Please upload a valid PDF file.');
    if (!file.type.includes('pdf')) return alert('Only PDF files are allowed.');

    const mb = Math.round(file?.size / Math.pow(1024, 2));
    if (mb > maxFileSize) {
      alert(`${t('file-alert-1')} ${maxFileSize} MB`);
      removeFile(e);
      return;
    }

    try {
      const uploadedPdfBytes = await file.arrayBuffer();
      const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes, { ignoreEncryption: true });
      const basePdfDoc = await PDFDocument.load(props.pdfArrayBuffer);

      const uploadedPdfPages = await basePdfDoc.copyPages(
        uploadedPdfDoc,
        uploadedPdfDoc.getPageIndices(),
      );
      uploadedPdfPages.forEach((page) => basePdfDoc.addPage(page));

      const pdfBase64 = await basePdfDoc.saveAsBase64({ useObjectStreams: false });
      const pdfBuffer = base64ToArrayBuffer(pdfBase64);
      props.setPdfArrayBuffer(pdfBuffer);
      props.setPdfBase64Url(pdfBase64);
      props.setIsUploadPdf && props.setIsUploadPdf(true);
      mergePdfInputRef.current.value = '';
    } catch (error) {
      console.error('Error merging PDF:', error);
      mergePdfInputRef.current.value = '';
    }
  };

  const pdfDataBase64 = `data:application/pdf;base64,${props?.pdfBase64Url}`;

  return (
    <Box
      ref={pageContainer}
      sx={{
        display: { xs: 'none', md: 'block' },
        width: '20%',
        backgroundColor: 'background.paper',
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t('pages')}
        </Typography>
        <Divider />
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Document file={pdfDataBase64} loading={t('loading-doc')} onLoadSuccess={onDocumentLoad}>
          {Array.from(new Array(props?.allPages), (el, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                border: props?.pageNumber - 1 === index ? '2px solid red' : `2px solid #878787`,
                position: 'relative',
                p: 0.5,
                my: 1,
                cursor: 'pointer',
              }}
              onClick={() => {
                props?.setPageNumber(index + 1);
                props?.setSignBtnPosition?.([]);
              }}
            >
              {props?.signerPos && addSignatureBookmark(index)}
              <Page
                pageNumber={index + 1}
                width={pageWidth - 60}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Paper>
          ))}
        </Document>

        {props?.isMergePdfBtn && (
          <>
            <input
              type="file"
              accept="application/pdf"
              ref={mergePdfInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              onClick={() => mergePdfInputRef.current.click()}
              title={t('add-pages')}
            >
              {t('add-pages')}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default RenderAllPdfPage;
