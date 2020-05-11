import React from "react";
import ChartStyles from "../screens/ChartScreen/styles.js";

import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

const ChartButton = ({title, onPress, bgColor, textColor}) => {
  return(
    <TouchableOpacity style={[ChartStyles.buttonStyle, {backgroundColor: bgColor}]}
                      activeOpacity={1}
                      onPress={onPress}>
      <Text style={[ChartStyles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ChartButton;
