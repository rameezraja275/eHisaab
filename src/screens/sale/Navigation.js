import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import SaleScreen from "./Sale";
import { View, TouchableOpacity, StatusBar } from "react-native";
import HamBurger from "../../Components/HamBurger";
import AddNonInventoryItem from "./AddNonInventory";
import CheckOutScreen from "./CheckOut";
import colors from "../../utils/colors";
import Detail from "./Details";
import HeaderOptions from "../../Components/HeaderOptions";
import TransactionsScreen from "./Transactions";
import Icon from "react-native-vector-icons/AntDesign";
import BillScreen from "./Bill";
import AddEditForm from "../customers/AddEditCustomer";
import QuotationScreen from "./Quotation";
import HeaderTitle from "../../Components/HeaderTitle";

const Sale_StackNavigator = createStackNavigator({
  List: {
    screen: SaleScreen,
    navigationOptions: ({ navigation }) => {
      // console.log(navigation);
      return {
        title: <HeaderTitle title="SALE" />,
        headerLeft: () => <HamBurger navigationProps={navigation} />,
        headerRight: () => <HeaderOptions navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: colors.darkColor,
        },
        headerStatusBarHeight: 0,
        headerTintColor: colors.white,
      };
    },
  },

  Details: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SALE_DETAILS" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },

  SaleReturn: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SALE_RETURN" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },

  ListTransactions: {
    screen: TransactionsScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SALE_TRANSACTIONS" />,
      headerStatusBarHeight: 0,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.resetSaleCart();
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

  CheckOut: {
    screen: CheckOutScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CHECKOUT" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  AddNonInventoryItem: {
    screen: AddNonInventoryItem,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_NON_INVENTORY_ITEM" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
      headerStatusBarHeight: 0,
    }),
  },
  Bill: {
    screen: BillScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="BILL" />,
      headerStatusBarHeight: 0,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.resetSaleCart();
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
  Quotation: {
    screen: QuotationScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="QUOTATION" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  AddCustomer: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_CUSTOMER" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Sale_StackNavigator;
