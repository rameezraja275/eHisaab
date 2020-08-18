import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../utils/colors";
import { getTranslation } from "../utils/language";

const Link = ({ onPress, text, language }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          color: colors.darkColor,
          fontSize: 13,
          paddingTop: 10,

          textDecorationLine: "underline",
        }}
      >
        {getTranslation(text, language)}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
