import React, { Fragment } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/AntDesign";
import color from "../utils/colors";
import constants from "../utils/constants";
import images from "../utils/images";
import api from '../store/api'
const Sliderbar = (props) => {
  const { bussiness, user, items, ...rest } = props;

  const Items =
    user.user_level != constants.ADMIN_LEVEL_USER
      ? items.filter((item) => {
        if (item.key != "ReportsScreen") {
          return item;
        }
      })
      : items;

  console.log("logo", api.IMAGE_URL + bussiness.logo)

  return (
    <ScrollView style={{ width: "100%", height: "100%" }}>
      <View style={styles.headerContainer}>
        <View style={styles.bgContainer}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            {bussiness.logo != "" && (
              <Image
                style={{ width: 70, height: 70 }}
                source={{ uri: api.IMAGE_URL + bussiness.logo }}
              />
            )}
            <Text style={styles.headerText}>{bussiness.name}</Text>
            {user.full_name && (
              <Text
                style={{ color: color.lightColor, fontFamily: "PrimaryFont" }}
              >
                {user.full_name}
              </Text>
            )}
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SettingsList")}
            >
              <Icon
                style={{ margin: 10 }}
                name="setting"
                size={20}
                color={color.lightColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <ScrollView> */}
      <View style={{ paddingTop: 10 }}>
        <DrawerNavigatorItems
          items={Items}
          {...rest}
          drawerStyle={{ color: "#c6cbef" }}
        />
      </View>
      {/* </ScrollView> */}

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          alignItems: "flex-end",
        }}
      >
        <Image
          style={{ width: 130, height: 43 }}
          source={images.logo_horizontal_trans}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 160,
    // width: 280,
  },
  bgContainer: {
    flex: 1,
    // width: 280,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.darkColor,
  },
  headerText: {
    color: color.lightColor,
    marginTop: 10,
    fontFamily: "PrimaryFont",
  },
});

const mapStateToProps = ({ bussiness, user }) => {
  return {
    bussiness: bussiness.bussiness,
    user: user.currentUser,
  };
};

export default connect(mapStateToProps, {})(Sliderbar);
