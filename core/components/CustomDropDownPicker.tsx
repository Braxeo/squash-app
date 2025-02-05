import React, { Dispatch, SetStateAction, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "../../features/match-creation/presentation/MatchCreationScreenStyle";

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

  return (
    <DropDownPicker
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
