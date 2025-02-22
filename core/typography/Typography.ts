import { StyleSheet } from "react-native";

// Define your font sizes (adjust the numbers to your preferences)
const fontSize = {
  // Small Sizes
  xs: 12,
  sm: 14,
  md: 16,

  // Medium Sizes
  lg: 18,
  xl: 20,
  xxl: 24,

  // Large Sizes
  xxxl: 30,
  huge: 36,
};

const typography = StyleSheet.create({
  // Headings
  heading1: {
    fontSize: fontSize.huge,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  heading2: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  heading3: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  // Subheadings
  subheading1: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  subheading2: {
    fontSize: fontSize.md,
    fontWeight: "600",
    letterSpacing: 0.25,
  },

  // Titles and Subtitles
  title: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: fontSize.lg,
    fontWeight: "500",
  },

  // Button Text
  buttonText1: {
    fontSize: fontSize.sm,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonText2: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // Body Text
  itemText: {
    fontSize: fontSize.md,
    fontWeight: "400",
    lineHeight: 20,
  },

  // Captions or Smaller Text
  smallText: {
    fontSize: fontSize.sm,
    fontWeight: "300",
  },
});

export default typography;
