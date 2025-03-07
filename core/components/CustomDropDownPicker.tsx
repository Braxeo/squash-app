import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface CustomDropDownPickerProps {
  selectedValue: any;
  selectableValues: any[];
  setSelectedValue: Dispatch<SetStateAction<any>>;
}

export const CustomDropDownPicker: React.FC<CustomDropDownPickerProps> = ({
  selectedValue,
  selectableValues,
  setSelectedValue,
}) => {
  const [open, setOpen] = useState(false);
  const itemList = selectableValues.map((v) => ({
    label: `${v}`,
    value: `${v}`,
  }));

  const styles = StyleSheet.create({
    picker: {
      height: 50,
      width: "100%",
      zIndex: 1,
    },
  });

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={selectedValue}
      items={itemList}
      setOpen={setOpen}
      setValue={setSelectedValue}
      multiple={false}
      style={styles.picker}
    />
  );
};
