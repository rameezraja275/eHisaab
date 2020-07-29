import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const FloatingButton = ({
  title,
  onClick,
  disabled,
  icon,
  language,
  value,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primaryColor,
      padding: 15,
      borderRadius: 60,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      width: title ? "auto" : 60,
      height: 60,
    },
    buttonText: {
      color: colors.white,
    },
    Button: {
      paddingRight: title ? 10 : 0,
      width: title ? "auto" : 100,
      height: 100,
      position: "absolute",
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.Button}>
      <TouchableOpacity onPress={onClick} disabled={disabled}>
        <View style={styles.button}>
          {title && (
            <Text style={{ color: colors.white, fontFamily: "PrimaryFont" }}>
              {`${getTranslation(title, language)} ${value}`}
            </Text>
          )}
          {icon && <Icon name={icon} size={25} color={colors.white} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(FloatingButton);
