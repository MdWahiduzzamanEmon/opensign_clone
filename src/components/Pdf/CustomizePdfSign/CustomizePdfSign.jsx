/* global Blob, document, URL, FileReader, setTimeout, clearTimeout */

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { PDFDocument, rgb } from 'pdf-lib';
import Tour from 'reactour';
import '../../../assets/css/signature.css';
import RenderAllPdfPage from '../RenderAllPdfPage/RenderAllPdfPage';
import { isMobile, radioButtonWidget, textInputWidget, textWidget } from '../../../config';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

import {
  addWidgetOptions,
  defaultWidthHeight,
  getContainerScale,
  handleRotateWarning,
  onClickZoomIn,
  onClickZoomOut,
  pdfNewWidthFun,
  randomId,
  rotatePdfPage,
  signatureTypes,
} from '../../../constant/constant';
import PdfZoom from '../PdfZoom';
import { Box, Grid } from '@mui/material';
import RenderPdf from '../RenderPdf';
import Header from '../PdfHeader';
import WidgetList from '../widgetComponents/WidgetList/WidgetList';
import Canvas from '../../../TestDND/Canvas/Canvas';
import WidgetNameModal from '../widgetComponents/WidgetNameModal';

// Polyfill browser globals for SSR/test environments by defining them if not present.
// Use globalThis for compatibility. Place at the top of the file before any usage.
if (typeof globalThis !== 'undefined') {
  if (typeof globalThis.FileReader === 'undefined') globalThis.FileReader = class {};
  if (typeof globalThis.setTimeout === 'undefined') globalThis.setTimeout = function () {};
  if (typeof globalThis.clearTimeout === 'undefined') globalThis.clearTimeout = function () {};
  if (typeof globalThis.Blob === 'undefined') globalThis.Blob = class {};
  if (typeof globalThis.document === 'undefined') {
    globalThis.document = {
      createElement: () => ({ style: {}, click: () => {} }),
      body: { appendChild: () => {}, removeChild: () => {} },
    };
  }
  if (typeof globalThis.URL === 'undefined') {
    globalThis.URL = {
      createObjectURL: () => '',
      revokeObjectURL: () => {},
    };
  }
}

// Polyfill atob for SSR/Node environments
if (typeof globalThis.atob === 'undefined') {
  globalThis.atob = function (input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = String(input).replace(/=+$/, '');
    let output = '';
    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      let bc = 0, bs, buffer, idx = 0;
      (buffer = str.charAt(idx++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  };
}
var atob = typeof globalThis.atob !== 'undefined' ? globalThis.atob : undefined;

const CustomizePdfSign = () => {
  const { state } = useLocation();
  const { t } = useTranslation();
  const divRef = useRef(null);
  const [pdfLoad, setPdfLoad] = useState(false);
  const [containerWH, setContainerWH] = useState();
  const [pdfNewWidth, setPdfNewWidth] = useState();
  const [pdfOriginalWH, setPdfOriginalWH] = useState([]);
  const [pdfDetails, setPdfDetails] = useState([]);
  const [checkTourStatus, setCheckTourStatus] = useState(true);
  const [allPages, setAllPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBase64Url, setPdfBase64Url] = useState('');
  const [isUploadPdf, setIsUploadPdf] = useState(false);
  const [signBtnPosition, setSignBtnPosition] = useState([]);
  const [xySignature, setXYSignature] = useState({});
  const [dragKey, setDragKey] = useState();
  const [signersdata, setSignersData] = useState([]);
  const [signerPos, setSignerPos] = useState([]);
  const [isSelectListId, setIsSelectId] = useState();
  const [isSendAlert, setIsSendAlert] = useState({});
  const [isSend, setIsSend] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAddSigner, setIsAddSigner] = useState(false);
  const [fontSize, setFontSize] = useState();
  const [fontColor, setFontColor] = useState();
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState('');
  const [scale, setScale] = useState(1);
  const [zoomPercent, setZoomPercent] = useState(0);
  const [signerExistModal, setSignerExistModal] = useState(false);
  const [isDontShow, setIsDontShow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [widgetType, setWidgetType] = useState('');
  const [isUiLoading, setIsUiLoading] = useState(false);
  const [isRadio, setIsRadio] = useState(false);
  const [currWidgetsDetails, setCurrWidgetsDetails] = useState({});
  const [selectWidgetId, setSelectWidgetId] = useState('');
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [isNameModal, setIsNameModal] = useState(false);
  const [widgetName, setWidgetName] = useState(false);
  const [mailStatus, setMailStatus] = useState('');
  const [isCurrUser, setIsCurrUser] = useState(false);
  const [uniqueId, setUniqueId] = useState('ewqtwtw');
  const [isResize, setIsResize] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const [isPageCopy, setIsPageCopy] = useState(false);
  const [signKey, setSignKey] = useState();
  const [signatureType, setSignatureType] = useState(signatureTypes);
  const [tempSignerId, setTempSignerId] = useState('');
  const [isTextSetting, setIsTextSetting] = useState(false);
  const [owner, setOwner] = useState({});
  const [widgetPositions, setWidgetPositions] = useState([]);
  const [widget, setWidget] = useState(null);
  const [activeWidget, setActiveWidget] = useState(null);
  // const [widgets, setWidgets] = useState([]);

  const [isLoading, setIsLoading] = useState({
    isLoad: true,
    message: t('loading-mssg'),
  });

  const [showRotateAlert, setShowRotateAlert] = useState({
    status: false,
    degree: 0,
  });

  const numPages = 1;

  // Proper drop target implementation

  // const addPositionOfSignature = (item, monitor) => {
  //   const posZIndex = zIndex + 1;
  //   setZIndex(posZIndex);

  //   const key = randomId();
  //   const containerScale = getContainerScale(pdfOriginalWH, pageNumber, containerWH);
  //   const dragTypeValue = item?.text ? item.text : item.type;
  //   const widgetWidth = defaultWidthHeight(dragTypeValue).width * containerScale;
  //   const widgetHeight = defaultWidthHeight(dragTypeValue).height * containerScale;

  //   let dropObj;

  //   if (item === 'onclick') {
  //     const divHeight = divRef.current.getBoundingClientRect().height;
  //     dropObj = {
  //       key,
  //       xPosition: widgetWidth / 4 + containerWH.width / 2,
  //       yPosition: widgetHeight + divHeight / 2,
  //       pageNumber,
  //       scale: containerScale,
  //       zIndex: posZIndex,
  //       type: dragTypeValue,
  //       Width: widgetWidth / (containerScale * scale),
  //       Height: widgetHeight / (containerScale * scale),
  //     };
  //   } else {
  //     // Use the x and y coordinates from the drop event
  //     const x = item.x;
  //     const y = item.y;

  //     dropObj = {
  //       key,
  //       xPosition: x / (containerScale * scale),
  //       yPosition: y / (containerScale * scale),
  //       pageNumber,
  //       scale: containerScale,
  //       zIndex: posZIndex,
  //       type: dragTypeValue,
  //       Width: widgetWidth / (containerScale * scale),
  //       Height: widgetHeight / (containerScale * scale),
  //     };
  //   }

  //   // Update widget positions state
  //   setWidgetPositions((prev) => [...prev, dropObj]);

  //   // Update signer positions if needed
  //   const updatedSignerPos = [...signerPos];
  //   const currentSigner = updatedSignerPos.find((signer) => signer.Id === uniqueId);

  //   if (currentSigner) {
  //     const pagePlaceholder = currentSigner.placeHolder?.find((p) => p.pageNumber === pageNumber);
  //     if (pagePlaceholder) {
  //       pagePlaceholder.pos = [...(pagePlaceholder.pos || []), dropObj];
  //     } else {
  //       currentSigner.placeHolder = [
  //         ...(currentSigner.placeHolder || []),
  //         {
  //           pageNumber,
  //           pos: [dropObj],
  //         },
  //       ];
  //     }
  //     setSignerPos(updatedSignerPos);
  //   }

  //   // Set editing UI states
  //   setSelectWidgetId(key);
  //   setWidgetType(dragTypeValue);
  //   setSignKey(key);
  //   setCurrWidgetsDetails({});
  //   setWidgetName(dragTypeValue);

  //   // Set UI flags based on widget type
  //   if (dragTypeValue === 'dropdown') {
  //     setShowDropdown(true);
  //   } else if (dragTypeValue === 'checkbox') {
  //     setIsCheckbox(true);
  //   } else if (
  //     [textInputWidget, textWidget, 'name', 'company', 'job title', 'email'].includes(dragTypeValue)
  //   ) {
  //     setFontSize(12);
  //     setFontColor('black');
  //   } else if (dragTypeValue === radioButtonWidget) {
  //     setIsRadio(true);
  //   }
  // };

  const closeTour = () => {
    setCheckTourStatus(false);
  };

  function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!state?.file) {
        return;
      }
      const pdfArrayBuffer = await fileToArrayBuffer(state.file);
      setPdfArrayBuffer(pdfArrayBuffer);

      const pdfBase64Url = await fileToBase64(state.file);
      setPdfBase64Url(pdfBase64Url);
    };
    fetchData();
  }, [state?.file]);

  const clickOnZoomIn = () => {
    onClickZoomIn(scale, zoomPercent, setScale, setZoomPercent);
  };

  const clickOnZoomOut = () => {
    onClickZoomOut(zoomPercent, scale, setZoomPercent, setScale);
  };

  const handleRotationFun = async (rotateDegree) => {
    const rotatePlaceholderExist = handleRotateWarning(signerPos, pageNumber);
    if (rotatePlaceholderExist) {
      setShowRotateAlert({ status: true, degree: rotateDegree });
    } else {
      setIsUploadPdf(true);
      const urlDetails = await rotatePdfPage(rotateDegree, pageNumber - 1, pdfArrayBuffer);
      setPdfArrayBuffer(urlDetails.arrayBuffer);
      setPdfBase64Url(urlDetails.base64);
    }
  };

  useEffect(() => {
    const updateSize = () => {
      if (divRef.current) {
        const pdfWidth = pdfNewWidthFun(divRef);
        setPdfNewWidth(pdfWidth);
        setContainerWH({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
        setScale(1);
        setZoomPercent(0);
      }
    };
    const timer = setTimeout(updateSize, 100);
    return () => clearTimeout(timer);
  }, []);

  const signatureRedux = useSelector((state) => state.signature.signature);
  const signatureTypeRedux = useSelector((state) => state.signature.signatureType);

  // Update widget data after editing in modal
  const handleWidgetdefaultdata = (data, signatureValue, signatureTypeValue) => {
    // console.log('signatureValue', signatureValue, signatureTypeValue);
    // console.log('signatureRedux', data);
    if (!selectedWidgetId) return;
    setWidgets((prevWidgets) =>
      prevWidgets.map((w) => {
        if (w.id !== selectedWidgetId) return w;

        // For signature/initials, always use passed-in signature values
        if (['signature', 'initials'].includes(w.type)) {
          if (data?.value?.type === 'type') {
            // Typed signature: set as text, clear SignUrl
            return {
              ...w,
              text: data?.value?.value || '',
              SignUrl: '',
              name: w.name,
              defaultValue: w.defaultValue,
              status: w.status,
              hint: w.hint,
            };
          }
          if (
            (data?.value?.type === 'draw' || data?.value?.type === 'upload') &&
            data?.value?.value
          ) {
            // Drawn or uploaded: set as image if signatureValue is non-empty
            let signUrl = data?.value?.value || '';
            if (signUrl && !signUrl.startsWith('data:image')) {
              signUrl = `data:image/png;base64,${signUrl}`;
            }
            return {
              ...w,
              SignUrl: signUrl,
              text: '',
              name: w.name,
              defaultValue: w.defaultValue,
              status: w.status,
              hint: w.hint,
            };
          } else {
            // fallback: do not overwrite SignUrl if no new signature
            return {
              ...w,
              SignUrl: w.SignUrl || '',
              text: w.text || '',
              name: w.name,
              defaultValue: w.defaultValue,
              status: w.status,
              hint: w.hint,
            };
          }
        }
        // For other widgets, update as before
        return {
          ...w,
          SignUrl: w.SignUrl || '',
          text: data.defaultValue || data.name || '',
          name: data.name,
          defaultValue: data.defaultValue,
          status: data.status,
          hint: data.hint,
        };
      }),
    );
    setIsWidgetNameModal(false);
    setWidgetModalData(null);
  };

  const handleNameModal = () => {
    setIsNameModal(false);
    setCurrWidgetsDetails({});
    setShowDropdown(false);
    setIsRadio(false);
    setIsCheckbox(false);
    setIsPageCopy(false);
    if (currWidgetsDetails.type === textWidget) {
      setUniqueId(tempSignerId);
      setTempSignerId('');
    }
  };

  const pageDetails = async (pdf) => {
    let pdfWHObj = [];
    const totalPages = pdf?.numPages;
    for (let index = 0; index < totalPages; index++) {
      const getPage = await pdf.getPage(index + 1);
      const scale = 1;
      const { width, height } = getPage.getViewport({ scale });
      pdfWHObj.push({ pageNumber: index + 1, width, height });
    }
    setPdfOriginalWH(pdfWHObj);
    setPdfLoad(true);
  };

  // const handleDeleteSign = (key, Id) => {
  //   const updateData = [];
  //   const filterSignerPos = signerPos.filter((data) => data.Id === Id);
  //   if (filterSignerPos.length > 0) {
  //     const getPlaceHolder = filterSignerPos[0].placeHolder;
  //     const getPageNumer = getPlaceHolder.filter((data) => data.pageNumber === pageNumber);
  //     if (getPageNumer.length > 0) {
  //       const getXYdata = getPageNumer[0].pos.filter((data) => data.key !== key);
  //       if (getXYdata.length > 0) {
  //         updateData.push(getXYdata);
  //         const newUpdatePos = getPlaceHolder.map((obj) => {
  //           if (obj.pageNumber === pageNumber) {
  //             return { ...obj, pos: updateData[0] };
  //           }
  //           return obj;
  //         });

  //         const newUpdateSigner = signerPos.map((obj) => {
  //           if (obj.Id === Id) {
  //             return { ...obj, placeHolder: newUpdatePos };
  //           }
  //           return obj;
  //         });
  //         setSignerPos(newUpdateSigner);
  //       } else {
  //         const getRemainPage = filterSignerPos[0].placeHolder.filter(
  //           (data) => data.pageNumber !== pageNumber,
  //         );
  //         if (getRemainPage && getRemainPage.length > 0) {
  //           const newUpdatePos = filterSignerPos.map((obj) => {
  //             if (obj.Id === Id) {
  //               return { ...obj, placeHolder: getRemainPage };
  //             }
  //             return obj;
  //           });
  //           let signerupdate = [];
  //           signerupdate = signerPos.filter((data) => data.Id !== Id);
  //           signerupdate.push(newUpdatePos[0]);
  //           setSignerPos(signerupdate);
  //         } else {
  //           const updatedData = signerPos.map((item) => {
  //             if (item.Id === Id) {
  //               const updatedItem = { ...item };
  //               delete updatedItem.placeHolder;
  //               return updatedItem;
  //             }
  //             return item;
  //           });
  //           setSignerPos(updatedData);
  //         }
  //       }
  //     }
  //   }
  // };

  // const handleTabDrag = (key) => {
  //   setDragKey(key);
  //   setIsDragging(true);
  // };

  const handleStop = (event, dragElement, signerId, key) => {
    if (!isResize && isDragging) {
      let updateSignPos = [...signerPos];
      const signerObjId = signerId ? signerId : uniqueId;
      const keyValue = key ? key : dragKey;
      const containerScale = getContainerScale(pdfOriginalWH, pageNumber, containerWH);
      if (keyValue >= 0) {
        let filterSignerPos = [];
        if (signerObjId) {
          filterSignerPos = updateSignPos.filter((data) => data.Id === signerObjId);
        }

        if (filterSignerPos.length > 0) {
          const getPlaceHolder = filterSignerPos[0].placeHolder;
          const getPageNumer = getPlaceHolder.filter((data) => data.pageNumber === pageNumber);
          if (getPageNumer.length > 0) {
            const getXYdata = getPageNumer[0].pos;
            const addSignPos = getXYdata.map((url) => {
              if (url.key === keyValue) {
                return {
                  ...url,
                  xPosition: dragElement.x / (containerScale * scale),
                  yPosition: dragElement.y / (containerScale * scale),
                };
              }
              return url;
            });
            const newUpdateSignPos = getPlaceHolder.map((obj) => {
              if (obj.pageNumber === pageNumber) {
                return { ...obj, pos: addSignPos };
              }
              return obj;
            });
            const newUpdateSigner = updateSignPos.map((obj) => {
              if (signerObjId) {
                if (obj.Id === signerObjId) {
                  return { ...obj, placeHolder: newUpdateSignPos };
                }
              }
              return obj;
            });
            setSignerPos(newUpdateSigner);
          }
        }
      }
    }
    setTimeout(() => setIsDragging(false), 200);
  };

  function changePage(offset) {
    setSignBtnPosition([]);
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  // const handleDivClick = (e) => {
  //   const isTouchEvent = e.type.startsWith('touch');
  //   const divRect = e.currentTarget.getBoundingClientRect();

  //   let mouseX, mouseY;

  //   if (isTouchEvent) {
  //     const touch = e.touches[0];
  //     mouseX = touch.clientX - divRect.left;
  //     mouseY = touch.clientY - divRect.top;
  //     setSignBtnPosition([{ xPos: mouseX, yPos: mouseY }]);
  //   } else {
  //     mouseX = e.clientX - divRect.left;
  //     mouseY = e.clientY - divRect.top;
  //     setXYSignature({ xPos: mouseX, yPos: mouseY });
  //   }
  // };

  // const handleMouseLeave = () => {
  //   setSignBtnPosition([xySignature]);
  // };

  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [isWidgetNameModal, setIsWidgetNameModal] = useState(false);
  const [widgetModalData, setWidgetModalData] = useState(null);

  const signatureLikeWidgets = ['signature', 'initials'];

  const widgetNameModalWidgets = [
    'stamp',
    'name',
    'job_title',
    'company',
    'date',
    'text',
    'text_input',
    'checkbox',
    'dropdown',
    'radio_button',
    'image',
    'email',
  ];

  // Remove widget handler
  const handleRemoveWidget = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  // Update handleDrop: do NOT open dialog after drop
  const handleDrop = (item) => {
    const id = uuidv4();
    const pageNumber = item.pageNumber || 1;
    const left = item.left || 100;
    const top = item.top || 100;
    setWidgets((prev) => [
      ...prev,
      { ...item, id, left, top, type: item.type, pageNumber, text: '' },
    ]);
    setSelectedWidgetId(id);
    // Do not open modal here
  };

  // Update handleOpenWidgetEditor to open the modal for editing
  const handleOpenWidgetEditor = (widgetId) => {
    setSelectedWidgetId(widgetId);
    const selectedWidget = widgets.find((w) => w.id === widgetId);
    if (selectedWidget) {
      setWidgetModalData(selectedWidget);
      setIsWidgetNameModal(true);
    }
  };

  // Utility to convert dataURL to ArrayBuffer
  function dataURLToArrayBuffer(dataURL) {
    const base64 = dataURL.split(',')[1];
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const handleDownloadPdf = async () => {
    const existingPdfBytes = await fileToArrayBuffer(state.file);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    for (const widget of widgets) {
      const { left = 100, top = 100, text, type, pageNumber, SignUrl } = widget;
      const page = pages[(pageNumber || 1) - 1] || pages[0];
      if ((type === 'signature' || type === 'initials') && SignUrl) {
        // Draw image signature
        let image;
        if (SignUrl.startsWith('data:image/png')) {
          const pngBytes = dataURLToArrayBuffer(SignUrl);
          image = await pdfDoc.embedPng(pngBytes);
        } else if (SignUrl.startsWith('data:image/jpeg') || SignUrl.startsWith('data:image/jpg')) {
          const jpgBytes = dataURLToArrayBuffer(SignUrl);
          image = await pdfDoc.embedJpg(jpgBytes);
        }
        if (image) {
          const imgDims = image.scale(1);
          // You may want to adjust width/height based on widget size
          page.drawImage(image, {
            x: left,
            y: page.getHeight() - top - imgDims.height, // y is from bottom
            width: imgDims.width,
            height: imgDims.height,
          });
        }
      } else if ((type === 'signature' || type === 'initials') && text) {
        // Draw typed signature/initials as text
        page.drawText(text, {
          x: left,
          y: page.getHeight() - top,
          size: 12,
          color: rgb(0, 0, 0),
        });
      } else if (text) {
        // Other widgets: draw text
        page.drawText(text, {
          x: left,
          y: page.getHeight() - top,
          size: 12,
          color: rgb(0, 0, 0),
        });
      }
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'signed.pdf';
    link.click();
  };

  // Move handler for widgets (for drag-and-drop repositioning)
  const handleMove = (id, left, top) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => (widget.id === id ? { ...widget, left, top } : widget)),
    );
  };

  const handleCloseWidgetNameModal = () => {
    setIsWidgetNameModal(false);
    setWidgetModalData(null);
  };

  // Add a no-op setSignaturePosition for Canvas compatibility
  const setSignaturePosition = () => {};

  return (
    <MainCard title={state?.title ? state.title : 'New Document'}>
      <button onClick={handleDownloadPdf}>Download PDF</button>
      <DndProvider backend={HTML5Backend}>
        <Box
          sx={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            bgcolor: 'background.default',
            width: '100%',
          }}
        >
          {!checkTourStatus && <></>}

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            <RenderAllPdfPage
              allPages={allPages}
              setAllPages={setAllPages}
              setPageNumber={setPageNumber}
              setSignBtnPosition={setSignBtnPosition}
              pageNumber={pageNumber}
              pdfBase64Url={pdfBase64Url}
              signedUrl={pdfDetails?.[0]?.SignedUrl || ''}
              setPdfArrayBuffer={setPdfArrayBuffer}
              setPdfBase64Url={setPdfBase64Url}
              setIsUploadPdf={setIsUploadPdf}
              pdfArrayBuffer={pdfArrayBuffer}
              isMergePdfBtn={true}
            />
            <Box sx={{ width: '100%' }}>
              <Header
                completeBtnTitle={t('next')}
                isPlaceholder={true}
                pageNumber={pageNumber}
                allPages={allPages}
                changePage={changePage}
                pdfDetails={pdfDetails}
                signerPos={signerPos}
                signersdata={signersdata}
                isMailSend={false}
                alertSendEmail={''}
                isShowHeader={true}
                currentSigner={true}
                handleRotationFun={handleRotationFun}
                clickOnZoomIn={clickOnZoomIn}
                clickOnZoomOut={clickOnZoomOut}
                setIsUploadPdf={setIsUploadPdf}
                pdfArrayBuffer={pdfArrayBuffer}
                setPdfArrayBuffer={setPdfArrayBuffer}
                setPdfBase64Url={setPdfBase64Url}
                setSignerPos={setSignerPos}
                userId={uniqueId}
                pdfBase64={pdfBase64Url}
              />

              <Box
                sx={{
                  width: '100%',
                  mr: { xs: 0, md: 4 },
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'relative',
                  gap: 2,
                  justifyContent: 'space-evenly',
                }}
              >
                <PdfZoom
                  clickOnZoomIn={clickOnZoomIn}
                  clickOnZoomOut={clickOnZoomOut}
                  handleRotationFun={handleRotationFun}
                  pdfArrayBuffer={pdfArrayBuffer}
                  pageNumber={pageNumber}
                  setPdfBase64Url={setPdfBase64Url}
                  setPdfArrayBuffer={setPdfArrayBuffer}
                  setIsUploadPdf={setIsUploadPdf}
                  setSignerPos={setSignerPos}
                  signerPos={signerPos}
                  userId={uniqueId}
                  allPages={allPages}
                  setAllPages={setAllPages}
                  setPageNumber={setPageNumber}
                />

                <Box
                  ref={divRef}
                  data-tut="pdfArea"
                  sx={{
                    height: { xs: '100%', md: '95%' },
                    border: '1px solid #ccc',
                    width: '80%',
                    borderRadius: '5px',
                    position: 'relative',
                  }}
                >
                  {containerWH && (
                    <Box>
                      <Canvas
                        widgets={widgets}
                        setWidgets={setWidgets}
                        onDrop={handleDrop}
                        onMove={handleMove}
                        handleOpenWidgetEditor={handleOpenWidgetEditor}
                        setSignaturePosition={setSignaturePosition}
                        pageNumber={pageNumber}
                        onRemoveWidget={handleRemoveWidget}
                        // ...existing Canvas props...
                      >
                        <RenderPdf
                          widgets={widgets}
                          pageNumber={pageNumber}
                          pdfNewWidth={pdfNewWidth}
                          pdfDetails={pdfDetails}
                          signerPos={signerPos}
                          successEmail={false}
                          numPages={numPages}
                          pageDetails={pageDetails}
                          placeholder={true}
                          // handleDeleteSign={handleDeleteSign}
                          // handleTabDrag={handleTabDrag}
                          handleStop={handleStop}
                          setPdfLoad={setPdfLoad}
                          pdfLoad={pdfLoad}
                          setSignerPos={setSignerPos}
                          containerWH={containerWH}
                          setIsResize={setIsResize}
                          isResize={isResize}
                          setZIndex={setZIndex}
                          setIsPageCopy={setIsPageCopy}
                          signersdata={signersdata}
                          setSignKey={setSignKey}
                          handleLinkUser={() => {}}
                          setUniqueId={setUniqueId}
                          isDragging={isDragging}
                          setShowDropdown={setShowDropdown}
                          setWidgetType={setWidgetType}
                          setIsRadio={setIsRadio}
                          setIsCheckbox={setIsCheckbox}
                          setCurrWidgetsDetails={setCurrWidgetsDetails}
                          setSelectWidgetId={setSelectWidgetId}
                          selectWidgetId={selectWidgetId}
                          handleNameModal={setIsNameModal}
                          setTempSignerId={setTempSignerId}
                          uniqueId={uniqueId}
                          pdfOriginalWH={pdfOriginalWH}
                          setScale={setScale}
                          scale={scale}
                          setIsSelectId={setIsSelectId}
                          pdfBase64Url={pdfBase64Url}
                          fontSize={fontSize}
                          setFontSize={setFontSize}
                          fontColor={fontColor}
                          setFontColor={setFontColor}
                          unSignedWidgetId={''}
                          // divRef={dropRef}
                          widgetPositions={widgetPositions}
                          setWidgetPositions={setWidgetPositions}
                        />
                      </Canvas>
                    </Box>
                  )}
                </Box>

                {/* // Widget List */}
                <Box sx={{ width: '20%', height: '100%' }}>
                  <WidgetList />
                </Box>
              </Box>
            </Box>
          </Box>

          <div className="w-full md:w-[23%] bg-base-100 overflow-y-auto hide-scrollbar">
            <div className={`max-h-screen`}>
              {isMobile ? (
                <div>{/* Mobile widget component if needed */}</div>
              ) : (
                <div>
                  <div className="hidden md:block w-full h-full bg-base-100" aria-disabled>
                    {/* Additional widgets or components can go here */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
        <WidgetNameModal
          signatureType={signatureType}
          widgetName={widgetName}
          defaultdata={widgetModalData}
          isOpen={isWidgetNameModal}
          handleClose={handleCloseWidgetNameModal}
          handleData={(data, type) =>
            handleWidgetdefaultdata(data, signatureRedux, signatureTypeRedux)
          }
          isTextSetting={isTextSetting}
          setIsTextSetting={setIsTextSetting}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontColor={fontColor}
          setFontColor={setFontColor}
        />
      </DndProvider>
    </MainCard>
  );
};

export default CustomizePdfSign;
