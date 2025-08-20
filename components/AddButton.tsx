import React from "react";
import { TouchableOpacity, Text, StyleSheet} from "react-native";
 
const AddButton = ({onPress}) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Add</Text>
      </TouchableOpacity>
  );
}
 
const style = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#59e917ff"
 
      },
    text:{
        color: "#ffffffff",
        fontSize:30,
    }
   
});
 
export default AddButton;