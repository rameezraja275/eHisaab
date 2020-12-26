import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
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
  bottomPosition,
  secondary
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: secondary ? colors.lightColor : colors.primaryColor,
      borderColor: colors.lightGrey,
      borderWidth: secondary ? 1 : 0,
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
      // color: colors.white,
      color: secondary ? colors.darkColor : colors.white,
      fontFamily: "PrimaryFont"
    },
    Button: {
      paddingRight: title ? 10 : 0,
      width: title ? "auto" : 100,
      height: 100,
      position: "absolute",
      right: 0,
      bottom: bottomPosition ? bottomPosition : 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function getRandXY() {
    setX(getRandInt(0, Dimensions.get('window').width - 100))
    setY(getRandInt(0, Dimensions.get('window').height - 100))
  }

  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.Button}>
      <TouchableOpacity onPress={onClick} disabled={disabled}>
        <View style={styles.button}>
          {title && (
            <Text style={styles.buttonText}>
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
