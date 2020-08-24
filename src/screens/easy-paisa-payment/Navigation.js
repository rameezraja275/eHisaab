import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import PaymentsScreen from "./PaymentScreen";
import colors from "../../utils/colors";

import HeaderTitle from "../../Components/HeaderTitle";

const PaymentsNavigation = createStackNavigator({
    Payments: {
        screen: PaymentsScreen,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="Payments" />,
            headerTintColor: colors.white,
            headerStyle: { backgroundColor: colors.darkColor },
            //
        }),
    },
});

export default PaymentsNavigation
