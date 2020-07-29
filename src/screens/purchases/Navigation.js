import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import PurchaseScreen from "./Purchase";
import HamBurger from "../../Components/HamBurger";
import HeaderOptions from "../../Components/HeaderOptions";
import colors from "../../utils/colors";
import Detail from "./Detail";
import CheckOut from "./CheckOut";
import TransactionsScreen from "./Transactions";
import Icon from "react-native-vector-icons/AntDesign";
import HeaderTitle from "../../Components/HeaderTitle";

const Purchase_StackNavigator = createStackNavigator({
  List: {
    screen: PurchaseScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ListTransactions: {
    screen: TransactionsScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE_TRANSACTIONS" />,
      headerStatusBarHeight: 0,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.resetPurchaseCart();
            }}
          >
            <Icon
              style={{ margin: 15, color: colors.white }}
              name="arrowleft"
              size={23}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  Details: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE_DETAILS" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  PurchaseReturn: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE_RETURN" />,
      headerStatusBarHeight: 0,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  CheckOut: {
    screen: CheckOut,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CHECKOUT" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Purchase_StackNavigator;
