import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/AntDesign";
import SignupScreen from "./SignUpScreen";
import SigninScreen from "./SigninScreen";
import colors from "../../utils/colors";
import VerficationScreen from "./Verification";
import ChangePasswordScreen from "./ChangePassword";
import ForgotPasswordScreen from "./ForgotPassword";
import HeaderTitle from "../../Components/HeaderTitle";

const AuthNavigation = createStackNavigator({
  Signin: {
    screen: SigninScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EHisaab" />,
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.darkColor },
      //
    }),
  },
  Verfication: {
    screen: VerficationScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="VERFICATION" />,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.state.params.onLogout()}>
            <Icon
              style={{ margin: 20, color: colors.danger }}
              name="poweroff"
              size={20}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.darkColor },
    }),
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CHANGE_PASSWORD" />,
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.darkColor },
    }),
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="FORGOT_PASSWORD" />,
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.darkColor },
    }),
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SIGN_UP" />,
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.darkColor },
    }),
  },
});

export default AuthNavigation;
