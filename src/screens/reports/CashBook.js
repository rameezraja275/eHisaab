import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { getCashBook } from "../../store/actions/reports";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { FormatPrice, FormatDate } from "../../utils/helper";
import ActionCard from "../../Components/ActionCard";
import constants from "../../utils/constants";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/DateFilter";
import ReportFooter from "../../Components/ReportFooter";

const CashBook = (props) => {
  const { language, getCashBook, transaction, navigation, loading } = props;
  const [overlayStatus, setOverlay] = useState(false);
  const URDU = constants.URDU;
  const styles = getStyles({ language, URDU });
  const [filter, setFilter] = useState({
    date: new Date(),
  });

  const { DEBIT, CREDIT } = constants;
  useEffect(() => {
    getCashBook(filter);
  }, []);

  const reload = () => {
    getCashBook(filter);
  };

  const renderItem = (description, amount, transactionType, colorSensitive) => {
    let color;
    if (colorSensitive) {
      color = amount > 0 ? colors.success : colors.danger;
    }
    return (
      <View style={styles.item}>
        <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
          {getTranslation(description, language)}
        </Text>
        <Text
          style={{
            flex: 0.3,
            textAlign: language == URDU ? "right" : "left",
            fontFamily: "PrimaryFont",
            color: color,
          }}
        >
          {transactionType == DEBIT ? FormatPrice(amount) : "-"}
        </Text>
        <Text
          style={{
            flex: 0.3,
            fontFamily: "PrimaryFont",
            color: color,
            textAlign: language == URDU ? "right" : "left",
          }}
        >
          {transactionType == CREDIT ? FormatPrice(amount) : "-"}
        </Text>
      </View>
    );
  };

  const {
    opening_cash,
    sale,
    receipt,
    purchase,
    payment,
    expense,
    bank_withdrawal,
    bank_deposit
  } = transaction;
  const totalDebit = Number(opening_cash) + Number(sale) + Number(receipt) + Number(bank_withdrawal);
  const totalCredit = Number(purchase) + Number(payment) + Number(expense) + Number(bank_deposit);
  const closingBalance = totalDebit - totalCredit;

  return loading.status ? (
    <Loader size={10} />
  ) : (
      <View style={styles.MainContainer}>
        <View style={styles.infobox}>
          <ActionCard
            toggleFilter={() => setOverlay(true)}
            date={filter.date.toDateString()}
            navigation={navigation}
            pdfInfo={
              {
                date: filter.date.toDateString(),
                totalDebit,
                totalCredit,
                closingBalance,
                screen: "CashBookPDF"
              }
            }
            pdfexport={true}
          />
          {/* <Button /> */}

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
                getCashBook(filter);
              }}
            />
          </Overlay>
        )}

        <View style={styles.table}>
          <View style={styles.head}>
            <Text style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
              {getTranslation("DESCRIPTION", language)}
            </Text>
            <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
              {getTranslation("DEBIT", language)}
            </Text>
            <Text style={{ flex: 0.3, fontFamily: "PrimaryFont" }}>
              {getTranslation("CREDIT", language)}
            </Text>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
          >
            {/* debit 0 , credit 1 */}

            {renderItem("OPENING_BALANCE", opening_cash, DEBIT, true)}
            {renderItem("SALE", sale, DEBIT)}
            {renderItem("RECEIPT", receipt, DEBIT)}
            {renderItem("BANK_WITHDRAW", bank_withdrawal, DEBIT)}

            {renderItem("EXPENSE", expense, CREDIT)}
            {renderItem("PURCHASE", purchase, CREDIT)}
            {renderItem("PAYMENTS", payment, CREDIT)}
            {renderItem("BANK_DEPOSIT", bank_deposit, CREDIT)}
          </ScrollView>

          <ReportFooter
            label="TOTAL_DEBIT"
            value={totalDebit}
            language={language}
          />
          <ReportFooter
            label="TOTAL_CREDIT"
            value={totalCredit}
            language={language}
          />

          <ReportFooter
            label="CLOSING_BALANCE"
            value={closingBalance}
            language={language}
            colorSensitive={true}
          />
        </View>
      </View>
    );
};

const getStyles = ({ language, URDU }) => {
  return StyleSheet.create({
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
      flexDirection: language == URDU ? "row-reverse" : "row",
      padding: 10,
      paddingBottom: 0,
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 0.5,
    },
    item: {
      flexDirection: language == URDU ? "row-reverse" : "row",
      padding: 10,
    },
  });
};

const mapStateToProps = ({ common, reports }) => {
  return {
    loading: common.loading,
    language: common.language,
    transaction: reports.cashbook,
  };
};

export default connect(mapStateToProps, { getCashBook })(CashBook);
