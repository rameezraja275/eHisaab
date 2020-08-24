import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
// import Suppliers from "./Suppliers";
// import AddEditForm from "./AddEditSupplier";
import colors from "../../utils/colors";
// import ViewSuppliers from "./View";
import HeaderOptions from "../../Components/HeaderOptions";
import SupplierPayment from "./Payments";
import AddEditPayment from "./AddEditPayment";
import HeaderTitle from "../../Components/HeaderTitle";

const Payments_StackNavigator = createStackNavigator({
    PaymentSupplier: {
        screen: SupplierPayment,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="PAYMENTS" />,
            headerLeft: () => <HamBurger navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },
            headerTintColor: colors.white,
        }),
    },
    AddPayment: {
        screen: AddEditPayment,
        navigationOptions: ({ navigation }) => ({

            title: <HeaderTitle title="ADD_PAYMENT" />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },

            headerTintColor: colors.white,
        }),
    },
    EditPayment: {
        screen: AddEditPayment,
        navigationOptions: ({ navigation }) => ({
            title: <HeaderTitle title="UPDATE_PAYMENT" />,
            headerRight: () => <HeaderOptions navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: colors.darkColor,
            },

            headerTintColor: colors.white,
        }),
    },


});

export default Payments_StackNavigator;
