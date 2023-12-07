import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../assets/colors";

const { height } = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    minHeight: height,
  },
});
