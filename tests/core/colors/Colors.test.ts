import { ColorName } from "./../../../core/colors/Colors";
import { DefinedColors } from "@/core/colors/Colors";

describe("Colors.ColorName Enum", () => {
  test("should have the same keys as Colors.light and Colors.dark", () => {
    const lightKeys = Object.keys(DefinedColors.light);
    const darkKeys = Object.keys(DefinedColors.dark);
    const enumKeys = Object.values(ColorName);

    // Ensure light and dark have the same keys
    expect(lightKeys).toEqual(darkKeys);

    // Ensure the enum keys match the color object keys
    expect(enumKeys).toEqual(lightKeys);
  });
});
