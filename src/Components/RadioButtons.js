const { RefreshControl } = require("react-native");

import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ButtonGroup } from "react-native-elements";
import colors from "../utils/colors";

const RadioButtons = ({ selectedIndex, setSelectedIndex }) => {
  const buttons = ["Inventory Items", "Non Inventory Items"];

  return (
    <ButtonGroup
      onPress={setSelectedIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{ height: 40, backgroundColor: colors.lightColor }}
      selectedButtonStyle={{ backgroundColor: colors.primaryColor }}
      textStyle={{ fontFamily: "PrimaryFont" }}
    />
  );
};

export default RadioButtons;
