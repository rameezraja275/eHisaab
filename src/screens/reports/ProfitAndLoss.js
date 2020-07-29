import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { profitNlossStatement } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import constants from "../../utils/constants";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateRangeFilter";

const ProfitAndLossReport = (props) => {
  const {
    language,
    profitNlossStatement,
    transaction,
    navigation,
    loading,
  } = props;
  const [overlayStatus, setOverlay] = useState(false);
  const URDU = constants.URDU;

  const styles = getStyles({ language, URDU });

  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    profitNlossStatement(filter);
  }, []);

  const reload = () => {
    profitNlossStatement(filter);
  };

  const renderRow = (label, value, colorSensitive) => {
    let color;
    if (colorSensitive) {
      color = value > 0 ? colors.success : colors.danger;
    }
    return (
      <View style={styles.item}>
        <Text
          style={{
            flex: 0.5,
            fontFamily: "PrimaryFont",
            // textAlign: language == URDU ? "right" : "left",
          }}
        >
          {getTranslation(label, language)}
        </Text>
        <Text
          style={{
            flex: 0.5,
            fontFamily: "PrimaryFont",
            textAlign: language == URDU ? "right" : "left",
            color,
          }}
        >
          {FormatPrice(value)}
        </Text>
      </View>
    );
  };

  const {
    sale,
    costing,
    expense,
    gross_profit,
    net_profit,
    expense_sale_discount,
  } = transaction;

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
              profitNlossStatement(filter, 0);
            }}
            setEndDate={(text) => {
              setFilter({ ...filter, endDate: text });
            }}
          />
        </Overlay>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reload} />
        }
      >
        {renderRow("SALE", sale)}
        {renderRow("COST_OF_GOODS", costing)}
        <View style={styles.line}></View>
        {renderRow("GROSS_PROFIT", gross_profit, true)}
        {renderRow("EXPENSES", expense)}
        {renderRow("SALE_DISCOUNT", expense_sale_discount)}
        <View style={styles.line}></View>
        {renderRow("NET_PROFIT", net_profit, true)}
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
    transaction: reports.profitNlossStatement,
  };
};

export default connect(mapStateToProps, { profitNlossStatement })(
  ProfitAndLossReport
);
