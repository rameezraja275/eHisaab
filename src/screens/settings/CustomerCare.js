import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import colors from "../../utils/colors";
import { getTranslation } from "../../utils/language";
import Icon from "react-native-vector-icons/FontAwesome";
import constants from "../../utils/constants";
import { sms, whatsapp, call, email } from "../../utils/helper";

const CustomerCare = ({ language }) => {
  const renderItem = (iconName, title, rang, callBack) => (
    <TouchableOpacity style={styles.item} onPress={callBack}>
      <Icon
        name={iconName}
        size={17}
        color={rang}
        style={{ marginRight: 10 }}
      />
      <Text style={{ color: rang }}>{getTranslation(title, language)}</Text>
    </TouchableOpacity>
  );

  const phoneNumber = constants.CUSTOMER_CARE_NUMBER;
  const emailID = constants.CUSTOMER_CARE_EMAIL;

  return (
    <View style={{ width: 250, paddingBottom: 5 }}>
      {renderItem("whatsapp", "WHATSAPP", "green", () => whatsapp(phoneNumber))}
      {renderItem("comments-o", "SMS", "#1aa3ff", () => sms(phoneNumber, ""))}
      {renderItem("facebook", "Facebook", "#3b5998", () => Linking.openURL('fb://page/108017437694515/'))}
      {renderItem("instagram", "Instagram", "#C13584", () => Linking.openURL('https://instagram.com/_u/eHisaab'))}
      {renderItem("globe", "eHisaab Web", "#3e8aad", () => Linking.openURL('https://www.pine-technologies.com/ehisaab/'))}
      {renderItem("envelope-o", "EMAIL", "#D44638", () => email(emailID))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
});

export default CustomerCare;
