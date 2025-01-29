import React from "react";
import { Text } from "react-native";
import { CustomDropDownPicker } from "./CustomDropDownPicker";
import { WinningRequirement } from "@/features/rules/constants/Enums";
import { styles } from "../MatchCreationScreenStyle";

interface WinningRequirementDropDownPickerProps {
  winningRequirement: WinningRequirement;
  setWinningRequirement: (pointsBy: WinningRequirement) => void;
}

export const WinningRequirementPicker: React.FC<
  WinningRequirementDropDownPickerProps
> = ({ winningRequirement, setWinningRequirement }) => {
  return (
    <>
      <Text style={styles.label}>Win Match By</Text>
      <CustomDropDownPicker
        selectedValue={winningRequirement}
        selectableValues={Object.values(WinningRequirement)}
        setSelectedValue={(value) => {
          const newValue = Object.values(WinningRequirement).find(
            (v) => v.toString() === value()
          );
          if (newValue) {
            setWinningRequirement(newValue);
          }
        }}
      />
    </>
  );
};
