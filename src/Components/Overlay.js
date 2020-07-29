import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const CustomOverlay = ({
  title,
  toggleFilter,
  children,
  language,
  backDropClose,
}) => {
  return (
    <Overlay
      width="auto"
      height="auto"
      overlayBackgroundColor={colors.lightColor}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      onBackdropPress={backDropClose ? () => {} : toggleFilter}
      isVisible
    >
      <View style={styles.Overlay}>
        <View style={styles.header}>
          {title && (
            <Text
              style={{
                fontSize: 20,
                paddingBottom: 5,
                fontFamily: "PrimaryFont",
              }}
            >
              {getTranslation(title, language)}{" "}
            </Text>
          )}
        </View>

        <View style={styles.body}>{children}</View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Overlay: {
    margin: 0,
  },
});

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(CustomOverlay);
