import { ColorName } from "../../../core/colors/Colors";
import { useThemeColor } from "../../../core/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export function useContactUsStyle() {
  const background = useThemeColor(ColorName.Background);
  const inputBackground = useThemeColor(ColorName.InputBackground);
  const error = useThemeColor(ColorName.Error);

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: background,
    },
    scrollView: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 4,
      fontWeight: "bold",
    },
    input: {
      borderWidth: 1,
      borderColor: inputBackground,
      borderRadius: 4,
      padding: 8,
      marginBottom: 12,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: "top",
    },
    errorText: {
      color: error,
      fontSize: 12,
      marginBottom: 8,
    },
    errorInput: {
      borderColor: error,
    },
  });
}
