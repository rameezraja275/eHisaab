import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { expenseReport } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateRangeFilter";
import constants from "../../utils/constants";
import ReportFooter from "../../Components/ReportFooter";

const ExpenseReport = (props) => {
  const { language, expenseReport, transaction, navigation, loading } = props;
  const [overlayStatus, setOverlay] = useState(false);
  const URDU = constants.URDU;

  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [total, setTotal] = useState({
    total_expense: 0,
  });

  useEffect(() => {
    expenseReport(filter, 0);
  }, []);

  const reload = () => {
    expenseReport(filter, 0);
  };

  let total_expense = 0;

  useEffect(() => {
    total_expense = 0;
    for (let i = 0; i < transaction.length; i++) {
      total_expense = total_expense + Number(transaction[i].dr);
    }
    setTotal({
      total_expense,
    });
  }, [transaction]);

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
            navigation={navigation}
            pdfexport={true}
            pdfInfo={
              {
                date: filter.startDate.toDateString() + " - " + filter.endDate.toDateString(),
                screen: "ExpensePDF",
                total_expense: total.total_expense
              }
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
                expenseReport(filter, 0);
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
            <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
              {getTranslation("NAME", language)}
            </Text>
            <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
              {getTranslation("EXPENSE", language)}
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
              return (
                <View style={styles.item}>
                  <Text
                    style={{
                      flex: 0.2,
                      fontFamily: "PrimaryFont",
                      textAlign: language == URDU ? "right" : "left",
                    }}
                  >
                    {FormatDate(item.expense_date)}
                  </Text>
                  <Text
                    style={{
                      flex: 0.4,
                      fontFamily: "PrimaryFont",
                      textAlign: language == URDU ? "right" : "left",
                    }}
                  >
                    {item.expense_name}
                  </Text>
                  <Text
                    style={{
                      flex: 0.4,
                      fontFamily: "PrimaryFont",
                      textAlign: language == URDU ? "right" : "left",
                    }}
                  >
                    {FormatPrice(item.dr)}
                  </Text>
                </View>
              );
            }}
          />
          <ReportFooter
            label="TOTAL_EXPENSE"
            value={total.total_expense}
            language={language}
          />
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
    transaction: reports.expneseReport,
  };
};

export default connect(mapStateToProps, { expenseReport })(ExpenseReport);
