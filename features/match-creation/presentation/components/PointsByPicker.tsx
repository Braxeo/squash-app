import React from "react";
import { Text } from "react-native";
import { CustomDropDownPicker } from "./CustomDropDownPicker";
import { PointsBy } from "@/features/rules/constants/Enums";
import { styles } from "../MatchCreationScreenStyle";

interface PointsPerDropDownPickerProps {
  pointsBy: PointsBy;
  setPointsBy: (pointsBy: PointsBy) => void;
}

export const PointsByPicker: React.FC<PointsPerDropDownPickerProps> = ({
  pointsBy,
  setPointsBy,
}) => {
  return (
    <>
      <Text style={styles.label}>Win Each Point By</Text>
      <CustomDropDownPicker
        selectedValue={pointsBy}
        selectableValues={Object.values(PointsBy)}
        setSelectedValue={(value) => {
          const newValue = Object.values(PointsBy).find(
            (v) => v.toString() === value()
          );
          if (newValue) {
            setPointsBy(newValue);
          }
        }}
      />
    </>
  );
};
