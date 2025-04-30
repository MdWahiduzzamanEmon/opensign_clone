import { radioButtonWidget, textInputWidget, textWidget } from '../config';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

export const DEMO_CONTACTS = [
  {
    label: 'John Doe',
    value: '123123',
  },
  {
    label: 'Jane Smith',
    value: '456456',
  },
  {
    label: 'Michael Johnson',
    value: '789789',
  },
  {
    label: 'Emily Davis',
    value: '101010',
  },
  {
    label: 'Robert Brown',
    value: '111111',
  },
  {
    label: 'Olivia Wilson',
    value: '222222',
  },
];

export const TIME_ZONES = [
  { label: '(GMT-12:00) International Date Line West', value: 'Etc/GMT+12' },
  { label: '(GMT-11:00) Midway Island, Samoa', value: 'Pacific/Midway' },
  { label: '(GMT-10:00) Hawaii', value: 'Pacific/Honolulu' },
  { label: '(GMT-09:00) Alaska', value: 'America/Anchorage' },
  { label: '(GMT-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
  { label: '(GMT-07:00) Arizona', value: 'America/Phoenix' },
  { label: '(GMT-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
  { label: '(GMT-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
  { label: '(GMT-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
  { label: '(GMT-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
  { label: '(GMT-03:00) Buenos Aires', value: 'America/Argentina/Buenos_Aires' },
  { label: '(GMT-02:00) Mid-Atlantic', value: 'America/Noronha' },
  { label: '(GMT-01:00) Azores', value: 'Atlantic/Azores' },
  { label: '(GMT+00:00) Greenwich Mean Time: Dublin, London', value: 'Europe/London' },
  { label: '(GMT+01:00) Amsterdam, Berlin, Rome, Paris', value: 'Europe/Berlin' },
  { label: '(GMT+02:00) Athens, Bucharest, Istanbul', value: 'Europe/Athens' },
  { label: '(GMT+03:00) Moscow, St. Petersburg, Nairobi', value: 'Europe/Moscow' },
  { label: '(GMT+04:00) Abu Dhabi, Muscat', value: 'Asia/Dubai' },
  { label: '(GMT+05:00) Islamabad, Karachi', value: 'Asia/Karachi' },
  { label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: 'Asia/Kolkata' },
  { label: '(GMT+06:00) Dhaka', value: 'Asia/Dhaka' },
  { label: '(GMT+07:00) Bangkok, Hanoi, Jakarta', value: 'Asia/Bangkok' },
  { label: '(GMT+08:00) Beijing, Hong Kong, Singapore', value: 'Asia/Shanghai' },
  { label: '(GMT+09:00) Tokyo, Seoul', value: 'Asia/Tokyo' },
  { label: '(GMT+10:00) Sydney, Guam', value: 'Australia/Sydney' },
  { label: '(GMT+11:00) Magadan, Solomon Islands', value: 'Asia/Magadan' },
  { label: '(GMT+12:00) Auckland, Fiji', value: 'Pacific/Auckland' },
];

export const DATE_FORMAT = [
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'MMMM DD, YYYY', value: 'MMMM DD, YYYY' },
  { label: 'DD MMMM, YYYY', value: 'DD MMMM, YYYY' },
  { label: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
  { label: 'DD MMM, YYYY', value: 'DD MMM, YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  { label: 'MM-DD-YYYY', value: 'MM-DD-YYYY' },
  { label: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
  { label: 'MMM DD, YYYY', value: 'MMM DD, YYYY' },
];

// `pdfNewWidthFun` function is used to calculate pdf width to render in middle container
export const pdfNewWidthFun = (divRef) => {
  const pdfWidth = divRef.current.offsetWidth;
  return pdfWidth;
};

export const openInNewTab = (url, target) => {
  if (target) {
    window.open(url, target, 'noopener,noreferrer');
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export const defaultWidthHeight = (type) => {
  switch (type) {
    case 'signature':
      return { width: 150, height: 60 };
    case 'stamp':
      return { width: 150, height: 60 };
    case 'checkbox':
      return { width: 15, height: 19 };
    case textInputWidget:
      return { width: 150, height: 19 };
    case 'dropdown':
      return { width: 120, height: 22 };
    case 'initials':
      return { width: 50, height: 50 };
    case 'name':
      return { width: 150, height: 19 };
    case 'company':
      return { width: 150, height: 19 };
    case 'job title':
      return { width: 150, height: 19 };
    case 'date':
      return { width: 100, height: 20 };
    case 'image':
      return { width: 70, height: 70 };
    case 'email':
      return { width: 150, height: 19 };
    case radioButtonWidget:
      return { width: 5, height: 10 };
    case textWidget:
      return { width: 150, height: 19 };
    default:
      return { width: 150, height: 60 };
  }
};

export const resizeBorderExtraWidth = () => {
  return 20;
};

export const handleImageResize = (
  ref,
  key,
  signerPos,
  setSignerPos,
  pageNumber,
  containerScale,
  scale,
  signerId,
  showResize,
) => {
  const filterSignerPos = signerPos.filter((data) => data.Id === signerId);
  if (filterSignerPos.length > 0) {
    const getPlaceHolder = filterSignerPos[0].placeHolder;
    const getPageNumer = getPlaceHolder.filter((data) => data.pageNumber === pageNumber);
    if (getPageNumer.length > 0) {
      const getXYdata = getPageNumer[0].pos;
      const getPosData = getXYdata;
      const addSignPos = getPosData.map((url) => {
        if (url.key === key) {
          return {
            ...url,
            Width: ref.offsetWidth / (containerScale * scale),
            Height: ref.offsetHeight / (containerScale * scale),
            IsResize: showResize ? true : false,
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

      const newUpdateSigner = signerPos.map((obj) => {
        if (obj.Id === signerId) {
          return { ...obj, placeHolder: newUpdateSignPos };
        }
        return obj;
      });

      setSignerPos(newUpdateSigner);
    }
  }
};

export const widgets = [
  { type: 'signature', icon: 'fa-light fa-pen-nib', iconSize: '20px' },
  { type: 'stamp', icon: 'fa-light fa-stamp', iconSize: '19px' },
  { type: 'initials', icon: 'fa-light fa-signature', iconSize: '15px' },
  { type: 'name', icon: 'fa-light fa-user', iconSize: '21px' },
  { type: 'job title', icon: 'fa-light fa-address-card', iconSize: '17px' },
  { type: 'company', icon: 'fa-light fa-building', iconSize: '25px' },
  { type: 'date', icon: 'fa-light fa-calendar-days', iconSize: '20px' },
  { type: textWidget, icon: 'fa-light fa-text-width', iconSize: '20px' },
  { type: textInputWidget, icon: 'fa-light fa-font', iconSize: '21px' },
  { type: 'checkbox', icon: 'fa-light fa-square-check', iconSize: '22px' },
  {
    type: 'dropdown',
    icon: 'fa-light fa-circle-chevron-down',
    iconSize: '19px',
  },
  { type: radioButtonWidget, icon: 'fa-light fa-circle-dot', iconSize: '20px' },
  { type: 'image', icon: 'fa-light fa-image', iconSize: '20px' },
  { type: 'email', icon: 'fa-light fa-envelope', iconSize: '20px' },
];

export const addWidgetOptions = (type, signer) => {
  const defaultOpt = { name: type, status: 'required' };
  switch (type) {
    case 'signature':
      return defaultOpt;
    case 'stamp':
      return defaultOpt;
    case 'checkbox':
      return {
        ...defaultOpt,
        options: { isReadOnly: false, isHideLabel: false },
      };
    case textInputWidget:
      return { ...defaultOpt, isReadOnly: false };
    case 'initials':
      return defaultOpt;
    case 'name':
      return { ...defaultOpt };
    case 'company':
      return { ...defaultOpt };
    case 'job title':
      return { ...defaultOpt };
    case 'date': {
      const dateFormat = signer?.DateFormat ? selectFormat(signer?.DateFormat) : 'MM/dd/yyyy';
      return {
        ...defaultOpt,
        response: getDate(signer?.DateFormat),
        validation: { format: dateFormat, type: 'date-format' },
      };
    }
    case 'image':
      return defaultOpt;
    case 'email':
      return { ...defaultOpt, validation: { type: 'email', pattern: '' } };
    case 'dropdown':
      return defaultOpt;
    case radioButtonWidget:
      return {
        ...defaultOpt,
        values: [],
        isReadOnly: false,
        isHideLabel: false,
      };
    case textWidget:
      return defaultOpt;
    default:
      return {};
  }
};

export const addWidgetSelfsignOptions = (type, getWidgetValue, owner) => {
  switch (type) {
    case 'signature':
      return { name: 'signature' };
    case 'stamp':
      return { name: 'stamp' };
    case 'checkbox':
      return { name: 'checkbox' };
    case textWidget:
      return { name: 'text' };
    case 'initials':
      return { name: 'initials' };
    case 'name':
      return {
        name: 'name',
        defaultValue: getWidgetValue(type),
        validation: { type: 'text', pattern: '' },
      };
    case 'company':
      return {
        name: 'company',
        defaultValue: getWidgetValue(type),
        validation: { type: 'text', pattern: '' },
      };
    case 'job title':
      return {
        name: 'job title',
        defaultValue: getWidgetValue(type),
        validation: { type: 'text', pattern: '' },
      };
    case 'date': {
      const dateFormat = owner?.DateFormat ? selectFormat(owner?.DateFormat) : 'MM/dd/yyyy';
      return {
        name: 'date',
        response: getDate(owner?.DateFormat),
        validation: { format: dateFormat, type: 'date-format' },
      };
    }
    case 'image':
      return { name: 'image' };
    case 'email':
      return {
        name: 'email',
        defaultValue: getWidgetValue(type),
        validation: { type: 'email', pattern: '' },
      };
    default:
      return {};
  }
};

//function to rotate pdf page
export async function rotatePdfPage(rotateDegree, pageNumber, pdfArrayBuffer) {
  // Load the existing PDF
  const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
  // Get the page according to page number
  const page = pdfDoc.getPage(pageNumber);
  //get current page rotation angle
  const currentRotation = page.getRotation().angle;
  // Apply the rotation in the counterclockwise direction
  let newRotation = (currentRotation + rotateDegree) % 360;
  // Adjust for negative angles to keep within 0-359 range
  if (newRotation < 0) {
    newRotation += 360;
  }
  page.setRotation(degrees(newRotation));
  const pdfbase64 = await pdfDoc.saveAsBase64({ useObjectStreams: false });
  //convert base64 to arraybuffer is used in pdf-lib
  //pdfbase64 is used to show pdf rotated format
  const arrayBuffer = base64ToArrayBuffer(pdfbase64);
  //`base64` is used to show pdf
  return { arrayBuffer: arrayBuffer, base64: pdfbase64 };
}

export function base64ToArrayBuffer(base64) {
  // Decode the base64 string to a binary string
  const binaryString = atob(base64);
  // Create a new ArrayBuffer with the same length as the binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  // Convert the binary string to a byte array
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // Return the ArrayBuffer
  return bytes.buffer;
}

export const sanitizeFileName = (pdfName) => {
  // Replace spaces with underscore
  return pdfName.replace(/ /g, '_');
};

// Function to escape special characters in the search string
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
}

// `compensateRotation` is used to calculate x and y position of widget on portait, landscape pdf for pdf-lib
function compensateRotation(
  pageRotation,
  x,
  y,
  scale,
  dimensions,
  fontSize,
  updateColorInRgb,
  font,
  page,
) {
  // Ensure pageRotation is between 0 and 360 degrees
  pageRotation = ((pageRotation % 360) + 360) % 360;
  let rotationRads = (pageRotation * Math.PI) / 180;

  // Coordinates are from bottom-left
  let coordsFromBottomLeft = { x: x / scale };
  if (pageRotation === 90 || pageRotation === 270) {
    coordsFromBottomLeft.y = dimensions.width - (y + fontSize) / scale;
  } else {
    coordsFromBottomLeft.y = dimensions.height - (y + fontSize) / scale;
  }

  let drawX = null;
  let drawY = null;

  if (pageRotation === 90) {
    drawX =
      coordsFromBottomLeft.x * Math.cos(rotationRads) -
      coordsFromBottomLeft.y * Math.sin(rotationRads) +
      dimensions.width;
    drawY =
      coordsFromBottomLeft.x * Math.sin(rotationRads) +
      coordsFromBottomLeft.y * Math.cos(rotationRads);
  } else if (pageRotation === 180) {
    drawX =
      coordsFromBottomLeft.x * Math.cos(rotationRads) -
      coordsFromBottomLeft.y * Math.sin(rotationRads) +
      dimensions.width;
    drawY =
      coordsFromBottomLeft.x * Math.sin(rotationRads) +
      coordsFromBottomLeft.y * Math.cos(rotationRads) +
      dimensions.height;
  } else if (pageRotation === 270) {
    drawX =
      coordsFromBottomLeft.x * Math.cos(rotationRads) -
      coordsFromBottomLeft.y * Math.sin(rotationRads);
    drawY =
      coordsFromBottomLeft.x * Math.sin(rotationRads) +
      coordsFromBottomLeft.y * Math.cos(rotationRads) +
      dimensions.height;
  } else if (pageRotation === 0 || pageRotation === 360) {
    // No rotation or full rotation
    drawX = coordsFromBottomLeft.x;
    drawY = coordsFromBottomLeft.y;
  }
  if (font) {
    return {
      x: drawX,
      y: drawY,
      font,
      color: updateColorInRgb,
      size: fontSize,
      rotate: page.getRotation(),
    };
  } else {
    return { x: drawX, y: drawY };
  }
}

// `getWidgetPosition` is used to calulcate position of image type widget like x, y, width, height for pdf-lib
function getWidgetPosition(page, image, sizeRatio) {
  let pageWidth;
  // pageHeight;
  if ([90, 270].includes(page.getRotation().angle)) {
    pageWidth = page.getHeight();
  } else {
    pageWidth = page.getWidth();
  }
  // eslint-disable-next-line
  if (!image?.hasOwnProperty('vpWidth')) {
    image['vpWidth'] = pageWidth;
  }

  const pageRatio = pageWidth / (image.vpWidth * sizeRatio);
  const imageWidth = image.width * sizeRatio * pageRatio;
  const imageHeight = image.height * sizeRatio * pageRatio;
  const imageX = image.x * sizeRatio * pageRatio;
  const imageYFromTop = image.y * sizeRatio * pageRatio;

  const correction = compensateRotation(
    page.getRotation().angle,
    imageX,
    imageYFromTop,
    1,
    page.getSize(),
    imageHeight,
  );

  return {
    width: imageWidth,
    height: imageHeight,
    x: correction.x,
    y: correction.y,
    rotate: page.getRotation(),
  };
}
//function to use calculate pdf rendering scale in the container
export const getContainerScale = (pdfOriginalWH, pageNumber, containerWH) => {
  const getPdfPageWidth = pdfOriginalWH.find((data) => data.pageNumber === pageNumber);
  const containerScale = containerWH?.width / getPdfPageWidth?.width || 1;
  return containerScale;
};

export const onClickZoomIn = (scale, zoomPercent, setScale, setZoomPercent) => {
  setScale(scale + 0.1 * scale);
  setZoomPercent(zoomPercent + 10);
};
export const onClickZoomOut = (zoomPercent, scale, setZoomPercent, setScale) => {
  if (zoomPercent > 0) {
    if (zoomPercent === 10) {
      setScale(1);
    } else {
      setScale(scale - 0.1 * scale);
    }
    setZoomPercent(zoomPercent - 10);
  }
};

//function to use remove widgets from current page when user want to rotate page
export const handleRemoveWidgets = (setSignerPos, signerPos, pageNumber, setIsRotate) => {
  const isSigners = signerPos.some((data) => data.signerPtr);
  //placeholder,template,draftTemplate flow
  if (isSigners) {
    const updatedSignerPos = signerPos.map((placeholderObj) => {
      return {
        ...placeholderObj,
        placeHolder: placeholderObj?.placeHolder?.filter((data) => data?.pageNumber !== pageNumber),
      };
    });

    if (setIsRotate) {
      setSignerPos(updatedSignerPos);
      setIsRotate({ status: false, degree: 0 });
    } else {
      //after deleting pdf page we need to update page number of widgets
      //For example, consider a PDF with 3 pages where widgets are placed on the 2nd page.
      //If we delete the 1st page, the total number of pages will be reduced to 2. In this case,
      // the widgets need to be updated to reflect the new page numbering and should now appear on the 1st page.
      const updatePageNumber = updatedSignerPos?.map((placeholderObj) => {
        return {
          ...placeholderObj,
          placeHolder: placeholderObj?.placeHolder?.map((data) => {
            if (data.pageNumber > pageNumber) {
              return { ...data, pageNumber: data.pageNumber - 1 };
            } else {
              return data;
            }
          }),
        };
      });
      setSignerPos(updatePageNumber);
    }
  } else {
    //signyourself flow
    const updatedSignerPos = signerPos?.filter((data) => data?.pageNumber !== pageNumber);
    if (setIsRotate) {
      setSignerPos(updatedSignerPos);
      setIsRotate({ status: false, degree: 0 });
    } else {
      //after deleting pdf page we need to update page number of widgets
      //For example, consider a PDF with 3 pages where widgets are placed on the 2nd page.
      //If we delete the 1st page, the total number of pages will be reduced to 2. In this case,
      // the widgets need to be updated to reflect the new page numbering and should now appear on the 1st page.
      const updatePageNumber = updatedSignerPos?.map((data) => {
        if (data.pageNumber > pageNumber) {
          return { ...data, pageNumber: data.pageNumber - 1 };
        } else {
          return data;
        }
      });
      setSignerPos(updatePageNumber);
    }
  }
};
//function to show warning when user rotate page and there are some already widgets on that page
export const handleRotateWarning = (signerPos, pageNumber) => {
  const placeholderExist = signerPos?.some((placeholderObj) =>
    placeholderObj?.placeHolder?.some((data) => data?.pageNumber === pageNumber),
  );
  if (placeholderExist) {
    return true;
  } else {
    return false;
  }
};

// `generateTitleFromFilename` to generate Title of document from file name
export function generateTitleFromFilename(filename) {
  try {
    // Step 1: Trim whitespace
    let title = filename.trim();

    // Step 2: Remove the file extension (everything after the last '.')
    const lastDotIndex = title.lastIndexOf('.');
    if (lastDotIndex > 0) {
      title = title.substring(0, lastDotIndex);
    }

    // Step 3: Replace special characters (except Unicode letters, digits, spaces, and hyphens)
    title = title.replace(/[^\p{L}\p{N}\s-]/gu, ' ');

    // Step 4: Replace multiple spaces with a single space
    title = title.replace(/\s+/g, ' ');

    // Step 5: Capitalize first letter of each word (Title Case), handling Unicode characters
    title = title.replace(
      /\p{L}\S*/gu,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );

    // Step 6: Restrict length of title (optional, let's say 100 characters)
    if (title.length > 100) {
      title = title.substring(0, 100).trim();
    }

    // Step 7: Handle empty or invalid title by falling back to "Untitled Document"
    if (!title || title.length === 0) {
      return 'Untitled Document';
    }

    return title;
  } catch (error) {
    // Handle unexpected errors gracefully by returning a default title
    console.error('Error generating title from filename:', error);
    return 'Untitled Document';
  }
}

export const signatureTypes = [
  { name: 'draw', enabled: true },
  { name: 'typed', enabled: true },
  { name: 'upload', enabled: true },
  { name: 'default', enabled: true },
];

export const deletePdfPage = async (pdfArrayBuffer, pageNumber) => {
  try {
    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
    // Get the total number of pages
    const totalPages = pdfDoc.getPageCount();
    // Ensure the page index is valid
    if (totalPages > 1) {
      //Remove the specified page
      pdfDoc.removePage(pageNumber - 1);
      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.saveAsBase64({
        useObjectStreams: false,
      });
      const arrayBuffer = base64ToArrayBuffer(modifiedPdfBytes);
      return {
        arrayBuffer: arrayBuffer,
        base64: modifiedPdfBytes,
        remainingPages: totalPages - 1,
      };
    } else {
      return { totalPages: 1 };
    }
  } catch (err) {
    console.log('Err while deleting page', err);
  }
};

// `generatePdfName` is used to generate file name
export function generatePdfName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const flattenPdf = async (pdfFile) => {
  const pdfDoc = await PDFDocument.load(pdfFile);
  // Get the form
  const form = pdfDoc.getForm();
  // fetch form fields
  const fields = form.getFields();
  // remove form all existing fields and their widgets
  if (fields && fields?.length > 0) {
    try {
      for (const field of fields) {
        while (field.acroField.getWidgets().length) {
          field.acroField.removeWidget(0);
        }
        form.removeField(field);
      }
    } catch (err) {
      console.log('err while removing field from pdf', err);
    }
  }
  // Updates the field appearances to ensure visual changes are reflected.
  form.updateFieldAppearances();
  // Flattens the form, converting all form fields into non-editable, static content
  form.flatten();
  const flatPdf = await pdfDoc.save({ useObjectStreams: false });
  return flatPdf;
};

//function for resize image and update width and height for sign-yourself
export const handleSignYourselfImageResize = (
  ref,
  key,
  xyPosition,
  setXyPosition,
  index,
  containerScale,
  scale,
) => {
  const getXYdata = xyPosition[index].pos;
  const getPosData = getXYdata;
  const addSign = getPosData.map((url) => {
    if (url.key === key) {
      return {
        ...url,
        Width: ref.offsetWidth / (scale * containerScale),
        Height: ref.offsetHeight / (scale * containerScale),
        IsResize: true,
      };
    }
    return url;
  });

  const newUpdateUrl = xyPosition.map((obj, ind) => {
    if (ind === index) {
      return { ...obj, pos: addSign };
    }
    return obj;
  });
  setXyPosition(newUpdateUrl);
};

export const randomId = () => {
  const randomBytes = crypto.getRandomValues(new Uint16Array(1));
  const randomValue = randomBytes[0];
  const randomDigit = 1000 + (randomValue % 9000);
  return randomDigit;
};

export const getFirstLetter = (name) => {
  const firstLetter = name?.charAt(0);
  return firstLetter;
};

// /function for create list of year for date widget
export const range = (start, end, step) => {
  const range = [];
  for (let i = start; i <= end; i += step) {
    range.push(i);
  }
  return range;
};
//function for get month
export const getMonth = (date) => {
  const newMonth = new Date(date).getMonth();
  return newMonth;
};

//function for get year
export const getYear = (date) => {
  const newYear = new Date(date).getFullYear();
  return newYear;
};

//function to create/copy widget next to already dropped widget
export const handleCopyNextToWidget = (
  position,
  widgetType,
  xyPosition,
  index,
  setXyPosition,
  userId,
) => {
  let filterSignerPos;
  //get position of previous widget and create new widget next to that widget on same data except
  // xPosition and key
  let newposition = position;
  const calculateXPosition = parseInt(position.xPosition) + 10;
  const calculateYPosition = parseInt(position.yPosition) + 10;

  const newId = randomId();
  newposition = {
    ...newposition,
    xPosition: calculateXPosition,
    yPosition: calculateYPosition,
    key: newId,
  };
  //if condition to create widget in request-sign flow
  if (userId) {
    filterSignerPos = xyPosition.filter((data) => data.Id === userId);
    const getPlaceHolder = filterSignerPos && filterSignerPos[0]?.placeHolder;
    const getPageNumer = getPlaceHolder?.filter((data) => data.pageNumber === index);
    const getXYdata = getPageNumer && getPageNumer[0]?.pos;
    getXYdata.push(newposition);
    if (getPageNumer && getPageNumer.length > 0) {
      const newUpdateSignPos = getPlaceHolder.map((obj) => {
        if (obj.pageNumber === index) {
          return { ...obj, pos: getXYdata };
        }
        return obj;
      });

      const newUpdateSigner = xyPosition.map((obj) => {
        if (obj.Id === userId) {
          return { ...obj, placeHolder: newUpdateSignPos };
        }
        return obj;
      });

      setXyPosition(newUpdateSigner);
    }
  } else {
    let getXYdata = xyPosition[index]?.pos || [];
    getXYdata.push(newposition);
    const updatePlaceholder = xyPosition.map((obj, ind) => {
      if (ind === index) {
        return { ...obj, pos: getXYdata };
      }
      return obj;
    });

    setXyPosition(updatePlaceholder);
  }
};

//function to increase height of text area on press enter
export const onChangeHeightOfTextArea = (
  height,
  widgetType,
  signKey,
  xyPosition,
  index,
  setXyPosition,
  userId,
) => {
  const isSigners = xyPosition.some((data) => data.signerPtr);
  let filterSignerPos;
  if (isSigners) {
    if (userId) {
      filterSignerPos = xyPosition.filter((data) => data.Id === userId);
    }
    const getPlaceHolder = filterSignerPos[0]?.placeHolder;

    const getPageNumer = getPlaceHolder.filter((data) => data.pageNumber === index);
    if (getPageNumer.length > 0) {
      const getXYdata = getPageNumer[0].pos;
      const getPosData = getXYdata;
      const addSignPos = getPosData.map((position) => {
        if (position.key === signKey) {
          return {
            ...position,
            Height: position.Height
              ? position.Height + height
              : defaultWidthHeight(widgetType).height + height,
          };
        }
        return position;
      });
      const newUpdateSignPos = getPlaceHolder.map((obj) => {
        if (obj.pageNumber === index) {
          return { ...obj, pos: addSignPos };
        }
        return obj;
      });

      const newUpdateSigner = xyPosition.map((obj) => {
        if (obj.Id === userId) {
          return { ...obj, placeHolder: newUpdateSignPos };
        }
        return obj;
      });

      setXyPosition(newUpdateSigner);
    }
  } else {
    let getXYdata = xyPosition[index].pos;

    const updatePosition = getXYdata.map((position) => {
      if (position.key === signKey) {
        return {
          ...position,
          Height: position.Height
            ? position.Height + height
            : defaultWidthHeight(widgetType).height + height,
        };
      }
      return position;
    });

    const updatePlaceholder = xyPosition.map((obj, ind) => {
      if (ind === index) {
        return { ...obj, pos: updatePosition };
      }
      return obj;
    });
    setXyPosition(updatePlaceholder);
  }
};
//calculate width and height
export const calculateInitialWidthHeight = (widgetData) => {
  const intialText = widgetData;
  const span = document.createElement('span');
  span.textContent = intialText;
  span.style.font = `12px`; // here put your text size and font family
  span.style.display = 'hidden';
  document.body.appendChild(span);
  const width = span.offsetWidth;
  const height = span.offsetHeight;

  document.body.removeChild(span);
  return { getWidth: width, getHeight: height };
};
export const addInitialData = (signerPos, setXyPosition, value, userId) => {
  function widgetDataValue(type) {
    switch (type) {
      case 'name':
        return value?.Name;
      case 'company':
        return value?.Company;
      case 'job title':
        return value?.JobTitle;
      case 'email':
        return value?.Email;
      default:
        return '';
    }
  }
  return signerPos.map((item) => {
    if (item.placeHolder && item.placeHolder.length > 0) {
      // If there is a nested array, recursively add the field to the last object
      if (item.Id === userId) {
        return {
          ...item,
          placeHolder: addInitialData(item.placeHolder, setXyPosition, value, userId),
        };
      } else {
        return item;
      }
    } else if (item.pos && item.pos.length > 0) {
      // If there is no nested array, add the new field
      return {
        ...item,
        pos: addInitialData(item.pos, setXyPosition, value, userId),
        // Adjust this line to add the desired field
      };
    } else {
      const widgetData = widgetDataValue(item.type);
      if (['name', 'company', 'job title', 'email'].includes(item.type)) {
        return {
          ...item,
          options: {
            ...item.options,
            defaultValue: item?.options?.defaultValue || widgetData,
          },
        };
      } else {
        return item;
      }
    }
  });
};

//function for save widgets value on onchange function
export const onChangeInput = (
  value,
  signKey,
  xyPosition,
  index,
  setXyPosition,
  userId,
  initial,
  dateFormat,
  isDefaultEmpty,
  isRadio,
  fontSize,
  fontColor,
) => {
  const isSigners = xyPosition.some((data) => data.signerPtr);
  let filterSignerPos;
  if (isSigners) {
    if (userId) {
      filterSignerPos = xyPosition.filter((data) => data.Id === userId);
    }
    const getPlaceHolder = filterSignerPos[0]?.placeHolder;
    if (initial) {
      const xyData = addInitialData(xyPosition, setXyPosition, value, userId);
      setXyPosition(xyData);
    } else {
      const getPageNumer = getPlaceHolder.filter((data) => data.pageNumber === index);
      if (getPageNumer.length > 0) {
        const getXYdata = getPageNumer[0].pos;
        const getPosData = getXYdata;
        const addSignPos = getPosData.map((position) => {
          if (position.key === signKey) {
            if (dateFormat) {
              return {
                ...position,
                options: {
                  ...position.options,
                  response: value,
                  fontSize: fontSize,
                  fontColor: fontColor,
                  validation: {
                    type: 'date-format',
                    format: dateFormat, // This indicates the required date format explicitly.
                  },
                },
              };
            } else if (isDefaultEmpty) {
              return {
                ...position,
                options: {
                  ...position.options,
                  response: value,
                  defaultValue: isRadio ? '' : [],
                },
              };
            } else {
              return {
                ...position,
                options: {
                  ...position.options,
                  response: value,
                },
              };
            }
          }
          return position;
        });
        const newUpdateSignPos = getPlaceHolder.map((obj) => {
          if (obj.pageNumber === index) {
            return { ...obj, pos: addSignPos };
          }
          return obj;
        });

        const newUpdateSigner = xyPosition.map((obj) => {
          if (obj.Id === userId) {
            return { ...obj, placeHolder: newUpdateSignPos };
          }
          return obj;
        });

        setXyPosition(newUpdateSigner);
      }
    }
  } else {
    let getXYdata = xyPosition[index].pos;
    const updatePosition = getXYdata.map((positionData) => {
      if (positionData.key === signKey) {
        if (dateFormat) {
          return {
            ...positionData,
            options: {
              ...positionData.options,
              response: value,
              fontSize: fontSize,
              fontColor: fontColor,
              validation: {
                type: 'date-format',
                format: dateFormat, // This indicates the required date format explicitly.
              },
            },
          };
        } else {
          return {
            ...positionData,
            options: {
              ...positionData.options,
              response: value,
            },
          };
        }
      }
      return positionData;
    });

    const updatePlaceholder = xyPosition.map((obj, ind) => {
      if (ind === index) {
        return { ...obj, pos: updatePosition };
      }
      return obj;
    });
    setXyPosition(updatePlaceholder);
  }
};

export const handleCopySignUrl = (
  currentPos,
  existSignPosition,
  setXyPosition,
  xyPosition,
  pageNumber,
  signerObjectId,
) => {
  //get current signer details
  const currentSigner = xyPosition.filter((data) => data.signerObjId === signerObjectId);
  //get current signer placeholder details
  const placeholderPosition = currentSigner[0].placeHolder;
  //get current pagenumber position
  const getcurrentPagePosition = placeholderPosition.find((data) => data.pageNumber === pageNumber);
  let getXYdata = getcurrentPagePosition.pos;
  const updatePos = getXYdata.map((x) => {
    //update widgets sign url details
    if (x.key === currentPos.key) {
      return {
        ...x,
        Width: existSignPosition.Width,
        Height: existSignPosition.Height,
        SignUrl: existSignPosition.SignUrl,
        signatureType: existSignPosition.signatureType,
        options: { ...x.options, response: existSignPosition.SignUrl },
        ...(existSignPosition.typedSignature && {
          typeSignature: existSignPosition.typedSignature,
        }),
      };
    }
    return x;
  });
  const updateXYposition = placeholderPosition.map((obj) => {
    if (obj.pageNumber === pageNumber) {
      return { ...obj, pos: updatePos };
    }
    return obj;
  });
  const newUpdateSigner = xyPosition.map((obj) => {
    if (obj.signerObjId === signerObjectId) {
      return { ...obj, placeHolder: updateXYposition };
    }
    return obj;
  });
  setXyPosition(newUpdateSigner);
};

export const handleHeighlightWidget = (getCurrentSignerPos, key, pageNumber) => {
  const placeholder = getCurrentSignerPos.placeHolder;
  // Find the highest zIndex value
  const highestZIndex = placeholder
    .flatMap((item) => item.pos.map((position) => position.zIndex))
    .reduce((max, zIndex) => (zIndex > max ? zIndex : max), -Infinity); //-Infinity represents the smallest possible number
  // Update the zIndex of the current signer
  const updateZindex = placeholder.map((data) => {
    if (data.pageNumber === pageNumber) {
      return {
        ...data,
        pos: data.pos.map((position) => {
          if (position.key === key) {
            return {
              ...position,
              zIndex: highestZIndex + 1,
            };
          }
          return position;
        }),
      };
    }
    return data;
  });
  return updateZindex;
};

//download base64 type pdf
export const fetchBase64 = async (pdfBase64, pdfName) => {
  // Create a Blob from the Base64 string
  const byteCharacters = atob(pdfBase64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  // Create a link element
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = pdfName;

  // Programmatically click the link to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

//handle download signed pdf
export const handleDownloadPdf = async (pdfDetails, setIsDownloading, pdfBase64) => {
  const pdfName =
    pdfDetails?.[0]?.Name?.length > 100
      ? pdfDetails?.[0]?.Name?.slice(0, 100)
      : pdfDetails?.[0]?.Name || 'Document';
  if (pdfBase64) {
    await fetchBase64(pdfBase64, pdfName);
    setIsDownloading && setIsDownloading('');
  } else {
    const pdfUrl = pdfDetails?.[0]?.SignedUrl || pdfDetails?.[0]?.URL;
    setIsDownloading && setIsDownloading('pdf');
    const docId = pdfDetails?.[0]?.objectId || '';
    try {
      // const url = await getSignedUrl(pdfUrl, docId);
      // await fetchUrl(url, pdfName);
      setIsDownloading && setIsDownloading('');
    } catch (err) {
      console.log('err in getsignedurl', err);
      setIsDownloading('');
      alert('something went wrong, refreshing this page may solve this issue.');
    }
  }
};

//function for print digital sign pdf
export const handleToPrint = async (event, setIsDownloading, pdfDetails) => {
  event.preventDefault();
  setIsDownloading('pdf');
  const pdfUrl = pdfDetails?.[0]?.SignedUrl || pdfDetails?.[0]?.URL;
  const docId = pdfDetails?.[0]?.objectId || '';

  try {
    // const url = await Parse.Cloud.run("getsignedurl", { url: pdfUrl });
    //`localStorage.getItem("baseUrl")` is also use in public-profile flow for public-sign
    //if we give this `appInfo.baseUrl` as a base url then in public-profile it will create base url of it's window.location.origin ex- opensign.me which is not base url
    const axiosRes = await axios.post(
      `${localStorage.getItem('baseUrl')}/functions/getsignedurl`,
      {
        url: pdfUrl,
        docId: docId,
      },
      {
        headers: {
          'content-type': 'Application/json',
          'X-Parse-Application-Id': localStorage.getItem('parseAppId'),
          'X-Parse-Session-Token': localStorage.getItem('accesstoken'),
        },
      },
    );
    const url = axiosRes.data.result;
    const pdf = await getBase64FromUrl(url);
    const isAndroidDevice = navigator.userAgent.match(/Android/i);
    const isAppleDevice =
      (/iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !window.MSStream;
    if (isAndroidDevice || isAppleDevice) {
      const byteArray = Uint8Array.from(
        atob(pdf)
          .split('')
          .map((char) => char.charCodeAt(0)),
      );
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      setIsDownloading('');
    } else {
      printModule({ printable: pdf, type: 'pdf', base64: true });
      setIsDownloading('');
    }
  } catch (err) {
    setIsDownloading('');
    console.log('err in getsignedurl', err);
    alert('something went wrong, refreshing this page may solve this issue.');
  }
};

//handle download signed pdf
export const handleDownloadCertificate = async (pdfDetails, setIsDownloading, isZip) => {
  const appName = 'OpenSign™';
  if (pdfDetails?.length > 0 && pdfDetails[0]?.CertificateUrl) {
    try {
      await fetch(pdfDetails[0] && pdfDetails[0]?.CertificateUrl);
      const certificateUrl = pdfDetails[0] && pdfDetails[0]?.CertificateUrl;
      if (isZip) {
        return certificateUrl;
      } else {
        saveAs(certificateUrl, `Certificate_signed_by_${appName}.pdf`);
      }
    } catch (err) {
      console.log('err in download in certificate', err);
    }
  } else {
    setIsDownloading('certificate');
    try {
      const data = { docId: pdfDetails[0]?.objectId };
      const docDetails = await axios.post(
        `${localStorage.getItem('baseUrl')}functions/getDocument`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': localStorage.getItem('parseAppId'),
            sessionToken: localStorage.getItem('accesstoken'),
          },
        },
      );
      if (docDetails.data && docDetails.data.result) {
        const doc = docDetails.data.result;
        if (doc?.CertificateUrl) {
          await fetch(doc?.CertificateUrl);
          const certificateUrl = doc?.CertificateUrl;
          if (isZip) {
            setIsDownloading('');
            return certificateUrl;
          } else {
            saveAs(certificateUrl, `Certificate_signed_by_${appName}.pdf`);
            setIsDownloading('');
          }
        } else {
          const generateRes = await axios.post(
            `${localStorage.getItem('baseUrl')}functions/generatecertificate`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Parse-Application-Id': localStorage.getItem('parseAppId'),
              },
            },
          );
          if (generateRes?.data?.result?.CertificateUrl) {
            try {
              const certificateUrl = generateRes.data.result.CertificateUrl;
              const fetchCertificate = await fetch(certificateUrl);
              if (isZip) {
                setIsDownloading('');
                return certificateUrl;
              } else {
                // Convert the response into a Blob
                const certificateBlob = await fetchCertificate.blob();
                setIsDownloading('');
                saveAs(certificateBlob, `Certificate_signed_by_${appName}.pdf`);
              }
            } catch (err) {
              console.log('err in download in certificate', err);
              setIsDownloading('certificate_err');
            }
          } else {
            setIsDownloading('certificate_err');
          }
        }
      }
    } catch (err) {
      setIsDownloading('certificate_err');
      console.log('err in download in certificate', err);
      alert('something went wrong, refreshing this page may solve this issue.');
    }
  }
};
