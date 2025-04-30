export const DASHBOARD_PATH = '/login';

const config = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
};

export const APP_NAME = 'Doxigner';
export const INPUT_BORDER_RADIUS = '1.5625rem';
export const isMobile = window.innerWidth < 767;
export const isTab = 767 < window.innerWidth < 1023;
export const isHighResolution = window.innerWidth > 1023;
export const isTabAndMobile = window.innerWidth < 1023;
export const textInputWidget = 'text input';
export const textWidget = 'text';
export const radioButtonWidget = 'radio button';
export const maxFileSize = 10; // 10MB
export const maxTitleLength = 250; // 250 characters
export const maxNoteLength = 200; // 200 characters
export const maxDescriptionLength = 500; // 500 characters
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const fontColorArr = ['red', 'black', 'blue', 'yellow'];
export const fontsizeArr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28];

export default config;
