import React from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
  Platform,
} from "react-native";
import { useThemeColor } from "@/core/hooks/useThemeColor";
import { ColorName } from "@/core/colors/Colors";

type BasicButtonProps = {
  buttonStyle: StyleProp<ViewStyle> | undefined;
  textStyle: StyleProp<TextStyle>;
  title: string;
  onPress: () => void;
};

export const BasicButton: React.FC<BasicButtonProps> = ({
  buttonStyle = basicButtonStyle.button,
  textStyle = basicButtonStyle.buttonText,
  title,
  onPress,
}: BasicButtonProps) => {
  const buttonTextColor = useThemeColor(ColorName.PrimaryButtonText);
  const buttonBackgroundColor = useThemeColor(ColorName.PrimaryButton);

  return (
    <TouchableOpacity
      style={[
        basicButtonStyle.button,
        {
          backgroundColor:
            Platform.OS === "android" ? buttonBackgroundColor : "transparent",
        },
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          basicButtonStyle.buttonText,
          { color: Platform.OS === "ios" ? buttonTextColor : buttonTextColor },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const basicButtonStyle = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        elevation: 2, // Android raised button effect
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
