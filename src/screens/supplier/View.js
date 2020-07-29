import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import {
  supplierDelete,
  getSupplierTransactionHistory,
} from "../../store/actions/supplier";
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

const ViewSupplier = (props) => {
  const supplier = props.navigation.state.params.supplier;
  const balanceColor = props.navigation.state.params.color;
  const [options, showOptions] = useState(false);
  const [overlayStatus, setOverlay] = useState(false);

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.supplierDelete(supplier.id);
      },
      props.language
    );
  };

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    props.getSupplierTransactionHistory(supplier.id, filter);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const reload = () => {
    props.getSupplierTransactionHistory(supplier.id, filter);
  };

  const Transaction = props.transaction;

  return props.loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <InfoCard
          title="BALANCE"
          color={balanceColor}
          value={FormatPrice(supplier.current_balance)}
        />
        <InfoCard title="ADDRESS" value={supplier.supplier_address} />
        <InfoCard title="PHONE_NUMBER" value={supplier.supplier_phone} />
        <ActionCard
          messageText={
            supplier.current_balance > 0
              ? `Hey! Please pay your dues. you have to pay ${FormatPrice(
                  supplier.current_balance
                )}`
              : "Hello!"
          }
          phoneNumber={supplier.supplier_phone}
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
              props.getSupplierTransactionHistory(supplier.id, filter);
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
            {getTranslation("DATE", props.language)}
          </Text>
          <Text style={[styles.col, styles.alignText, { flex: 0.4 }]}>
            {getTranslation("DESCRIPTION", props.language)}
          </Text>
          <Text style={[styles.col, styles.alignText]}>
            {getTranslation("BALANCE", props.language)}
          </Text>
        </View>

        <FlatList
          ListEmptyComponent={<EmptyList message="Nothing to Show." />}
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
              <View style={styles.item}>
                <Text style={styles.col}>
                  {FormatDate(item.transaction_date)}
                </Text>
                <Text style={[styles.col, { flex: 0.4 }]}>
                  {item.narration}
                </Text>
                <Text style={[styles.col, { color }]}>
                  {FormatPrice(Balance)}
                </Text>
              </View>
            );
          }}
        />
      </View>

      <FloatingButton
        onClick={() => props.navigation.navigate("EditSupplier", { supplier })}
        icon="edit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  col: {
    flex: 0.3,
    fontFamily: "PrimaryFont",
  },
  alignText: {
    textAlign: "left",
  },
});

const mapStateToProps = ({ common, supplier }) => {
  return {
    loading: common.loading,
    transaction: supplier.transaction,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  supplierDelete,
  getSupplierTransactionHistory,
})(ViewSupplier);
