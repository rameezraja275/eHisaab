import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import Store from "./Store";
import HeaderTitle from "../../Components/HeaderTitle";

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
  }
});

export default Store_StackNavigator;
