import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import HeaderOptions from "../../Components/HeaderOptions";
import Banks from "./Banks";
import HeaderTitle from "../../Components/HeaderTitle";
import Transactions from "./Transactions";
import AddEditBank from './AddEditBank'
import BankLedger from './BankLedger'
import AddEditTransaction from './AddEditTransaction'

const Bank_StackNavigator = createStackNavigator({
  Banks: {
    screen: Banks,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="BANKS" />,
      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },
  ListTransactions: {
    screen: Transactions,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="BANK_TRANSACTIONS" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },
  AddBankTransaction: {
    screen: AddEditTransaction,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_TRANSACTION" />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  EditBankTransaction: {
    screen: AddEditTransaction,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_TRANSACTION" />,
      headerRight: () => <HeaderOptions navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },

      headerTintColor: colors.white,
    }),
  },
  AddBank: {
    screen: AddEditBank,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="ADD_BANK" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  EditBank: {
    screen: AddEditBank,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="UPDATE_BANK" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },

  BankLedger: {
    screen: BankLedger,
    navigationOptions: (props) => {
      return {
        title: (
          <Text style={{ fontFamily: "PrimaryFont" }}>
            {props.navigation.state.params.bank.bank_name}{" "}
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
});

export default Bank_StackNavigator;
