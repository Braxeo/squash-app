import React from "react";
import { Text } from "react-native";
import { CustomDropDownPicker } from "../../../../core/components/CustomDropDownPicker";
import { PointsBy } from "@/core/constants/Enums";
import { useMatchCreationStyle } from "../hooks/useMatchCreationStyle";

interface PointsPerDropDownPickerProps {
  pointsBy: PointsBy;
  setPointsBy: (pointsBy: PointsBy) => void;
}

export const PointsByPicker: React.FC<PointsPerDropDownPickerProps> = ({
  pointsBy,
  setPointsBy,
}) => {
  const styles = useMatchCreationStyle();
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
