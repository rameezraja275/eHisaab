import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from "react-native";
import SearchBar from "../../Components/SearchBar";
import Loader from "../../Components/Loader";
import { paymentGet } from "../../store/actions/payment";
// import Filters from './Filters';
import FloatingButton from "../../Components/FloatingButton";
import { FormatPrice, FormatDate } from "../../utils/helper";
import colors from "../../utils/colors";
import Overlay from "../../Components/Overlay";
import Filters from "../../Components/TransactionsFilter";
import EmptyList from "../../Components/EmptyList";
import { getTranslation } from "../../utils/language";
import ListItemContainer from "../../Components/ListItemContainer";

const Payment = (props) => {
  const { paymentGet, payments, language } = props;

  const [state, setState] = useState({
    data: null,
    filteredData: [],
    showOverlay: false,
  });

  const [filter, setFilter] = useState({ date: new Date(), filter_type: "1" });

  useEffect(() => {
    paymentGet(0, filter);
  }, []);

  useEffect(() => {
    setState({
      ...state,
      filteredData: payments,
    });
  }, [payments]);

  const onSearch = (text) => {
    const filteredData = payments.filter((item) =>
      item.supplier_name.toLowerCase().includes(text.toLowerCase())
    );
    setState({
      ...state,
      filteredData,
    });
  };

  const reload = () => {
    paymentGet(0, filter);
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
                  paymentGet(0, filter);
                }}
                setType={(text) => setFilter({ ...filter, filter_type: text })}
              />
            </Overlay>
          )}

          <FlatList
            ListEmptyComponent={<EmptyList message="Nothing to Show." />}
            data={state.filteredData}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItemContainer
                onClick={() =>
                  props.navigation.navigate("EditPayment", { payment: item })
                }
              >
                <Text style={{ flex: 0.6, fontFamily: "PrimaryFont" }}>
                  {item.supplier_name}
                </Text>
                <View style={{ flex: 0.4, fontFamily: "PrimaryFont" }}>
                  <Text style={{ fontFamily: "PrimaryFont" }}>
                    {getTranslation("AMOUNT", language) +
                      " : " +
                      FormatPrice(item.dr)}
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
            onClick={() => props.navigation.navigate("AddPayment")}
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

const mapStateToProps = ({ payment, common }) => {
  return {
    loading: common.loading,
    language: common.language,
    payments: payment.payments,
  };
};

export default connect(mapStateToProps, { paymentGet })(Payment);
