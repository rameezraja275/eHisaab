import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import HeaderOptions from "../../Components/HeaderOptions";
import Dashboard from './dashboard';
import HeaderTitle from "../../Components/HeaderTitle";

const Dashboard_StackNavigator = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="DASHBOARD" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Dashboard_StackNavigator;
