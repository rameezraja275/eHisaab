import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import Suppliers from "./Suppliers";
import AddEditForm from "./AddEditSupplier";
import colors from "../../utils/colors";
import ViewSuppliers from "./View";
import HeaderOptions from "../../Components/HeaderOptions";
// import SupplierPayment from "./Payments";
// import AddEditPayment from "../payments/AddEditPayment";
import HeaderTitle from "../../Components/HeaderTitle";

const Suppliers_StackNavigator = createStackNavigator({
  List: {
    screen: Suppliers,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SUPPLIERS" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      // headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },
  ViewSupplier: {
    screen: ViewSuppliers,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.supplier.supplier_name}{" "}
          </Text>
        ),
        headerRight: () => <HeaderOptions navigationProps={props.navigation} />,
        headerStyle: {
          backgroundColor: colors.darkColor,
        },

        headerTintColor: colors.white,
        headerTitleStyle: {
          width: 250,
        },
      };
    },
  },
  AddSupplier: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_SUPPLIER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditSupplier: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_SUPPLIER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  // AddPayment: {
  //   screen: AddEditPayment,
  //   navigationOptions: ({ navigation }) => ({
  //     title: <HeaderTitle title="ADD_PAYMENT" />,
  //     headerStyle: {
  //       backgroundColor: colors.darkColor,
  //     },

  //     headerTintColor: colors.white,
  //   }),
  // },
  // EditPayment: {
  //   screen: AddEditPayment,
  //   navigationOptions: ({ navigation }) => ({
  //     title: <HeaderTitle title="UPDATE_PAYMENT" />,
  //     headerRight: () => <HeaderOptions navigationProps={navigation} />,
  //     headerStyle: {
  //       backgroundColor: colors.darkColor,
  //     },

  //     headerTintColor: colors.white,
  //   }),
  // },

  // PaymentSupplier: {
  //   screen: SupplierPayment,
  //   navigationOptions: ({ navigation }) => ({
  //     title: <HeaderTitle title="PAYMENTS" />,

  //     headerStyle: {
  //       backgroundColor: colors.darkColor,
  //     },
  //     headerTintColor: colors.white,
  //   }),
  // },
});

export default Suppliers_StackNavigator;
