/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const background = "#F5F5F5"; // Light Gray
const cardBackground = "#E0E0E0"; // Slightly Darker Gray
const inputBackground = "#E0E0E0"; // Slightly Darker Gray
const primaryButton = "#1E88E5"; // Bright Blue
const primaryButtonText = "#FFFFFF"; // White
const primaryText = "#000000"; // Black
const secondaryText = "#616161";
const scoreText = "#000000"; // Black
const smallLabel = "#666666"; // Dark Gray
const cardBorder = "#D6D6D6"; // Soft Gray
const buttonShadow = "#1565C0"; // Darker Blue for depth
const error = "#D32F2F";

const darkBackground = "#151718"; // Darker background for dark mode
const darkCardBackground = "#1E1E1E"; // Dark gray for contrast
const darkInputBackground = "#2A2A2A"; // Slightly Darker Gray
const darkPrimaryButton = "#0A84FF"; // iOS-style blue for dark mode
const darkPrimaryButtonText = "#FFFFFF"; // White remains unchanged
const darkPrimaryText = "#ECEDEE"; // Light gray for readability
const darkSecondaryText = "#B0BEC5";
const darkScoreText = "#ECEDEE"; // Light gray for consistency
const darkSmallLabel = "#9BA1A6"; // Slightly lighter gray for visibility
const darkCardBorder = "#333"; // Darker border
const darkButtonShadow = "#005BBB"; // Deeper blue for depth
const darkError = "#EF5350";

export const DefinedColors = {
  light: {
    background,
    cardBackground,
    inputBackground,
    primaryButton,
    primaryButtonText,
    primaryText,
    secondaryText,
    scoreText,
    smallLabel,
    cardBorder,
    buttonShadow,
    error,
  },
  dark: {
    background: darkBackground,
    cardBackground: darkCardBackground,
    inputBackground: darkInputBackground,
    primaryButton: darkPrimaryButton,
    primaryButtonText: darkPrimaryButtonText,
    primaryText: darkPrimaryText,
    secondaryText: darkSecondaryText,
    scoreText: darkScoreText,
    smallLabel: darkSmallLabel,
    cardBorder: darkCardBorder,
    buttonShadow: darkButtonShadow,
    error: darkError,
  },
} as const;

export enum ColorName {
  Background = "background",
  CardBackground = "cardBackground",
  InputBackground = "inputBackground",
  PrimaryButton = "primaryButton",
  PrimaryButtonText = "primaryButtonText",
  PrimaryText = "primaryText",
  SecondaryText = "secondaryText",
  ScoreText = "scoreText",
  SmallLabel = "smallLabel",
  CardBorder = "cardBorder",
  ButtonShadow = "buttonShadow",
  Error = "error",
}
