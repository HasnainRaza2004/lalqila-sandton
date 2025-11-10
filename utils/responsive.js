import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions
const baseWidth = 375; // Standard iPhone width
const baseHeight = 812; // Standard iPhone height

// Scale factors
export const widthScale = SCREEN_WIDTH / baseWidth;
export const heightScale = SCREEN_HEIGHT / baseHeight;
export const moderateScale = (size, factor = 0.5) => size + (widthScale - 1) * factor;

// Responsive font sizing
export const responsiveFontSize = (fontSize) => {
  const scale = Math.min(widthScale, heightScale);
  return Math.round(PixelRatio.roundToNearestPixel(fontSize * scale));
};

// Responsive spacing
export const spacing = {
  xs: responsiveFontSize(4),
  sm: responsiveFontSize(8),
  md: responsiveFontSize(16),
  lg: responsiveFontSize(24),
  xl: responsiveFontSize(32),
};

// Screen size breakpoints
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
};

// Device type detection
export const isTablet = () => {
  return SCREEN_WIDTH >= breakpoints.tablet;
};

// Platform specific spacing
export const platformSpacing = (ios, android) => {
  return Platform.select({
    ios,
    android,
  });
};

// Responsive dimensions
export const responsiveWidth = (width) => {
  return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * width);
};

export const responsiveHeight = (height) => {
  return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * height);
};