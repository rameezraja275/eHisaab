/*Example to open a screen out of the Navigation Drawer*/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, RefreshControl, FlatList } from "react-native";
import {
  deleteBank,
  getBankLedger,
} from "../../store/actions/bank";
import InfoCard from "../../Components/InfoCard";
import colors from "../../utils/colors";
import Loader from "../../Components/Loader";
import { showAlert } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import ActionCard from "../../Components/ActionCard";
import constants from '../../utils/constants'

const BankLedger = (props) => {
  const bank = props.navigation.state.params.bank;

  const [options, showOptions] = useState(false);
  const [overlayStatus, setOverlay] = useState(false);

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    props.getBankLedger(bank.id, filter);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);
  const { language } = props;
  const onDelete = () => {
    showAlert(
      "YOU_SURE",
      () => {
        props.deleteBank(bank.id);
      },
      language
    );
  };

  const reload = () => {
    props.getBankLedger(bank.id, filter);
  };

  const Transaction = props.bankTransactions;

  console.log("yooooooooooo", Transaction)

  return props.loading.status ? (
    <Loader size={10} />
  ) : (
      <View style={styles.MainContainer}>
        <View style={styles.infobox}>
          <InfoCard title="ACCOUNT_NUMBER" value={bank.account_no} />
          <InfoCard title="BALANCE" value={FormatPrice(bank.current_balance)} />
          <ActionCard
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
                props.getBankLedger(bank.id, filter);
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
            <Text style={[styles.col, styles.alignText, { flex: 0.2 }]}>
              {getTranslation("DATE", language)}
            </Text>
            <Text style={[styles.col, styles.alignText, { flex: 0.5 }]}>
              {getTranslation("DESCRIPTION", language)}
            </Text>
            <Text style={[styles.col, styles.alignText]}>
              {getTranslation("PRICE", language)}
            </Text>
          </View>

          <FlatList
            ListEmptyComponent={<EmptyList message="No Transactions." />}
            data={Transaction}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            renderItem={({ item }) => {
              return (
                <View style={styles.item}>
                  <Text style={[styles.col, { flex: 0.2 }]}>
                    {FormatDate(item.transaction_date)}
                  </Text>
                  <Text style={[styles.col, { flex: 0.5 }]}>
                    {item.narration}
                  </Text>
                  <Text style={styles.col}>{FormatPrice(item.transaction_type == constants.WITHDRAW ? item.cr : item.dr)}</Text>
                </View>
              );
            }}
          />
        </View>

        <FloatingButton
          onClick={() =>
            props.navigation.navigate("EditBank", {
              bank: bank,
            })
          }
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
  col: {
    flex: 0.3,
    fontFamily: "PrimaryFont",
  },
  alignText: {
    textAlign: "left",
  },
});

const mapStateToProps = ({ common, bank }) => {
  return {
    loading: common.loading,
    bankTransactions: bank.bankLedger,
    language: common.language,
  };
};

export default connect(mapStateToProps, {
  deleteBank,
  getBankLedger,
})(BankLedger);
