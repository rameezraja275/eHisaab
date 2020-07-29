import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const EmptyList = ({ language }) => {
  return (
    <View style={styles.center}>
      <Text style={{ fontFamily: "PrimaryFont" }}>
        {getTranslation("EMPTY_LIST", language)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    marginTop: "50%",
    // backgroundColor: "red",
  },
});

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(EmptyList);
