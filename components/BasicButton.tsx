import { Button } from "react-native"

const BasicButton = ({ text, onPressHandle }: { 
    text: string; 
    onPressHandle: () => void 
}) => (
    <Button 
        title={text} 
        onPress={onPressHandle} 
    />
);
  
export default BasicButton;