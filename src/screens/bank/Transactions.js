import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { getBankLedger } from "../../store/actions/bank";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";
import constants from '../../utils/constants'

const BankTransactions = (props) => {
  const { getBankLedger, banksTransactions } = props;

  const [state, setState] = useState({
    filteredData: [],
    showOverlay: false,
    date: new Date(),
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    getBankLedger(0, filter);
  }, []);

  useEffect(() => {
    let data = banksTransactions;
    data =
      state.date != null
        ? banksTransactions.filter(
          (item) =>
            new Date(item.transaction_date).getDate() == state.date.getDate()
        )
        : data;
    setState({
      ...state,
      filteredData: data,
      showOverlay: false,
    });
  }, [state.date]);

  useEffect(() => {
    setState({
      ...state,
      filteredData: banksTransactions,
    });
  }, [banksTransactions]);

  const onSearch = (text) => {
    const filteredData = banksTransactions.filter((item) =>
      item.expense_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getBankLedger(0, filter);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
          <React.Fragment>
            <SearchBar
              {...props}
              onChange={onSearch}
              toggleFilter={() => setState({ ...state, showOverlay: true })}
            />

            {state.showOverlay && (
              <Overlay
                toggleFilter={() => setState({ ...state, showOverlay: false })}
                title="FILTER"
              >
                <Filters
                  data={filter}
                  setDate={(text) => {
                    setFilter({ ...filter, date: text });
                  }}
                  onSubmit={() => {
                    setState({ ...state, showOverlay: false });
                    getBankLedger(0, filter);
                  }}
                  setType={(text) => setFilter({ ...filter, filter_type: text })}
                />
              </Overlay>
            )}

            <FlatList
              ListEmptyComponent={<EmptyList message="No Transactions." />}
              data={state.filteredData}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={reload} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (

                <ListItemContainer
                  onClick={() =>
                    props.navigation.navigate("EditBankTransaction", {
                      bankTransaction: item,
                    })
                  }
                >
                  <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                    {item.bank_name}
                  </Text>
                  <View style={{ flex: 0.4 }}>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("AMOUNT", props.language) +
                        " : " +
                        FormatPrice(item.transaction_type == constants.WITHDRAW ? item.cr : item.dr)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("DATE", props.language) +
                        " : " +
                        FormatDate(item.transaction_date)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {item.transaction_type == constants.WITHDRAW ? "Withdraw" : "Deposit"}
                    </Text>
                  </View>
                </ListItemContainer>
              )}
            />

            <FloatingButton
              onClick={() => props.navigation.navigate("AddBankTransaction")}
              icon="plus"
            />
          </React.Fragment>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ bank, common }) => {
  return {
    loading: common.loading,
    language: common.language,
    banksTransactions: bank.bankTransactions,
  };
};

export default connect(mapStateToProps, { getBankLedger })(BankTransactions);
