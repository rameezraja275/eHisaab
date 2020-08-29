import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import Customers from "./Customers";
import AddEditForm from "./AddEditCustomer";
import colors from "../../utils/colors";
import ViewCustomer from "../../screens/customers/View";
import HeaderOptions from "../../Components/HeaderOptions";
// import CustomerReceipt from "./Receipt";
// import AddEditReceipt from "./AddEditRecepit";
// import PDFScreen from "./ReceiptPDF";
// import Icon from "react-native-vector-icons/AntDesign";
import HeaderTitle from "../../Components/HeaderTitle";
import CustomerLoan from "./CustomerLoan";

const Customers_StackNavigator = createStackNavigator({
  List: {
    screen: Customers,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CUSTOMERS" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      // headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ViewCustomer: {
    screen: ViewCustomer,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.customer.customer_name}{" "}
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
  AddCustomer: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_CUSTOMER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditCustomer: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_CUSTOMER" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  AddCustomerLoan: {
    screen: CustomerLoan,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_LOAN" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },
  EditCustomerLoan: {
    screen: CustomerLoan,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EDIT_LOAN" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },


});

export default Customers_StackNavigator;
