/*Example to open a screen out of the Navigation Drawer*/
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import {
  getPurchaseTransactions,
  resetCart,
} from "../../store/actions/purchase";
import { FormatPrice, FormatDate } from "../../utils/helper";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";

import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const PurchaseTransactions = (props) => {
  const { getPurchaseTransactions, Transactions, resetCart } = props;

  const [state, setState] = useState({
    filteredData: [],
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  const resetPurchaseCart = () => {
    resetCart();
    props.navigation.navigate("List");
  };

  useEffect(() => {
    getPurchaseTransactions(0, filter);
    props.navigation.setParams({
      resetPurchaseCart: resetPurchaseCart,
    });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: Transactions,
    });
  }, [Transactions]);

  const navigate = (item) => {
    getPurchaseTransactions(item.id);
    if (item.purchase_type == "2") {
      console.log(item)
      props.navigation.navigate("PurchaseReturn");
    } else {
      props.navigation.navigate("PurchaseReturn");
      // props.navigation.navigate("CheckOut", { isOpenPurchase: true })
    }
  };

  const onSearch = (text) => {
    const filteredData = Transactions.filter((item) =>
      item.supplier_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    getPurchaseTransactions(0, filter);
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
                    getPurchaseTransactions(0, filter);
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
                      {item.supplier_name}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {FormatDate(item.purchase_date)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {item.narration}
                    </Text>
                  </View>

                  <View style={{ flex: 0.4 }}>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("AMOUNT", props.language) +
                        " : " +
                        FormatPrice(item.purchase_amount)}
                    </Text>
                    <Text style={{ fontFamily: "PrimaryFont" }}>
                      {getTranslation("DISCOUNT", props.language) +
                        " : " +
                        FormatPrice(item.purchase_discount)}
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

const mapStateToProps = ({ purchase, common }) => {
  return {
    loading: common.loading,
    Transactions: purchase.Transactions,
  };
};

export default connect(mapStateToProps, { getPurchaseTransactions, resetCart })(
  PurchaseTransactions
);
