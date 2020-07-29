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
import { getSaleTransactions, resetCart } from "../../store/actions/sale";
import { FormatPrice, FormatDate } from "../../utils/helper";
import colors from "../../utils/colors";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const SaleTransactions = (props) => {
  const { getSaleTransactions, Transactions, resetCart } = props;
  const [state, setState] = useState({
    filteredData: [],
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  const resetSaleCart = () => {
    resetCart();
    props.navigation.navigate("List");
  };

  useEffect(() => {
    getSaleTransactions(0, filter);

    props.navigation.setParams({
      resetSaleCart: resetSaleCart,
    });
  }, []);

  const navigate = (item) => {
    getSaleTransactions(item.id);
    props.navigation.navigate("SaleReturn");
  };

  useEffect(() => {
    setState({
      ...state,
      filteredData: Transactions,
    });
  }, [Transactions]);

  const onSearch = (text) => {
    const filteredData = Transactions.filter((item) => {
      let tempName = item.customer_name ? item.customer_name : "";
      return tempName.toLowerCase().includes(text.toLowerCase());
    });
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getSaleTransactions(0, filter);
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
                  getSaleTransactions(0, filter);
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
              <ListItemContainer onClick={() => navigate(item)}>
                <View style={{ flex: 0.6 }}>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {item.customer_name}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {FormatDate(item.sale_date)}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {item.narration}
                  </Text>
                </View>

                <View style={{ flex: 0.4 }}>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("AMOUNT", props.language) +
                      " : " +
                      FormatPrice(item.sale_amount)}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("DISCOUNT", props.language) +
                      " : " +
                      FormatPrice(item.sale_discount)}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("PAID", props.language) +
                      " : " +
                      FormatPrice(item.paid_amount)}
                  </Text>
                </View>
              </ListItemContainer>
            )}
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

const mapStateToProps = ({ sale, common }) => {
  return {
    loading: common.loading,
    Transactions: sale.Transactions,
    language: common.language,
  };
};

export default connect(mapStateToProps, { getSaleTransactions, resetCart })(
  SaleTransactions
);
