import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const DrawerLable = ({ title, language }) => {
  return (
    <View style={{ padding: 15 }}>
      <Text style={{ fontSize: 15, fontFamily: "PrimaryFont" }}>
        {getTranslation(title, language)}
      </Text>
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(DrawerLable);
