import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { receiptGet } from "../../store/actions/receipt";
import { FormatDate, FormatPrice } from "../../utils/helper";
import FloatingButton from "../../Components/FloatingButton";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const Receipt = (props) => {
  const { receiptGet, receipts, language } = props;

  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    receiptGet(0, filter);
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: receipts,
    });
  }, [receipts]);

  const onSearch = (text) => {
    const filteredData = receipts.filter((item) =>
      item.product_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    receiptGet(0, filter);
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
              title="FILTERS"
            >
              <Filters
                data={filter}
                setDate={(text) => {
                  setFilter({ ...filter, date: text });
                }}
                onSubmit={() => {
                  setState({ ...state, showOverlay: false });
                  receiptGet(0, filter);
                }}
                setType={(text) => setFilter({ ...filter, filter_type: text })}
              />
            </Overlay>
          )}

          <FlatList
            ListEmptyComponent={<EmptyList message="No Receipt." />}
            data={state.filteredData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItemContainer
                onClick={() =>
                  props.navigation.navigate("EditReceipt", { receipt: item })
                }
              >
                <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                  {item.customer_name}
                </Text>
                <View style={{ flex: 0.4 }}>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("AMOUNT", language) +
                      " : " +
                      FormatPrice(item.cr)}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("DATE", language) +
                      " : " +
                      FormatDate(item.transaction_date)}
                  </Text>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("DESCRIPTION", language) +
                      " : " +
                      item.narration}
                  </Text>
                </View>
              </ListItemContainer>
            )}
          />

          <FloatingButton
            onClick={() => props.navigation.navigate("AddReceipt")}
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

const mapStateToProps = ({ receipt, common }) => {
  return {
    loading: common.loading,
    receipts: receipt.receipts,
    language: common.language,
  };
};

export default connect(mapStateToProps, { receiptGet })(Receipt);
