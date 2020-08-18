import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Settings from "./Settings";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import Bussiness from "./Bussiness";
import Users from "./Users/Users";
import AddEditForm from "./Users/AddEditUser";
import ChangePasswordScreen from "./ChangePassword";
import ProfileScreen from "./Profile";
import HeaderTitle from "../../Components/HeaderTitle";
import TutorialsScreen from "./Tutorials";

const Sale_StackNavigator = createStackNavigator({
  SettingsList: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SETTINGS" />,

      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  Bussiness: {
    screen: Bussiness,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="BUSINESS" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  OwnerProfile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="OWNER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ListUsers: {
    screen: Users,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="USERS" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  AddUser: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_USER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditUser: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_USER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CHANGE_PASSWORD" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  Tutorials: {
    screen: TutorialsScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="TUTORIAL" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

});

export default Sale_StackNavigator;
