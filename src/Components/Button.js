import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const Button = ({
  type,
  radius,
  onClick,
  disabled,
  icon,
  title,
  language,
  sm,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: type == "danger" ? colors.danger : colors.primaryColor,
      padding: sm ? 8 : 14,
      borderRadius: radius ? radius : 5,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: colors.white,
      fontFamily: "PrimaryFont",
    },
  });

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ justifyContent: "center" }}
      disabled={disabled}
    >
      <View style={styles.button}>
        {icon && (
          <Icon
            name={icon}
            size={15}
            color={colors.lightColor}
            style={{ marginHorizontal: 10 }}
          />
        )}

        {title && (
          <Text style={styles.buttonText}>
            {getTranslation(title, language)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Button);
