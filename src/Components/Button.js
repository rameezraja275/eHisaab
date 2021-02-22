import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";
import { Badge } from 'react-native-elements'

const Button = ({
  type,
  radius,
  onClick,
  disabled,
  icon,
  title,
  language,
  sm,
  badgeValue
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: type == "danger" ? colors.danger : type == "secondary" ? colors.lightColor : colors.primaryColor,
      padding: sm ? 8 : 14,
      borderRadius: radius ? radius : 5,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: type == "secondary" ? colors.darkColor : colors.primaryColor,
    },
    buttonText: {
      color: type == "secondary" ? colors.black : colors.white,
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
        {badgeValue && <View style={{ position: "absolute", right: 0, top: -10 }} ><Badge status="error" value={badgeValue} textStyle={{ margin: 5 }} /></View>}
        {icon && (
          <Icon
            name={icon}
            size={15}
            color={type == "secondary" ? colors.black : colors.lightColor}
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
