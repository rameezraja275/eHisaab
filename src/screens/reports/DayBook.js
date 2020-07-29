import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { getDayBook } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import ReportFooter from "../../Components/ReportFooter";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateFilter";
import constants from "../../utils/constants";

const DayBook = (props) => {
  const { language, getDayBook, transaction, navigation, loading } = props;
  const [overlayStatus, setOverlay] = useState(false);

  const [filter, setFilter] = useState({
    date: new Date(),
  });

  const URDU = constants.URDU;

  useEffect(() => {
    getDayBook(filter);
  }, []);

  const reload = () => {
    getDayBook(filter);
  };

  const renderRow = (label, value) => {
    return (
      <View style={styles.item}>
        <Text style={{ flex: 0.5, fontFamily: "PrimaryFont" }}>
          {getTranslation(label, language)}
        </Text>
        <Text
          style={{
            flex: 0.5,
            fontFamily: "PrimaryFont",
            textAlign: language == URDU ? "right" : "left",
          }}
        >
          {FormatPrice(value)}
        </Text>
      </View>
    );
  };
  const {
    purchase_total,
    purchase_cash,
    purchase_discount,
    purchase_credit,
    sale_total,
    sale_discount,
    sale_cash,
    sale_credit,
    payments,
    receipts,
    expense,
  } = transaction;

  const styles = getStyles({ language, URDU });

  return loading.status ? (
    <Loader size={10} />
  ) : (
    <View style={styles.MainContainer}>
      <View style={styles.infobox}>
        <ActionCard
          toggleFilter={() => setOverlay(true)}
          date={filter.date.toDateString()}
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
              getDayBook(filter);
            }}
          />
        </Overlay>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reload} />
        }
      >
        {renderRow("PURCHASE_CASH", purchase_cash)}
        {renderRow("PURCHASE_CREDIT", purchase_credit)}
        {renderRow("PURCHASE_DISCOUNT", purchase_discount)}
        {renderRow("PURCHASE_TOTAL", purchase_total)}
        <View style={styles.line}></View>
        {renderRow("SALE_CASH", sale_cash)}
        {renderRow("SALE_CREDIT", sale_credit)}
        {renderRow("SALE_DISCOUNT", sale_discount)}
        {renderRow("SALE_TOTAL", sale_total)}
        <View style={styles.line}></View>
        {renderRow("PAYMENTS", payments)}
        {renderRow("RECEIPTS", receipts)}
        <View style={styles.line}></View>
        {renderRow("EXPENSES", expense)}
      </ScrollView>
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
    item: {
      flexDirection: language == URDU ? "row-reverse" : "row",
      padding: 10,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 1,
    },
    line: {
      flexDirection: "row",
      padding: 2,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 1,
      backgroundColor: colors.primaryColor,
    },
  });

const mapStateToProps = ({ common, reports }) => {
  return {
    loading: common.loading,
    language: common.language,
    transaction: reports.daybook,
  };
};

export default connect(mapStateToProps, { getDayBook })(DayBook);
