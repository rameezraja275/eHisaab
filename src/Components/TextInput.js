import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const Input = (props) => {
  const [focus, setFocus] = useState(false);

  const container = {
    borderColor: focus ? colors.darkColor : colors.grey,
    borderWidth: focus ? 1 : 0.5,
    borderRadius: 5,
    marginVertical: 10,
  };

  const TextFieldStyles = {
    position: "relative",
    top: 0,
    // top: !focus ? -2 : 0,
    height: focus ? 30 : 26,
    fontSize: 14,
    color: "#000",
    // borderBottomColor: !focus ? colors.lightGrey : colors.primaryColor,
    paddingLeft: 10,
    borderBottomWidth: 0,
    paddingBottom: 10,
    fontFamily: "PrimaryFont",
  };

  const labelStyle = {
    position: "relative",
    left: 0,
    top: !focus ? 14 : -8,
    fontSize: !focus ? 14 : 10,
    color: !focus ? colors.lightGrey : colors.darkColor,
    paddingLeft: focus ? 5 : 10,
    paddingRight: focus ? 5 : 0,
    marginLeft: focus ? 10 : 0,
    marginRight: focus ? 10 : 0,
    backgroundColor: colors.lightColor,
    // width: focus ? 110 : 180,
    fontFamily: "PrimaryFont",
    alignSelf: "flex-start",
  };

  useEffect(() => {
    props.value != null && setFocus(true);
    props.value == "" && setFocus(false);
  }, [props.value]);

  const onChange = (userInput) => {
    const cleanNumber =
      props.keyboardType == "number-pad"
        ? userInput.replace(/[^0-9]/g, "")
        : userInput;
    props.onChange(cleanNumber);
  };

  return (
    <View style={container}>
      <Text style={labelStyle}>
        {getTranslation(props.placeholder, props.language) + " "}
        {props.required && (
          <Text style={{ color: colors.danger, fontFamily: "PrimaryFont" }}>
            {" "}
            *{" "}
          </Text>
        )}
      </Text>
      <TextInput
        style={TextFieldStyles}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(props.value ? true : false)}
        onChangeText={onChange}
        value={props.value}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        editable={props.disabled ? false : true}
        maxLength={props.maxLength}
        // autoCorrect={false}
      />
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Input);
