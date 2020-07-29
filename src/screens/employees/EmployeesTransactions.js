import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { getTransactions } from "../../store/actions/employees";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import colors from "../../utils/colors";
import OptionsAction from "../../Components/Options";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const EmployeeTransactions = (props) => {
  const { getTransactions, transactions, language } = props;
  const [options, showOptions] = useState(false);
  const [state, setState] = useState({
    filteredData: [],
    showOverlay: false,
    date: new Date(),
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    getTransactions(0, filter);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  useEffect(() => {
    let data = transactions;
    data =
      state.date != null
        ? transactions.filter(
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
      filteredData: transactions,
    });
  }, [transactions]);

  const onSearch = (text) => {
    const filteredData = transactions.filter((item) =>
      item.employee_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getTransactions(0, filter);
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

          <OptionsAction
            status={options}
            close={showOptions}
            title="PROCESS_SALARIES"
            onSelect={() => props.navigation.navigate("Salaries")}
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
                  getTransactions(0, filter);
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
            renderItem={({ item }) => {
              let amount = null;
              amount = item.transaction_type == 4 ? item.cr : item.dr;

              return (
                <ListItemContainer
                  onClick={() =>
                    props.navigation.navigate("EditTransaction", {
                      transaction: item,
                    })
                  }
                >
                  <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                    {item.employee_name}
                  </Text>
                  <View style={{ flex: 0.4 }}>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("AMOUNT", language) +
                        " : " +
                        FormatPrice(amount)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("DATE", language) +
                        " : " +
                        FormatDate(item.transaction_date)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {item.narration}
                    </Text>
                  </View>
                </ListItemContainer>
              );
            }}
          />

          <FloatingButton
            onClick={() => props.navigation.navigate("AddTransaction")}
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
});

const mapStateToProps = ({ employee, common }) => {
  return {
    loading: common.loading,
    transactions: employee.transactions,
    language: common.language,
  };
};

export default connect(mapStateToProps, { getTransactions })(
  EmployeeTransactions
);
