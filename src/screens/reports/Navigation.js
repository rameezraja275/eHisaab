import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ReportsList from "./Reports";
import HamBurger from "../../Components/HamBurger";
import colors from "../../utils/colors";
import Sale from "./Sale";
import Purchase from "./Purchase";
import HeaderTitle from "../../Components/HeaderTitle";
import PurchaseDetails from "./PurchaseDetail";
import SaleDetails from "./SaleDetail";
import Expense from "./Expense";
import Employee from "./Employee";
import ProfitAndLoss from "./ProfitAndLoss";
import Daybook from "./DayBook";
import Cashbook from "./CashBook"
import CashbookPDF from './PdfReports/CashBook'

const Report_StackNavigator = createStackNavigator({
  ReportsList: {
    screen: ReportsList,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="REPORTS" />,

      headerLeft: () => <HamBurger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  SaleReport: {
    screen: Sale,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SALE_REPORT" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  PurchaseReport: {
    screen: Purchase,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE_REPORT" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  PurchaseDetailedReport: {
    screen: PurchaseDetails,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PURCHASE_DETAIL" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  SaleDetailedReport: {
    screen: SaleDetails,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="SALE_DETAIL" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ExpenseReport: {
    screen: Expense,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EXPENSE_REPORT" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  EmployeeReport: {
    screen: Employee,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="EMPLOYEE_REPORT" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  ProfitnLossStatement: {
    screen: ProfitAndLoss,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="PROFIT_LOSS_STATEMENT" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  DayBook: {
    screen: Daybook,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="DAYBOOK" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  CashBook: {
    screen: Cashbook,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CASHBOOK" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
  CashBookPDF: {
    screen: CashbookPDF,
    navigationOptions: ({ navigation }) => ({
      title: <HeaderTitle title="CASHBOOK" />,

      headerStyle: {
        backgroundColor: colors.darkColor,
      },
      headerTintColor: colors.white,
    }),
  },
});

export default Report_StackNavigator;
