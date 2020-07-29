import React from "react";
import { View, Text } from "react-native";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";
import constants from "../utils/constants";

const Card = ({ value, title, color, language }) => {
  const URDU = constants.URDU;
  return value ? (
    <View
      style={{
        marginTop: 3,
        flexDirection: language == URDU ? "row-reverse" : "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          color: "white",
          flex: 0.3,
          fontFamily: "PrimaryFont",
        }}
      >
        {getTranslation(title, language)}
      </Text>
      <View style={{ flex: 0.8, alignItems: "flex-end" }}>
        <Text
          style={{
            color: color ? color : colors.white,
            fontFamily: "PrimaryFont",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  ) : (
    <View></View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Card);
