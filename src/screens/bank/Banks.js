import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { getBank } from "../../store/actions/bank";
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import OptionsAction from "../../Components/Options";
import EmptyList from "../../Components/EmptyList";
import ListItemContainer from "../../Components/ListItemContainer";
import colors from '../../utils/colors'

const Banks = (props) => {
  const { getBank, banks } = props;
  const [options, showOptions] = useState(false);
  const [state, setState] = useState({
    filteredData: [],
  });

  useEffect(() => {
    getBank(0);
    props.navigation.setParams({
      showOptions: showOptions,
    });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: banks,
    });
  }, [banks]);

  const onSearch = (text) => {
    const filteredData = banks.filter((item) =>
      item.bank_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getBank(0);
  };

  return (
    <View style={styles.MainContainer}>
      {props.loading.status ? (
        <Loader size={10} />
      ) : (
          <React.Fragment>
            <SearchBar {...props} onChange={onSearch} />
            <OptionsAction
              status={options}
              close={showOptions}
              title="BANK_TRANSACTIONS"
              onSelect={() => props.navigation.navigate("ListTransactions")}
            />
            <FlatList
              ListEmptyComponent={<EmptyList message="No banks" />}
              data={state.filteredData}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={reload} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItemContainer
                  onClick={() =>
                    props.navigation.navigate("BankLedger", {
                      bank: item,
                    })
                  }
                >
                  <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                    {item.bank_name}
                  </Text>
                  <View style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
                    <Text style={{ fontFamily: "PrimaryFont", color: item.current_balance > 0 ? colors.success : colors.danger }}>
                      {FormatPrice(item.current_balance)}
                    </Text>
                  </View>
                </ListItemContainer>
              )}
            />

            <FloatingButton
              onClick={() => props.navigation.navigate("AddBank")}
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

const mapStateToProps = ({ bank, common }) => {
  return {
    loading: common.loading,
    banks: bank.banks,
  };
};

export default connect(mapStateToProps, { getBank })(
  Banks
);
