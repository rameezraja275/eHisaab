import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import SliderBar from "../Components/Sliderbar";
import Sale_StackNavigator from "./sale/Navigation";
import Purchase_StackNavigator from "./purchases/Navigation";
import Prodcuts_StackNavigator from "./products/Navigation";
import Customers_StackNavigator from "./customers/Navigation";
import AuthNavigation from "./auth/Navigation";
import SplashScreen from "./SplashScreen";
import PaymentScreen from './payment/PaymentScreen'
import Suppliers_StackNavigator from "./supplier/Navigation";
import Expense_StackNavigator from "./expense/Navigation";
import Icon from "react-native-vector-icons/AntDesign";
import color from "../utils/colors";
import Settings_StackNavigator from "./settings/Navigation";
import Employee_StackNavigator from "./employees/Navigation";
import DrawerLable from "../Components/DraweLabel";
import Reports_StackNavigator from "./reports/Navigation";
import PaymentsNavigation from "./payment/Navigation";

const Drawer = createDrawerNavigator(
  {
    SaleScreen: {
      screen: Sale_StackNavigator,

      navigationOptions: {
        drawerLabel: <DrawerLable title="SALE" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="tagso" size={20} color={tintColor} />
        ),
      },
    },
    PurchaseScreen: {
      screen: Purchase_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="PURCHASES" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="shoppingcart" size={20} color={tintColor} />
        ),
      },
    },
    ProductScreen: {
      screen: Prodcuts_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="PRODUCTS_SERVICES" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="database" size={20} color={tintColor} />
        ),
      },
    },
    CustomersScreen: {
      screen: Customers_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="CUSTOMERS" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="idcard" size={20} color={tintColor} />
        ),
      },
    },
    SuppliersScreen: {
      screen: Suppliers_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="SUPPLIERS" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="contacts" size={20} color={tintColor} />
        ),
      },
    },
    // EmployeeScreen: {
    //   screen: Employee_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: <DrawerLable title="EMPLOYEES" />,
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="profile" size={20} color={tintColor} />
    //     ),
    //   },
    // },
    ExpenseScreen: {
      screen: Expense_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="EXPENSES" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="book" size={20} color={tintColor} />
        ),
      },
    },
    ReportsScreen: {
      screen: Reports_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="REPORTS" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="barschart" size={20} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: Settings_StackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    initialRouteName: "SaleScreen",
    unmountInactiveRoutes: true,
    contentComponent: (props) => <SliderBar {...props} />,
    contentOptions: {
      activeTintColor: color.primaryColor,
      inactiveTintColor: color.darkColor,
      inactiveBackgroundColor: "transparent",
    },
  }
);

const Navigation = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  Auth: { screen: AuthNavigation },
  Payment: {
    screen: PaymentsNavigation,

  },
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      /* header: null */
    },
  },
});

export default createAppContainer(Navigation);
