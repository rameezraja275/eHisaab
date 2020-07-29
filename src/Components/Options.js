import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const Options = ({ status, close, title, onSelect, language, danger }) => {
  return (
    <Overlay
      width="auto"
      height="auto"
      overlayBackgroundColor={colors.lightColor}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      isVisible={status}
      onBackdropPress={() => close(false)}
    >
      <View style={styles.Overlay}>
        <TouchableOpacity
          onPress={() => {
            close(false);
            onSelect();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: danger ? colors.danger : colors.black,
              fontFamily: "PrimaryFont",
            }}
          >
            {getTranslation(title, language)}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  Overlay: {
    paddingHorizontal: 10,
  },
});

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Options);
