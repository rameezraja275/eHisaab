import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Picker } from "react-native";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const Selector = ({
  value,
  onChange,
  options,
  placeholder,
  required,
  type,
  language,
  disabled,
}) => {
  const [selected, setSelected] = useState(false);

  const styles = StyleSheet.create({
    pickerWrapper: {
      marginVertical: 7,
      borderColor: selected ? colors.darkColor : colors.grey,
      borderWidth: selected ? 1 : 0.5,
      borderRadius: 5,
    },
    labelStyle: {
      position: "absolute",
      left: 0,
      top: -8,
      fontSize: 10,
      color: colors.darkColor,
      paddingLeft: 5,
      paddingRight: 5,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: colors.lightColor,
      alignSelf: "flex-start",
      fontFamily: "PrimaryFont",
    },
  });

  useEffect(() => {
    value && setSelected(true);
  }, [value]);

  return (
    <View style={styles.pickerWrapper}>
      {selected && (
        <Text style={styles.labelStyle}>
          {getTranslation(placeholder, language)}
          {required && (
            <Text style={{ color: colors.danger, fontFamily: "PrimaryFont" }}>
              {" "}
              *{" "}
            </Text>
          )}
        </Text>
      )}
      <Picker
        selectedValue={value}
        enabled={disabled ? false : true}
        style={{
          height: 50,
          width: "100%",
          fontSize: 14,
          color: value ? colors.black : colors.lightGrey,
          fontFamily: "PrimaryFont",
        }}
        onValueChange={(itemValue, itemIndex) => {
          if (required) {
            if (itemIndex != 0) {
              setSelected(true);
              onChange(itemValue);
            }
          } else {
            setSelected(true);
            onChange(itemValue);
          }
        }}
      >
        <Picker.Item
          label={
            required
              ? getTranslation(placeholder, language) + " *"
              : getTranslation(placeholder, language)
          }
          value={null}
        />
        {options.length > 0 &&
          options.map((option, index) => {
            return (
              <Picker.Item key={index} label={option[type]} value={option.id} />
            );
          })}
      </Picker>
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(Selector);
