import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import colors from "../utils/colors";

const Loader = (props) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.darkColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;
