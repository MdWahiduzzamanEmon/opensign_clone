import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import { PDFDocument } from 'pdf-lib';
import { maxFileSize } from '../../config';
import { base64ToArrayBuffer, deletePdfPage, handleRemoveWidgets } from '../../constant/constant';

function PdfZoom(props) {
  const { t } = useTranslation();
  const mergePdfInputRef = useRef(null);
  const [isDeletePage, setIsDeletePage] = useState(false);

  const handleDetelePage = async () => {
    props.setIsUploadPdf?.(true);
    try {
      const pdfupdatedData = await deletePdfPage(props.pdfArrayBuffer, props.pageNumber);
      if (pdfupdatedData?.totalPages === 1) {
        alert(t('delete-alert'));
      } else {
        props.setPdfBase64Url(pdfupdatedData.base64);
        props.setPdfArrayBuffer(pdfupdatedData.arrayBuffer);
        setIsDeletePage(false);
        handleRemoveWidgets(props.setSignerPos, props.signerPos, props.pageNumber);
        props.setAllPages(pdfupdatedData.remainingPages || 1);
        if (props.allPages === props.pageNumber) {
          props.setPageNumber(props.pageNumber - 1);
        } else if (props.allPages > 2) {
          props.setPageNumber(props.pageNumber);
        }
      }
    } catch (e) {
      console.error('Error in delete pdf page', e);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.includes('pdf')) {
      alert('Only PDF files are allowed.');
      return;
    }
    const mb = Math.round(file.size / 1024 / 1024);
    if (mb > maxFileSize) {
      alert(`${t('file-alert-1')} ${maxFileSize} MB`);
      e.target.value = '';
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
      props.setIsUploadPdf?.(true);
      mergePdfInputRef.current.value = '';
    } catch (error) {
      mergePdfInputRef.current.value = '';
      console.error('Error merging PDF:', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ mt: 5, width: 'fit-content' }}
    >
      {!props.isDisableEditTools && (
        <>
          <Tooltip title={t('add-pages')}>
            <IconButton onClick={() => mergePdfInputRef.current.click()} size="small">
              <AddIcon fontSize="medium" />
              <input
                type="file"
                hidden
                accept="application/pdf"
                ref={mergePdfInputRef}
                onChange={handleFileUpload}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('delete-page')}>
            <IconButton onClick={() => handleDetelePage()} size="small">
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title={t('zoom-in')}>
        <IconButton onClick={props.clickOnZoomIn} size="small">
          <ZoomInIcon fontSize="medium" />
        </IconButton>
      </Tooltip>

      {!props.isDisableEditTools && (
        <>
          <Tooltip title={t('rotate-right')}>
            <IconButton onClick={() => props.handleRotationFun(90)} size="small">
              <RotateRightIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('rotate-left')}>
            <IconButton onClick={() => props.handleRotationFun(-90)} size="small">
              <RotateLeftIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title={t('zoom-out')}>
        <IconButton onClick={props.clickOnZoomOut} size="small" disabled={props.zoomPercent <= 0}>
          <ZoomOutIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default PdfZoom;
