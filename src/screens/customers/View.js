import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import {
  customerDelete,
  getCustomerTransactionHistory,
} from "../../store/actions/customer";
import InfoCard from "../../Components/InfoCard";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import FloatingButton from "../../Components/FloatingButton";
import OptionsAction from "../../Components/Options";
import { FormatPrice, FormatDate } from "../../utils/helper";
import { showAlert } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import constants from "../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewCustomer = (props) => {
  const customer = props.navigation.state.params.customer;
  const color = props.navigation.state.params.color;
  const { language } = props;
  const [options, showOptions] = useState(false);
  const [overlayStatus, setOverlay] = useState(false);
  const URDU = constants.URDU;
  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });
  const styles = getStyles({ language, URDU });
  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.customerDelete(customer.id);
      },
      language
    );
  };

  useEffect(() => {
    props.getCustomerTransactionHistory(customer.id, filter);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const reload = () => {
    props.getCustomerTransactionHistory(customer.id, filter);
  };

  const navigateOnLedgerDetailClicked = (item) => {
    if (item.module_id === "3") {
      props.navigation.navigate("SaleDetailedReport", { sale: { ...item, sale_date: item.transaction_date, id: item.ref_id } })
    } else if (item.loan_given == "1") {
      props.navigation.navigate("EditCustomerLoan", { customer, transaction: item })
    }
  }

  const Transaction = props.transaction;

  return props.loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <InfoCard
          title="BALANCE"
          value={FormatPrice(customer.current_balance)}
          color={color}
        />
        <InfoCard title="ADDRESS" value={customer.customer_address} />
        <InfoCard title="PHONE_NUMBER" value={customer.customer_phone} />
        <ActionCard
          openAdjustAmount={() => { props.navigation.navigate("AddCustomerLoan", { customer }) }}
          messageText={
            customer.current_balance > 0
              ?
              `Hi ${customer.customer_name}, ${String.fromCharCode(10)}${String.fromCharCode(10)}` +
              `Your payment of ${FormatPrice(customer.current_balance)} is due, Please make a payment.${String.fromCharCode(10)}` +
              `Thank you. ${String.fromCharCode(10)}${String.fromCharCode(10)}` +
              `Powered by eHisaab.${String.fromCharCode(10)}` +
              `Product by Pine Technologies`
              : "Hello!"
          }
          phoneNumber={customer.customer_phone}
          toggleFilter={() => setOverlay(true)}
          date={
            filter.filter_type == "1"
              ? filter.date.toDateString()
              : `${filter.date.getMonth() + 1} / ${filter.date.getFullYear()}`
          }
        />
      </View>

      {overlayStatus && (
        <Overlay toggleFilter={() => setOverlay(false)} title="FILTERS">
          <Filters
            data={filter}
            setDate={(text) => {
              setFilter({ ...filter, date: text });
            }}
            onSubmit={() => {
              setOverlay(false);
              props.getCustomerTransactionHistory(customer.id, filter);
            }}
            setType={(text) => setFilter({ ...filter, filter_type: text })}
          />
        </Overlay>
      )}

      <OptionsAction
        status={options}
        close={showOptions}
        title="DELETE"
        onSelect={onDelete}
        danger={true}
      />

      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={[styles.col, styles.alignText]}>
            {getTranslation("DATE", language)}
          </Text>
          <Text style={[styles.col, styles.alignText, { flex: 0.4 }]}>
            {getTranslation("DESCRIPTION", language)}
          </Text>
          <Text style={[styles.col, styles.alignText]}>
            {getTranslation("BALANCE", language)}
          </Text>
        </View>

        <FlatList
          ListEmptyComponent={<EmptyList message="No Transactions Yet." />}
          data={Transaction}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reload} />
          }
          renderItem={({ item }) => {
            const { dr, cr } = item;
            const Balance = dr == "0" ? (cr == "0" ? 0 : cr) : dr;
            const color =
              dr == "0"
                ? cr == "0"
                  ? colors.success
                  : colors.danger
                : colors.success;
            return (
              <TouchableOpacity style={styles.item} onPress={() => { navigateOnLedgerDetailClicked(item) }} >
                {/* <TouchableOpacity style={styles.item} onPress={() => { item.loan_given == "1" && props.navigation.navigate("EditCustomerLoan", { customer, transaction: item }) }} ></TouchableOpacity> */}
                <Text style={styles.col}>
                  {FormatDate(item.transaction_date)}
                </Text>
                <Text style={[styles.col, { flex: 0.4 }]}>
                  {item.narration}
                </Text>
                <Text style={[styles.col, { color }]}>
                  {FormatPrice(Balance)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FloatingButton
        onClick={() => props.navigation.navigate("EditCustomer", { customer })}
        icon="edit"
      />
    </View>
  );
};

const getStyles = ({ language, URDU }) =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
    },
    infobox: {
      backgroundColor: colors.darkColor,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
      paddingBottom: 15,
    },
    table: {
      flex: 1,
    },
    head: {
      flexDirection: "row",
      margin: 10,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
    },
    item: {
      flexDirection: "row",
      justifyContent: "center",
      margin: 10,
    },
    col: {
      flex: 0.3,
      fontFamily: "PrimaryFont",
    },
    alignText: {
      textAlign: "left",
    },
  });

const mapStateToProps = ({ common, customer }) => {
  return {
    loading: common.loading,
    transaction: customer.transaction,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  customerDelete,
  getCustomerTransactionHistory,
})(ViewCustomer);
