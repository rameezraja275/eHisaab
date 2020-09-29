import React, { useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import colors from "../../utils/colors";
import { logout } from "../../store/actions/auth";
import { showAlert, rateApp } from "../../utils/helper";
import Picker from "../../Components/Picker";
import { setLanguage } from "../../store/actions/common";
import { getTranslation } from "../../utils/language";
import Icon from "react-native-vector-icons/AntDesign";
import color from "../../utils/colors";
import constants from "../../utils/constants";
import CustomerCare from "./CustomerCare";
import Overlay from "../../Components/Overlay";

const SettingItem = ({
  title,
  onClick,
  iconName,
  access,
  language,
  danger,
}) => {
  const styles = StyleSheet.create({
    dangerText: {
      color: colors.danger,
    },
    listitem: {
      flex: 1,
      padding: 15,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
      backgroundColor: colors.lightColor,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 17,
      color: access ? colors.grey : colors.black,
      padding: 0,
      margin: 0,
      fontFamily: "PrimaryFont",
    },
  });

  return (
    <TouchableOpacity
      disabled={access}
      underlayColor={colors.lightColor}
      style={styles.listitem}
      onPress={onClick}
    >
      <Icon
        name={iconName}
        size={17}
        color={danger ? color.danger : access ? colors.grey : colors.black}
        style={{ marginRight: 10 }}
      />
      {danger ? (
        <Text style={[styles.title, styles.dangerText]}>
          {" "}
          {getTranslation(title, language)}{" "}
        </Text>
      ) : (
          <Text style={styles.title}> {getTranslation(title, language)} </Text>
        )}
    </TouchableOpacity>
  );
};

const Setting = (props) => {
  const onLogout = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.logout();
      },
      language
    );
  };

  const { user_level, language } = props;
  const access = user_level != 1 ? true : false;

  const [showOverlay, setOverflow] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    pickeritem: {
      flex: 1,
      padding: 17,
      paddingVertical: 5,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
      backgroundColor: colors.lightColor,
    },
    version: {
      flex: 1,
      padding: 20,
      alignItems: "center",
    },
  });

  const languages = [
    {
      id: constants.ENGLISH,
      language: "English",
    },
    {
      id: constants.URDU,
      language: getTranslation("URDU", 1),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {showOverlay && (
        <Overlay toggleFilter={() => setOverflow(false)} language={language}>
          <CustomerCare />
        </Overlay>
      )}

      <SettingItem
        title="BUSINESS"
        onClick={() => props.navigation.navigate("Bussiness")}
        iconName="appstore1"
        access={access}
        language={language}
      />
      <SettingItem
        title="USERS"
        onClick={() => props.navigation.navigate("ListUsers")}
        iconName="team"
        access={access}
        language={language}
      />
      <SettingItem
        title="OWNER"
        onClick={() => props.navigation.navigate("OwnerProfile")}
        iconName="user"
        access={access}
        language={language}
      />
      <SettingItem
        title="CHANGE_PASSWORD"
        onClick={() => props.navigation.navigate("ChangePassword")}
        iconName="key"
        access={access}
        language={language}
      />
      {/* <SettingItem
        title="PAYMENT"
        onClick={() => props.navigation.navigate("")}
        iconName="creditcard"
        language={language}
      /> */}

      <View style={styles.pickeritem}>
        <Picker
          placeholder="SET_LANGUAGE"
          options={languages}
          value={language}
          type="language"
          onChange={props.setLanguage}
        />
      </View>

      <SettingItem
        title="TUTORIAL"
        onClick={() => Linking.openURL(`https://www.youtube.com/channel/UCEm5duOZZ2zoTiMVeJ8NW5g`)}
        iconName="videocamera"
        language={language}
      />
      <SettingItem
        title="CUSTOMER_CARE"
        onClick={() => setOverflow(true)}
        iconName="customerservice"
        language={language}
      />
      <SettingItem
        title="LOGOUT"
        onClick={onLogout}
        iconName="logout"
        danger={true}
        language={language}
      />
      <SettingItem
        title="RATE_THIS_APP"
        onClick={rateApp}
        iconName="staro"
        language={language}
      />

      <View style={styles.version}>
        <Text style={{ fontSize: 13, fontFamily: "PrimaryFont" }}>
          {" "}
          {constants.APP_NAME +
            " " +
            getTranslation("VERSION", language) +
            " : " +
            constants.VERSION}{" "}
        </Text>

        <Text style={{ fontSize: 13, fontFamily: "PrimaryFont", marginVertical: 5, color: "#01796F" }}>
          {"Powered by " + constants.POWERED_BY}
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "PrimaryFont", color: "#60443D" }}>
          {"ZS Plaza Jutial, Gilgit, Pakistan"}
        </Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({ user, common }) => {
  return {
    user_level: user.currentUser.user_level,
    language: common.language,
  };
};

export default connect(mapStateToProps, { logout, setLanguage })(Setting);
