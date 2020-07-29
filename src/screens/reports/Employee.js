import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import { employeeReport } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateRangeFilter";
import { employeeTransactionType } from "../../utils/helper";

const ExpenseReport = (props) => {
  const { language, employeeReport, transaction, navigation, loading } = props;
  const [overlayStatus, setOverlay] = useState(false);

  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // const [ total ,setTotal ] = useState({
  //     total_expense:0,
  // })

  useEffect(() => {
    employeeReport(filter, 0);
  }, []);

  const reload = () => {
    employeeReport(filter, 0);
  };

  // const [total, setTotal] = useState({
  //   total_cr: 0,
  //   total_dr: 0,
  // });

  // useEffect(() => {
  //   let total_dr = 0;
  //   let total_cr = 0;
  //   for (let i = 0; i < transaction.length; i++) {
  //     const { dr, cr } = transaction[i];
  //     if (dr > 0) {
  //       total_dr = total_dr + Number(transaction[i].dr);
  //     } else if (cr > 0) {
  //       total_cr = total_cr - Number(transaction[i].cr);
  //     }
  //   }
  //   setTotal({
  //     total_cr,
  //     total_dr,
  //   });
  // }, [transaction]);

  return loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <ActionCard
          toggleFilter={() => setOverlay(true)}
          date={
            filter.startDate.toDateString() +
            " - " +
            filter.endDate.toDateString()
          }
        />
      </View>

      {overlayStatus && (
        <Overlay toggleFilter={() => setOverlay(false)} title="FILTERS">
          <Filters
            data={filter}
            setStartDate={(text) => {
              setFilter({ ...filter, endDate: new Date(), startDate: text });
            }}
            onSubmit={() => {
              setOverlay(false);
              employeeReport(filter, 0);
            }}
            setEndDate={(text) => {
              setFilter({ ...filter, endDate: text });
            }}
          />
        </Overlay>
      )}

      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("DATE", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("NAME", language)}
          </Text>
          <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
            {getTranslation("TYPE", language)}
          </Text>
          <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
            {getTranslation("AMOUNT", language)}
          </Text>
        </View>
        <FlatList
          ListEmptyComponent={<EmptyList />}
          data={transaction}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reload} />
          }
          renderItem={({ item }) => {
            const { dr, cr } = item;
            const amount = dr > 0 ? dr : cr;
            return (
              <View style={styles.item}>
                <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
                  {FormatDate(item.transaction_date)}
                </Text>
                <Text style={{ flex: 0.2, fontFamily: "PrimaryFont" }}>
                  {item.employee_name}
                </Text>
                <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
                  {employeeTransactionType(item.transaction_type)}
                </Text>
                <Text
                  style={{
                    fontFamily: "PrimaryFont",
                    flex: 0.2,
                    color: cr > 0 ? colors.success : colors.danger,
                  }}
                >
                  {FormatPrice(amount)}
                </Text>
              </View>
            );
          }}
        />

        {/* <View style={styles.footer}>
          <Text style={{ flex: 0.7 }}>
            {getTranslation("TOTAL_AMOUNT_PAID_EMPLOYEES", language)}{" "}
          </Text>
          <Text style={{ flex: 0.3 }}>{FormatPrice(total.total_cr)}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={{ flex: 0.7 }}>
            {getTranslation("TOTAL_AMOUNT_EARNED_EMPLOYEES", language)}{" "}
          </Text>
          <Text style={{ flex: 0.3 }}>{FormatPrice(total.total_dr)}</Text>
        </View> */}
      </View>
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
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 0.5,
  },
  item: {
    flexDirection: "row",
    padding: 10,
  },
  footer: {
    position: "relative",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    borderTopColor: colors.borderColor,
    borderTopWidth: 0.5,
  },
});

const mapStateToProps = ({ common, reports }) => {
  return {
    loading: common.loading,
    language: common.language,
    transaction: reports.employeeReport,
  };
};

export default connect(mapStateToProps, { employeeReport })(ExpenseReport);
