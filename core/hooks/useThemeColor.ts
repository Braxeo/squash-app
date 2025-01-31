/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { ColorName, DefinedColors } from "@/core/colors/Colors";
import { useColorScheme } from "@/core/hooks/useColorScheme";

export function useThemeColor(colorName: ColorName): string {
  const theme = useColorScheme() ?? "light";
  return DefinedColors[theme][colorName];
}
