import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../utils/colors";
import { connect } from "react-redux";
import { getTranslation } from "../utils/language";

const DatePicker = ({
  date,
  setDate,
  placeholder,
  required,
  language,
  minDate,
}) => {
  //   const [date, setDate] = useState(new Date());
  //   const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (_event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios" ? true : false);
    setDate(currentDate);
  };

  //   const showMode = currentMode => {
  //     setShow(true);
  //     setMode(currentMode);
  //   };

  const showDatepicker = () => {
    // showMode('date');
    setShow(true);
  };

  //   const showTimepicker = () => {
  //     showMode('time');
  //   };

  const styles = StyleSheet.create({
    wrapper: {
      borderColor: colors.darkColor,
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 7,
    },
    dateinput: {
      paddingHorizontal: 7,
      paddingVertical: 10,
    },
    dateText: {
      fontSize: 16,
      color: "black",
      paddingLeft: 0,
      backgroundColor: colors.lightColor,
      width: 180,
      fontFamily: "PrimaryFont",
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

  return (
    <View style={styles.wrapper}>
      <Text style={styles.labelStyle}>
        {getTranslation(placeholder, language)}
        {required && (
          <Text style={{ color: colors.danger, fontFamily: "PrimaryFont" }}>
            {" "}
            *{" "}
          </Text>
        )}
      </Text>
      <TouchableOpacity style={styles.dateinput} onPress={showDatepicker}>
        <Text style={styles.dateText}> {date.toDateString()} </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="date"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={minDate ? minDate : new Date("2019-01-01")}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

export default connect(mapStateToProps, {})(DatePicker);
