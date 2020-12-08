import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import Store from "./Store";
import HeaderTitle from "../../Components/HeaderTitle";
import AddProducts from "./AddProducts";
import Bussiness from '../../screens/settings/Bussiness'
import Orders from './Orders'
import OrderDetails from './OrderDetails'

const Store_StackNavigator = createStackNavigator({
  Store: {
    screen: Store,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="STORE" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  StoreAddProducts: {
    screen: AddProducts,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_PRODUCTS_STORE" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  BussinessEdit: {
    screen: Bussiness,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="BUSINESS" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ORDERS" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ORDERS" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Store_StackNavigator;
