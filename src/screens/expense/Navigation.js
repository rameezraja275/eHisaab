import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import Expense from "./Transactions";
import AddEditForm from "./AddEditTransaction";
import colors from "../../utils/colors";
import HeaderOptions from "../../Components/HeaderOptions";
import Categories from "./ExpenseCategories";
import AddEditCategories from "./AddEditExpenseCategories";
import ViewCategoryTransactions from "./CategoryTransaction";
import HeaderTitle from "../../Components/HeaderTitle";

const Expense_StackNavigator = createStackNavigator({
  ListCategories: {
    screen: Categories,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EXPENSES" />,
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
    screen: Expense,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EXPENSE_TRANSACTIONS" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },
  AddExpenseTransaction: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_EXPENSE" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },

  EditExpenseTransaction: {
    screen: AddEditForm,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_EXPENSE" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerStatusBarHeight: 0,
      headerTintColor: colors.white,
    }),
  },
  AddExpenseCategories: {
    screen: AddEditCategories,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_EXPENSE_CATEGORY" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  EditExpenseCategories: {
    screen: AddEditCategories,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_EXPENSE_CATEGORY" />,
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  ViewCategoryTransactions: {
    screen: ViewCategoryTransactions,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.expenseCategory.expense_name}{" "}
          </Text>
        ),
        headerStatusBarHeight: 0,
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
});

export default Expense_StackNavigator;
