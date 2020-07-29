import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import EmployeeTransactions from "./EmployeesTransactions";
import colors from "../../utils/colors";
import HeaderOptions from "../../Components/HeaderOptions";
import Employees from "./Employees";
import AddEditForm from "./AddEditEmployee";
import AddEditTransactionForm from "./AddEditTransaction";
import ViewEmployee from "./View";
import Salaries from "./Salaries";
import HeaderTitle from "../../Components/HeaderTitle";

const Employee_StackNavigator = createStackNavigator({
  List: {
    screen: Employees,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EMPLOYEES" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },
  ListTransactions: {
    screen: EmployeeTransactions,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="TRANSACTIONS" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },
  ViewEmployee: {
    screen: ViewEmployee,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.employee.employee_name}{" "}
          </Text>
        ),
        headerRight: () => <HeaderOptions navigationProps={props.navigation} />,
        headerStyle: {
          backgroundColor: colors.darkColor,
        },
        headerStatusBarHeight: 0,
        headerTintColor: colors.white,
        headerTitleStyle: {
          width: 250,
        },
      };
    },
  },
  AddEmployee: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_EMPLOYEE" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditEmployee: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_EMPLOYEE" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  AddTransaction: {
    screen: AddEditTransactionForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_TRANSACTION" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  Salaries: {
    screen: Salaries,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PROCESS_SALARIES" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EditTransaction: {
    screen: AddEditTransactionForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_TRANSACTION" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },
});

export default Employee_StackNavigator;
