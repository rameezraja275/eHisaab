import React from "react";
import { Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import SliderBar from "../Components/Sliderbar";
import Sale_StackNavigator from "./sale/Navigation";
import Purchase_StackNavigator from "./purchases/Navigation";
import Prodcuts_StackNavigator from "./products/Navigation";
import Customers_StackNavigator from "./customers/Navigation";
import AuthNavigation from "./auth/Navigation";
import SplashScreen from "./SplashScreen";
import Suppliers_StackNavigator from "./supplier/Navigation";
import Expense_StackNavigator from "./expense/Navigation";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import color from "../utils/colors";
import Settings_StackNavigator from "./settings/Navigation";
import Employee_StackNavigator from "./employees/Navigation";
import Dashboard_StackNavigator from "./dashboard/Navigation";
import DrawerLable from "../Components/DraweLabel";
import Reports_StackNavigator from "./reports/Navigation";
import Receipt_StackNavigator from "./receipts/Navigation";
import Payments_StackNavigator from "./payments/Navigation";
import Bank_StackNavigator from './bank/Navigation'
import OnlineStore_StackNavigator from './onlineStore/Navigation'

const Drawer = createDrawerNavigator(
  {
    SaleScreen: {
      screen: Sale_StackNavigator,
      contentComponent: <Text> This is it </Text>,
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
    DashboardScreen: {
      screen: Dashboard_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="DASHBOARD" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="dashboard" size={20} color={tintColor} />
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
        drawerLabel: <DrawerLable title="CUSTOMER" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="idcard" size={20} color={tintColor} />
        ),
      },
    },
    ReceiptScreen: {
      screen: Receipt_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="RECEIPTS" />,
        drawerIcon: ({ tintColor }) => (
          <FontAwesome5 name="receipt" size={20} color={tintColor} />
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
    PayementScreen: {
      screen: Payments_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="PAYMENTS" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="creditcard" size={20} color={tintColor} />
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

    MyOnlineStore: {
      screen: OnlineStore_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="MYSTORE" />,
        drawerIcon: ({ tintColor }) => (
          <Material name="store" size={20} color={tintColor} />
        ),
      }
    },

    ExpenseScreen: {
      screen: Expense_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="EXPENSES" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="book" size={20} color={tintColor} />
        ),
      },
    },

    BankScreen: {
      screen: Bank_StackNavigator,
      navigationOptions: {
        drawerLabel: <DrawerLable title="BANKS" />,
        drawerIcon: ({ tintColor }) => (
          <Icon name="bank" size={20} color={tintColor} />
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
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      /* header: null */
    },
  },
});

export default createAppContainer(Navigation);
