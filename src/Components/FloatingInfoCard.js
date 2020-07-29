import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";
import { FormatPrice } from "../utils/helper";

const FloatingInfoCard = ({ title, language, value, color, position }) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: color,
      padding: 15,
      borderRadius: 60,
      //   flexDirection: "row",
      //   alignItems: "center",
      //   alignContent: "center",
      justifyContent: "center",
      //   width: title ? "auto" : 60,
      height: 20,
    },
    container: {
      paddingRight: title ? 20 : 0,
      //   width: title ? "auto" : 100,
      //   height: 100,
      position: "absolute",
      right: 0,
      bottom: position == "top" ? 130 : 90,
      justifyContent: "center",
      //   alignItems: "center",
      //   backgroundColor: "red",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{ color: colors.white, fontFamily: "PrimaryFont" }}>
          {`${getTranslation(title, language)} : ${FormatPrice(value)}`}
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(FloatingInfoCard);
