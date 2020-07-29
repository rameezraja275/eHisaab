import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";
import colors from "../utils/colors";

const HeaderTitle = ({ title, language }) => {
  return (
    <Text
      style={{
        color: colors.white,
        fontFamily: "PrimaryFont",
      }}
    >
      {getTranslation(title, language)}
    </Text>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(HeaderTitle);
