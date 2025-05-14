import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../core/hooks/useThemeColor";
import { ColorName } from "../../../core/colors/Colors";

export function useMatchListStyle() {
  const background = useThemeColor(ColorName.Background);
  const cardBackground = useThemeColor(ColorName.CardBackground);
  const primaryText = useThemeColor(ColorName.PrimaryText);
  const secondaryText = useThemeColor(ColorName.SecondaryText);
  const border = useThemeColor(ColorName.CardBorder);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      padding: 16,
    },
    card: {
      backgroundColor: cardBackground,
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      borderColor: border,
      borderWidth: 1,
    },
    playerNames: {
      fontSize: 16,
      fontWeight: "600",
      color: primaryText,
    },
    matchMeta: {
      fontSize: 14,
      color: secondaryText,
      marginTop: 4,
    },
  });
}
