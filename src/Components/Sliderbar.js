import React, { Fragment } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { DrawerNavigatorItems, DrawerItems } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/AntDesign";
import color from "../utils/colors";
import constants from "../utils/constants";
import images from "../utils/images";
import api from '../store/api'
import { Badge } from 'react-native-elements'

const Sliderbar = (props) => {
  const { bussiness, user, items, totalUnreadOrder, ...rest } = props;

  const Items =
    user.user_level != constants.ADMIN_LEVEL_USER
      ? items.filter((item) => {
        if (item.key != "ReportsScreen") {
          return item;
        }
      })
      : items;


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
      <SafeAreaView style={{ paddingTop: 10 }}>
        <DrawerItems items={Items} {...props} getLabel={(scene) => {
          console.log("thisis ", scene)
          return <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {props.getLabel(scene)}
            {scene.route.routeName === "MyOnlineStore" && totalUnreadOrder && <Badge status="error" value={totalUnreadOrder} textStyle={{ margin: 8 }} />}
          </View>
        }} />
        {/* <DrawerNavigatorItems
          items={Items}
          {...rest}
          drawerStyle={{ color: "#c6cbef" }}
        /> */}
      </SafeAreaView>
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

const mapStateToProps = ({ bussiness, user, orders }) => {
  return {
    bussiness: bussiness.bussiness,
    user: user.currentUser,
    totalUnreadOrder: orders.totalUnreadOrder
  };
};

export default connect(mapStateToProps, {})(Sliderbar);
