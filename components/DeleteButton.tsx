import React from "react";
import { TouchableOpacity, Text, StyleSheet} from "react-native";
 
interface Delete{
  onPress: () => {}
}
 
const DeleteButton = ({onPress} : Delete) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Remover</Text>
      </TouchableOpacity>
  );
}
 
const style = StyleSheet.create({
    button: {
        width: 120,
        height: 30,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c31149ff"
 
      },
    text:{
        color: "#ffffffff",
        fontSize:20,
    }
   
});
 
export default DeleteButton;