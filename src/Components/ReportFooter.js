const { PlatformColor, RefreshControl } = require("react-native");
const { createFactory } = require("react");
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FormatPrice } from "../utils/helper";
import { getTranslation } from "../utils/language";
import colors from "../utils/colors";
import constants from "../utils/constants";
const ReportFooter = ({ label, value, language, colorSensitive }) => {
  let color;
  if (colorSensitive) {
    color = value > 0 ? colors.success : colors.danger;
  }
  const URDU = constants.URDU;
  const styles = getStyles({ language, URDU });
  return (
    <View style={styles.footer}>
      <Text style={{ flex: 0.5, fontFamily: "PrimaryFont" }}>
        {getTranslation(label, language)}
      </Text>
      <Text
        style={{
          flex: 0.5,
          fontFamily: "PrimaryFont",
          color: color,
          textAlign: language == URDU ? "right" : "left",
        }}
      >
        {FormatPrice(value)}
      </Text>
    </View>
  );
};

const getStyles = ({ language, URDU }) =>
  StyleSheet.create({
    footer: {
      position: "relative",
      right: 0,
      bottom: 0,
      flexDirection: language == URDU ? "row-reverse" : "row",
      backgroundColor: colors.white,
      padding: 10,
      borderTopColor: colors.borderColor,
      borderTopWidth: 0.5,
    },
  });
export default ReportFooter;
