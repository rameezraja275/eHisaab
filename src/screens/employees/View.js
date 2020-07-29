import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import { employeeDelete, getTransactions } from "../../store/actions/employees";
import InfoCard from "../../Components/InfoCard";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import FloatingButton from "../../Components/FloatingButton";
import OptionsAction from "../../Components/Options";
import {
  FormatPrice,
  FormatDate,
  employeeTransactionType,
} from "../../utils/helper";
import { showAlert } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";

const ViewEmployee = (props) => {
  const employee = props.navigation.state.params.employee;
  const language = props.language;
  const [options, showOptions] = useState(false);
  const [overlayStatus, setOverlay] = useState(false);

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.employeeDelete(employee.id);
      },
      language
    );
  };

  useEffect(() => {
    props.getTransactions(employee.id, filter);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  const reload = () => {
    props.getTransactions(employee.id, filter);
  };

  const Transaction = props.transaction;
  const color = employee.current_balance > 0 ? colors.danger : colors.success;

  return props.loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <InfoCard
          title="BALANCE"
          value={FormatPrice(employee.current_balance)}
          color={color}
        />
        <InfoCard
          title="SALARY"
          value={FormatPrice(employee.employee_salary)}
        />
        <InfoCard title="ADDRESS" value={employee.employee_address} />
        <InfoCard title="PHONE_NUMBER" value={employee.employee_phone} />
        <ActionCard
          messageText={
            employee.current_balance < 0
              ? `Hey! Please pay your dues. you have to pay ${FormatPrice(
                  employee.current_balance
                )}`
              : "Hello!"
          }
          phoneNumber={employee.employee_phone}
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
              props.getTransactions(employee.id, filter);
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
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("DATE", language)}{" "}
          </Text>
          <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
            {getTranslation("DESCRIPTION", language)}{" "}
          </Text>
          <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
            {getTranslation("TYPE", language)}{" "}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("BALANCE", language)}{" "}
          </Text>
        </View>

        <FlatList
          ListEmptyComponent={<EmptyList message="No Transactions." />}
          data={Transaction}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reload} />
          }
          // dr payable
          renderItem={({ item }) => {
            const { dr, cr } = item;
            const Balance = dr == "0" ? (cr == "0" ? 0 : cr) : dr;
            const color =
              dr == "0"
                ? cr == "0"
                  ? colors.success
                  : colors.success
                : colors.danger;
            return (
              <View style={styles.item}>
                <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
                  {FormatDate(item.transaction_date)}
                </Text>
                <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
                  {item.narration}
                </Text>
                <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
                  {employeeTransactionType(item.transaction_type)}
                </Text>
                <Text
                  style={{
                    flex: 0.2,
                    color: color,
                    fontFamily: "PrimaryFont",
                  }}
                >
                  {FormatPrice(Balance)}
                </Text>
              </View>
            );
          }}
        />
      </View>

      <FloatingButton
        onClick={() => props.navigation.navigate("EditEmployee", { employee })}
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
});

const mapStateToProps = ({ common, employee }) => {
  return {
    loading: common.loading,
    transaction: employee.employeeTransactions,
    language: common.language,
  };
};

export default connect(mapStateToProps, { employeeDelete, getTransactions })(
  ViewEmployee
);
