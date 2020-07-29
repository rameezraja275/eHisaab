import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getTranslation } from "../../utils/language";
import colors from "../../utils/colors";
import ListItemContainer from "../../Components/ListItemContainer";
import constants from "../../utils/constants";

const Reports = ({ language, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ListItemContainer onClick={() => navigation.navigate("SaleReport")}>
        <Text style={styles.title}>
          {getTranslation("SALE_REPORT", language)}{" "}
        </Text>
      </ListItemContainer>

      <ListItemContainer onClick={() => navigation.navigate("PurchaseReport")}>
        <Text style={styles.title}>
          {getTranslation("PURCHASE_REPORT", language)}{" "}
        </Text>
      </ListItemContainer>

      <ListItemContainer onClick={() => navigation.navigate("ExpenseReport")}>
        <Text style={styles.title}>
          {getTranslation("EXPENSE_REPORT", language)}{" "}
        </Text>
      </ListItemContainer>

      {/* <ListItemContainer onClick={() => navigation.navigate("EmployeeReport")}>
        <Text style={styles.title}>
          {getTranslation("EMPLOYEE_REPORT", language)}{" "}
        </Text>
      </ListItemContainer> */}

      <ListItemContainer
        onClick={() => navigation.navigate("ProfitnLossStatement")}
      >
        <Text style={styles.title}>
          {getTranslation("PROFIT_LOSS_STATEMENT", language)}{" "}
        </Text>
      </ListItemContainer>

      <ListItemContainer onClick={() => navigation.navigate("DayBook")}>
        <Text style={styles.title}>{getTranslation("DAYBOOK", language)} </Text>
      </ListItemContainer>

      <ListItemContainer onClick={() => navigation.navigate("CashBook")}>
        <Text style={styles.title}>
          {getTranslation("CASHBOOK", language)}{" "}
        </Text>
      </ListItemContainer>
    </ScrollView>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    language: common.language,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "PrimaryFont",
  },
  dangerText: {
    color: colors.danger,
  },
});

export default connect(mapStateToProps, {})(Reports);
