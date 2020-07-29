import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import NetInfo from "@react-native-community/netinfo";
import { ValidateToken } from "../store/actions/auth";
import { getLanguage } from "../store/actions/common";
import { View, Text, Image, StyleSheet } from "react-native";
import { productGet } from "../store/actions/product";
import images from "../utils/images";
import { ShowFlash } from "../utils/helper";
import colors from "../utils/colors";

const SplashScreen = ({ ValidateToken, language, getLanguage }) => {
  useEffect(() => {
    // checkInternetConnection();
    getLanguage();
    ValidateToken();
  }, []);

  // const checkInternetConnection = () => {
  //   NetInfo.fetch().then((state) => {
  //     !state.isConnected &&
  //       ShowFlash("PLEASE_TURN_ON_WIFI_OR_DATA_NETWORK", "danger", language);
  //   });
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={images.icon_transparent}
        resizeMode="contain"
      />
      <Image
        style={styles.image2}
        source={images.powered_by}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightColor,
    alignItems: "center",
    // justifyContent: "space-between",
  },
  image: {
    height: "90%",
    width: "40%",
  },
  image2: {
    height: "10%",
    width: "20%",
  },
});

const mapStateToProps = ({ user, common }) => {
  return {
    user_status: user.userStatus,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  ValidateToken,
  productGet,
  getLanguage,
})(SplashScreen);
